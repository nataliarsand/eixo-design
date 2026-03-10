// Cloudflare Worker for eixo.design contact form
//
// Uses Cloudflare Email Routing — no external API keys needed.
//
// Setup:
//   1. Enable Email Routing on eixo.design in Cloudflare dashboard
//   2. Add your destination email as a verified address
//   3. Deploy: cd worker && npx wrangler deploy

import { EmailMessage } from 'cloudflare:email';

const FROM_ADDRESS = 'hello@eixo.design';

export default {
  async fetch(request, env) {
    const TO_ADDRESS = env.CONTACT_EMAIL || 'hello@eixo.design';
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

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: 'Invalid email' }, 400, request);
      }

      const subject = `[eixo.design] ${reason} — ${name}`;
      const body = [
        `Reason: ${reason}`,
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        '',
        message ? `Message:\n${message}` : null,
      ].filter(Boolean).join('\n');

      const msgId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@eixo.design>`;
      const rawEmail = [
        `Message-ID: ${msgId}`,
        `From: eixo.design <${FROM_ADDRESS}>`,
        `To: ${TO_ADDRESS}`,
        `Reply-To: ${name} <${email}>`,
        `Subject: ${subject}`,
        `Date: ${new Date().toUTCString()}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/plain; charset=utf-8`,
        ``,
        body,
      ].join('\r\n');

      const msg = new EmailMessage(FROM_ADDRESS, TO_ADDRESS, rawEmail);
      await env.SEND_EMAIL.send(msg);

      return json({ ok: true }, 200, request);
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
