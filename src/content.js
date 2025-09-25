const content = {
    en: {
      title: 'eixo.design',
      subtitle1: 'Design from',
      subtitle2: ' the core out.',
      description: 'Aligning people, processes and purpose through intentional design.',
      pronunciation: '— pronounced A-shoo',      offeringsLabel: 'Offerings',
      cta: "Let us talk",
      aboutTitle: "Who we are",
      aboutText1: "Eixo is a design studio built for complexity. We cut through noise and bring order to chaos.",
      aboutText2: "We design from the inside out. Our work bridges product thinking, service design, and UX craft to shape experiences that are meaningful, usable, and built to last.",
      aboutText3: "We are not here to decorate. We are here to make things work.",
      bioTitle: "About Natalia",
      bioText1: "UX Design Lead with 15+ years across Dell, ThoughtWorks, startups, and latest Booking.com, where I led design systems at scale.",
      bioText2: "My expertise spans strategic discovery, technical implementation, and cross-functional team alignment.",
      bioText3: "I connect partners and colleagues as needed to form specialist teams tailored to your project context and requirements.",
      aboutPrinciplesTitle: 'How we work',
      aboutPrinciplesIntro: 'Our process brings clarity to collaboration. Here is how:',
      aboutPrinciples: [
        {
          title: 'Ask hard questions early',
          description: 'We surface gaps, risks, and friction points while there’s still time to fix them.'
        },
        {
          title: 'Frame problems before solving them',
          description: 'We shape problems with care so we can solve the right one, not just the loudest.'
        },
        {
          title: 'Favour clarity over trend',
          description: 'No design theatre. No fluff. Just well-crafted, scalable systems rooted in purpose.'
        },
        {
          title: 'Collaborate with care',
          description: 'We bring people in, not just pixels. Research, dialogue, and structure over chaos.'
        },
        {
          title: 'Design for continuity',
          description: 'Our work connects flows, teams, and tools so it scales with your growth.'
        }
      ],
      contactTitle: 'Get in touch',
      contactText: 'Ready to bring clarity to your next challenge?',
      socialProof: {
        testimonialPreview: "\"Natalia brings rare depth to UX strategy and systems thinking.\"",
        responseTime: "Response within 24h",
        availability: "Available for new projects"
      }
    },
    pt: {
      title: 'eixo.design',
      subtitle1: 'Design do',
      subtitle2: 'eixo pra fora.',
      description: 'Alinhamos sistemas, pessoas e propósito através de design intencional.',
      pronunciation: '— pronunciado A-shoo',      offeringsLabel: 'O que oferecemos',
      cta: 'Vamos conversar',
      aboutTitle: "Quem somos",
      aboutText1: "A Eixo é um estúdio de design feito para a complexidade. Cortamos o ruído e trazemos ordem ao caos.",
      aboutText2: "Projetamos de dentro pra fora. Nosso trabalho conecta pensamento de produto, design de serviços e prática de design para criar experiências com sentido, usabilidade e longevidade.",
      aboutText3: "Não estamos aqui pra enfeitar. Estamos aqui pra fazer funcionar.",
      bioTitle: "Sobre a Natalia",
      bioText1: "UX Design Lead com 15+ anos na Dell, ThoughtWorks, startups, e mais recentemente na Booking.com, onde liderei design systems em escala.",
      bioText2: "Minha expertise abrange descoberta estratégica, implementação técnica e alinhamento de times cross-funcionais.",
      bioText3: "Conecto parceiros e colegas conforme necessário para formar times especialistas sob medida para o contexto e requisitos do seu projeto.",
      aboutPrinciplesTitle: 'Como trabalhamos',
      aboutPrinciplesIntro: 'Nosso processo traz clareza à colaboração. Assim que fazemos:',
      aboutPrinciples: [
        {
          title: 'Fazemos as perguntas difíceis desde o início',
          description: 'Trazemos à tona riscos, lacunas e fricções enquanto ainda há tempo de agir.'
        },
        {
          title: 'Enquadramos o problema antes de propor soluções',
          description: 'Encaramos o problema com cuidado pra resolver o certo, não só o mais barulhento.'
        },
        {
          title: 'Priorizamos clareza acima de tendências',
          description: 'Nada de teatro de design. Nada de firula. Só sistemas bem feitos e enraizados no propósito.'
        },
        {
          title: 'Colaboramos com cuidado',
          description: 'Envolvemos pessoas, não só pixels. Pesquisa, conversa e estrutura acima do caos.'
        },
        {
          title: 'Projetamos com visão de continuidade',
          description: 'Nosso trabalho conecta fluxos, times e ferramentas e cresce junto com você.'
        }
      ],
      contactTitle: 'Entre em contato',
      contactText: 'Pronto para trazer clareza ao seu próximo desafio?',
      socialProof: {
        testimonialPreview: "\"Natalia traz profundidade rara em estratégia de UX e pensamento sistêmico.\"",
        responseTime: "Resposta em até 24h",
        availability: "Disponível para novos projetos"
      }
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
          'Business strategy reviews',
          'Structured ideation sessions'
        ],
        pt: [
          'Workshops de descoberta e alinhamento de times',
          'Enquadramento de problemas e mapeamento de oportunidades',
          'Revisões estratégicas empresariais',
          'Sessões de ideação estruturadas'
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
        en: 'Guidance for designers, teams, operations, and transitions.',
        pt: 'Acompanhamento para designers, times, operações e transições.'
      },
      bullets: {
        en: [
          '1:1 growth paths for designers and operators',
          'Support for career shifts into design and strategy',
          'Team mentoring & business systems coaching',
          'Contextual workshops & guidance'
        ],
        pt: [
          'Caminhos de crescimento 1:1 para designers e operadores',
          'Apoio em transições de carreira para design e estratégia',
          'Mentoria para times e design de sistemas empresariais',
          'Workshops e orientações sob medida'
        ]
      }
    }
  ];
      export { content, offerings };
