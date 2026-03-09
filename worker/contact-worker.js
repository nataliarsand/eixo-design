// Cloudflare Worker for eixo.design contact form
//
// Deploy:
//   cd worker
//   npx wrangler deploy
//
// Setup: Add a DNS TXT record for MailChannels authorization:
//   Name: _mailchannels
//   Value: v=mc1 cfid=eixo-contact.nataliarsand.workers.dev
//
// This uses MailChannels API which is free for Cloudflare Workers.
// No API keys or secrets needed.

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(request) });
    }

    try {
      const data = await request.json();
      const { reason, message, name, email, company } = data;

      if (!name || !email || !reason) {
        return json({ error: 'Missing required fields' }, 400, request);
      }

      // Basic email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: 'Invalid email' }, 400, request);
      }

      // Send via MailChannels (free for Cloudflare Workers)
      const emailBody = [
        `Reason: ${reason}`,
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        '',
        message ? `Message:\n${message}` : null,
      ].filter(Boolean).join('\n');

      const mailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: 'nataliarsand@gmail.com', name: 'Natalia Arsand' }],
          }],
          from: {
            email: 'hello@eixo.design',
            name: 'eixo.design',
          },
          reply_to: {
            email: email,
            name: name,
          },
          subject: `[eixo.design] ${reason} — ${name}`,
          content: [
            {
              type: 'text/plain',
              value: emailBody,
            },
            {
              type: 'text/html',
              value: formatHtml({ reason, name, email, company, message }),
            },
          ],
        }),
      });

      if (mailResponse.status === 202 || mailResponse.ok) {
        return json({ ok: true }, 200, request);
      }

      const err = await mailResponse.text();
      console.error('MailChannels error:', mailResponse.status, err);
      return json({ error: 'Email delivery failed' }, 500, request);
    } catch (err) {
      console.error('Worker error:', err);
      return json({ error: 'Internal error' }, 500, request);
    }
  },
};

function json(data, status, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
  });
}

const ALLOWED_ORIGINS = [
  'https://eixo.design',
  'https://eixo-design.pages.dev',
];

function corsHeaders(request) {
  const origin = request?.headers?.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.eixo-design.pages.dev');
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatHtml({ reason, name, email, company, message }) {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; color: #333; line-height: 1.6;">
      <h2 style="color: #000; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 20px;">
        New message from eixo.design
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 6px 0; color: #888; width: 100px; vertical-align: top;">Reason</td><td style="padding: 6px 0;">${esc(reason)}</td></tr>
        <tr><td style="padding: 6px 0; color: #888; vertical-align: top;">Name</td><td style="padding: 6px 0;">${esc(name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #888; vertical-align: top;">Email</td><td style="padding: 6px 0;"><a href="mailto:${esc(email)}" style="color: #000;">${esc(email)}</a></td></tr>
        ${company ? `<tr><td style="padding: 6px 0; color: #888; vertical-align: top;">Company</td><td style="padding: 6px 0;">${esc(company)}</td></tr>` : ''}
      </table>
      ${message ? `
        <div style="padding: 16px; background: #f7f7f7; border-radius: 6px;">
          <p style="margin: 0 0 6px; color: #888; font-size: 13px;">Message</p>
          <p style="margin: 0; white-space: pre-wrap;">${esc(message)}</p>
        </div>
      ` : ''}
      <p style="margin-top: 24px; font-size: 12px; color: #aaa;">Reply directly to this email to respond to ${esc(name)}.</p>
    </div>
  `;
}
