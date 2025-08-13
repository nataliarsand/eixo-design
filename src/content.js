const content = {
    en: {
      title: 'eixo.design',
      subtitle1: 'Design from',
      subtitle2: ' the core out.',
      description: 'Aligning systems, people, and purpose through intentional UX.',
      offeringsLabel: 'How we do it',
      cta: "Let's talk",
      aboutTitle: "Who we are",
      aboutText1: "Eixo is a UX design studio built for complexity. We cut through noise, align intent, and bring structure that replaces chaos with coherence.",
      aboutText2: "We design from the inside out — from purpose to product. Our work bridges product thinking, service design, and UX craft to shape experiences that are meaningful, usable, and built to last.",
      aboutText3: "We’re not here to decorate. We’re here to make things work — with coherence, integrity, and intention.",
      aboutPrinciplesTitle: 'How we work',
      aboutPrinciplesIntro: 'Our process brings structure to complexity and clarity to collaboration. Here’s how:',
      aboutPrinciples: [
        {
          title: 'Ask hard questions early',
          description: 'We surface gaps, risks, and friction points while there’s still time to fix them.'
        },
        {
          title: 'Frame problems before solving them',
          description: 'We shape problems with care so we can solve the right one — not just the loudest.'
        },
        {
          title: 'Favour clarity over trend',
          description: 'No design theatre. No fluff. Just well-crafted, scalable systems rooted in purpose.'
        },
        {
          title: 'Collaborate with care',
          description: 'We bring people in, not just pixels — research, dialogue, and structure over chaos.'
        },
        {
          title: 'Design for continuity',
          description: 'Our work connects flows, teams, and tools — so it scales with your growth.'
        }
      ]
    },
    pt: {
      title: 'eixo.design',
      subtitle1: 'Design do',
      subtitle2: 'eixo pra fora.',
      description: 'Alinhamos sistemas, pessoas e propósito através de UX intencional.',
      offeringsLabel: 'O que oferecemos',
      cta: 'Vamos conversar',
      aboutTitle: "Quem somos",
      aboutText1: "A Eixo é um estúdio de UX feito para a complexidade. Cortamos o ruído, alinhamos o propósito e trazemos estrutura que transforma o caos em coerência.",
      aboutText2: "Projetamos de dentro pra fora — do propósito ao produto. Nosso trabalho conecta pensamento de produto, design de serviços e prática de UX para criar experiências com sentido, usabilidade e longevidade.",
      aboutText3: "Não estamos aqui pra enfeitar. Estamos aqui pra fazer funcionar — com coerência, intenção e integridade.",
      aboutPrinciplesTitle: 'Como trabalhamos',
      aboutPrinciplesIntro: 'Nosso processo traz estrutura à complexidade e clareza à colaboração. Assim que fazemos:',
      aboutPrinciples: [
        {
          title: 'Fazemos as perguntas difíceis desde o início',
          description: 'Trazemos à tona riscos, lacunas e fricções enquanto ainda há tempo de agir.'
        },
        {
          title: 'Enquadramos o problema antes de propor soluções',
          description: 'Encaramos o problema com cuidado pra resolver o certo — não só o mais barulhento.'
        },
        {
          title: 'Priorizamos clareza acima de tendências',
          description: 'Nada de teatro de design. Nada de firula. Só sistemas bem feitos e enraizados no propósito.'
        },
        {
          title: 'Colaboramos com cuidado',
          description: 'Envolvemos pessoas — não só pixels. Pesquisa, conversa e estrutura acima do caos.'
        },
        {
          title: 'Projetamos com visão de continuidade',
          description: 'Nosso trabalho conecta fluxos, times e ferramentas — e cresce junto com você.'
        }
      ]
    }
  };
    
  const offerings = [
    {
      key: 'consultancy',
      image: '/assets/images/consultancy-white.png',
      title: { en: 'Consultancy', pt: 'Consultoria' },
      subtitle: {
        en: 'Targeted design support at any stage.',
        pt: 'Apoio de design sob medida, em qualquer fase.'
      },
      bullets: {
        en: [
          'Discovery workshops & team alignment',
          'Problem framing & opportunity mapping',
          'UX strategy & service design reviews',
          'Co-creation & structured ideation sessions'
        ],
        pt: [
          'Workshops de descoberta e alinhamento de times',
          'Enquadramento de problemas e mapeamento de oportunidades',
          'Revisões estratégicas de UX e design de serviços',
          'Sessões de ideação e co-criação com estrutura'
        ]
      }
    },
    {
      key: 'delivery',
      image: '/assets/images/delivery-white.png',
      title: { en: 'Delivery', pt: 'Entrega' },
      subtitle: {
        en: 'End-to-end product and system design.',
        pt: 'Design completo de produtos e sistemas.'
      },
      bullets: {
        en: [
          'UX/UI design for web and mobile',
          'Design system foundations & scaling',
          'User flows, wireframes, and prototypes',
          'Developer handoff & implementation support'
        ],
        pt: [
          'UX/UI para web e aplicativos',
          'Fundação e escalabilidade de design systems',
          'Fluxos, wireframes e protótipos',
          'Handoff e suporte à implementação'
        ]
      }
    },
    {
    key: 'courses',
    image: '/assets/images/courses-white.png',
    title: { en: 'Courses', pt: 'Cursos' },
    subtitle: {
        en: 'Design education with structure and soul.',
        pt: 'Educação em design com estrutura e propósito.'
    },
    bullets: {
        en: [
        'UX foundations for practical, purpose-driven design',
        'Crash courses for PMs and decision-makers',
        'Problem-framing before solution-building',
        'Design maturity, leadership, and tool fluency'
        ],
        pt: [
        'Fundamentos de UX com foco prático e intencional',
        'Cursos rápidos para PMs e tomadores de decisão',
        'Exploração de problemas antes das soluções',
        'Maturidade em design, liderança e fluência em ferramentas'
        ]
    }
    },
    {
      key: 'mentoring',
      image: '/assets/images/mentoring-white.png',
      title: { en: 'Mentoring', pt: 'Mentorias' },
      subtitle: {
        en: 'Guidance for designers, teams, and transitions.',
        pt: 'Acompanhamento para designers, times e transições.'
      },
      bullets: {
        en: [
          '1:1 growth paths for designers',
          'Support for career shifts into UX',
          'Team mentoring & systems coaching',
          'Contextual workshops & guidance'
        ],
        pt: [
          'Caminhos de crescimento 1:1 para designers',
          'Apoio em transições de carreira para UX',
          'Mentoria para times e design systems',
          'Workshops e orientações sob medida'
        ]
      }
    }
  ];
      export { content, offerings };
