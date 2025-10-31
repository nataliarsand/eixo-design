import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { content, offerings } from '../content';
import logo from '../assets/images/eixo-logo-white.png';
import Footer from '../components/Footer';
import './OfferingDetail.css';

const OfferingDetail = ({ lang, setLang }) => {
  const { offeringKey } = useParams();
  const offering = offerings.find(o => o.key === offeringKey);
  const footerCopy = content[lang]?.footer;

  // Scroll to top immediately when component mounts or offeringKey changes
  useEffect(() => {
    // Scroll immediately before render
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [offeringKey]);

  if (!offering) {
    return <Navigate to="/" replace />;
  }

  const detailContent = {
    consultancy: {
      en: {
        intro: "Strategic design support that meets you where you are.",
        sections: [
          {
            title: "What we do",
            content: "We guide teams through the messy middle of building products and businesses. Whether you're validating an idea, aligning stakeholders, or mapping out your next phase, we bring structure, clarity, and momentum. Our approach is research-informed, adaptable, and built for teams working through complexity."
          },
          {
            title: "How it works",
            items: [
              "First contact — We discuss your challenge, context, and desired outcomes",
              "Assessment — We evaluate scope, constraints, and identify the right approach",
              "Planning — We shape the engagement structure, deliverables, and timeline",
              "Working together — Collaborative sessions with your team to address the challenge",
              "Delivery — Documented outcomes, frameworks, and actionable next steps"
            ]
          },
          {
            title: "This is for you if:",
            items: [
              "You're facing a strategic decision but unclear on the path forward",
              "Your team needs alignment before committing resources to execution",
              "You want to validate assumptions or test direction before building",
              "You need structure for complex problems without a full design team",
              "You're exploring options and need expert facilitation to move forward"
            ],
            preparation: {
              title: "How to prepare",
              content: "Come with context about your challenge, team structure, and timeline. If you're not ready for consultancy, consider our mentoring services for ongoing guidance, or courses to build internal capability first."
            },
            relatedServices: {
              title: "Related services",
              before: ["mentoring", "courses"],
              after: ["delivery"]
            }
          }
        ]
      },
      pt: {
        intro: "Apoio estratégico de design que se adapta ao seu momento.",
        sections: [
          {
            title: "O que fazemos",
            content: "Guiamos times pelo meio confuso de construir produtos e negócios. Seja validando uma ideia, alinhando stakeholders ou mapeando a próxima fase, trazemos estrutura, clareza e momentum. Nossa abordagem é informada por pesquisa, adaptável e feita para times lidando com complexidade."
          },
          {
            title: "Como funciona",
            items: [
              "Primeiro contato — Conversamos sobre seu desafio, contexto e resultados desejados",
              "Avaliação — Avaliamos escopo, restrições e identificamos a melhor abordagem",
              "Planejamento — Moldamos a estrutura do engajamento, entregas e cronograma",
              "Trabalhando juntos — Sessões colaborativas com seu time para endereçar o desafio",
              "Entrega — Resultados documentados, frameworks e próximos passos acionáveis"
            ]
          },
          {
            title: "Isso é pra você se:",
            items: [
              "Você enfrenta uma decisão estratégica mas não tem clareza sobre o caminho",
              "Seu time precisa de alinhamento antes de comprometer recursos para execução",
              "Você quer validar premissas ou testar direção antes de construir",
              "Você precisa de estrutura para problemas complexos sem um time completo de design",
              "Você está explorando opções e precisa de facilitação especializada para avançar"
            ],
            preparation: {
              title: "Como se preparar",
              content: "Venha com contexto sobre seu desafio, estrutura do time e cronograma. Se não está pronto para consultoria, considere nossos serviços de mentoria para orientação contínua, ou cursos para construir capacidade interna primeiro."
            },
            relatedServices: {
              title: "Serviços relacionados",
              before: ["mentoring", "courses"],
              after: ["delivery"]
            }
          }
        ]
      }
    },
    delivery: {
      en: {
        intro: "Full-cycle product and system design that ships.",
        sections: [
          {
            title: "What we do",
            content: "We design end-to-end experiences for web and mobile products. From UX/UI to design systems, our work is rooted in user needs, technical constraints, and business goals. We handle research, design, prototyping, and developer handoff—ensuring the work is usable, scalable, and ready to build."
          },
          {
            title: "How it works",
            items: [
              "First contact — We discuss your product vision, users, and design needs",
              "Assessment — We evaluate technical constraints, scope, and team structure",
              "Planning — We define deliverables, milestones, and collaboration approach",
              "Working together — Iterative design cycles with your team and stakeholders",
              "Delivery — Production-ready designs, documentation, and developer handoff"
            ]
          },
          {
            title: "This is for you if:",
            items: [
              "You have a clear vision and are ready to execute with design support",
              "Your product direction is defined and you need hands-on design craft",
              "You have development capacity ready to build what we design together",
              "You need end-to-end design work, not just strategic framing",
              "You're committed to the timeline and collaborative process required for delivery"
            ],
            preparation: {
              title: "How to prepare",
              content: "Have your product vision, technical constraints, and development timeline ready. If you're still defining direction, start with consultancy to align on strategy before moving to delivery."
            },
            relatedServices: {
              title: "Related services",
              before: ["consultancy"],
              after: ["courses", "mentoring"]
            }
          }
        ]
      },
      pt: {
        intro: "Design completo de produtos e sistemas que entrega.",
        sections: [
          {
            title: "O que fazemos",
            content: "Projetamos experiências de ponta a ponta para produtos web e mobile. De UX/UI a design systems, nosso trabalho é enraizado nas necessidades dos usuários, restrições técnicas e objetivos de negócio. Cuidamos de pesquisa, design, prototipagem e handoff para desenvolvimento—garantindo que o trabalho seja usável, escalável e pronto para construir."
          },
          {
            title: "Como funciona",
            items: [
              "Primeiro contato — Conversamos sobre sua visão de produto, usuários e necessidades de design",
              "Avaliação — Avaliamos restrições técnicas, escopo e estrutura do time",
              "Planejamento — Definimos entregas, marcos e abordagem de colaboração",
              "Trabalhando juntos — Ciclos iterativos de design com seu time e stakeholders",
              "Entrega — Designs prontos para produção, documentação e handoff para desenvolvimento"
            ]
          },
          {
            title: "Isso é pra você se:",
            items: [
              "Você tem uma visão clara e está pronto para executar com apoio de design",
              "A direção do seu produto está definida e você precisa de execução prática de design",
              "Você tem capacidade de desenvolvimento pronta para construir o que desenhamos juntos",
              "Você precisa de trabalho completo de design, não apenas enquadramento estratégico",
              "Você está comprometido com o cronograma e processo colaborativo necessário para entrega"
            ],
            preparation: {
              title: "Como se preparar",
              content: "Tenha sua visão de produto, restrições técnicas e cronograma de desenvolvimento prontos. Se ainda está definindo direção, comece com consultoria para alinhar estratégia antes de partir para entrega."
            },
            relatedServices: {
              title: "Serviços relacionados",
              before: ["consultancy"],
              after: ["courses", "mentoring"]
            }
          }
        ]
      }
    },
    courses: {
      en: {
        intro: "Design education built for context and craft.",
        sections: [
          {
            title: "What we do",
            content: "We teach design with intention. Our courses cover UX foundations, problem framing, design systems thinking, and leadership—all grounded in real-world application. Whether you're a PM looking to understand design, a designer leveling up, or a team building design maturity, we tailor content to your context and goals."
          },
          {
            title: "How it works",
            items: [
              "First contact — We discuss your team's learning needs and skill gaps",
              "Assessment — We evaluate current capabilities and define learning objectives",
              "Planning — We design curriculum, format, and session structure",
              "Working together — Hands-on sessions with exercises, discussion, and practice",
              "Delivery — Resources, frameworks, recordings, and continued learning support"
            ]
          },
          {
            title: "This is for you if:",
            items: [
              "You want your team to build lasting design capability, not just receive output",
              "You're committed to investing time in learning, not just hiring for immediate work",
              "Your team is ready to engage actively in practice and discussion",
              "You need shared design language and understanding across functions",
              "You value building internal capacity over outsourcing design decisions"
            ],
            preparation: {
              title: "How to prepare",
              content: "Identify your team's skill gaps and learning objectives. If you need immediate execution, consider delivery or consultancy while building capability through courses in parallel."
            },
            relatedServices: {
              title: "Related services",
              before: [],
              after: ["consultancy", "delivery", "mentoring"]
            }
          }
        ]
      },
      pt: {
        intro: "Educação em design feita para contexto e prática.",
        sections: [
          {
            title: "O que fazemos",
            content: "Ensinamos design com intenção. Nossos cursos cobrem fundamentos de UX, enquadramento de problemas, pensamento de design systems e liderança—tudo baseado em aplicação no mundo real. Seja você um PM buscando entender design, um designer evoluindo ou um time construindo maturidade em design, moldamos o conteúdo ao seu contexto e objetivos."
          },
          {
            title: "Como funciona",
            items: [
              "Primeiro contato — Conversamos sobre as necessidades de aprendizado do seu time e lacunas de habilidades",
              "Avaliação — Avaliamos capacidades atuais e definimos objetivos de aprendizado",
              "Planejamento — Desenhamos currículo, formato e estrutura das sessões",
              "Trabalhando juntos — Sessões práticas com exercícios, discussão e prática",
              "Entrega — Recursos, frameworks, gravações e suporte de aprendizado contínuo"
            ]
          },
          {
            title: "Isso é pra você se:",
            items: [
              "Você quer que seu time construa capacidade duradoura em design, não apenas receba entregas",
              "Você está comprometido em investir tempo em aprendizado, não apenas contratar para trabalho imediato",
              "Seu time está pronto para engajar ativamente em prática e discussão",
              "Você precisa de linguagem e entendimento compartilhado de design entre funções",
              "Você valoriza construir capacidade interna ao invés de terceirizar decisões de design"
            ],
            preparation: {
              title: "Como se preparar",
              content: "Identifique as lacunas de habilidades do seu time e objetivos de aprendizado. Se precisa de execução imediata, considere delivery ou consultoria enquanto constrói capacidade através de cursos em paralelo."
            },
            relatedServices: {
              title: "Serviços relacionados",
              before: [],
              after: ["consultancy", "delivery", "mentoring"]
            }
          }
        ]
      }
    },
    mentoring: {
      en: {
        intro: "Guidance for growth, transitions, and team development.",
        sections: [
          {
            title: "What we do",
            content: "We mentor designers, design leaders, and teams navigating growth or change. Whether you're shifting into design, leading a team for the first time, or building operations for scale, we provide structured guidance, feedback, and perspective. Our mentoring is practical, contextual, and focused on long-term capability building."
          },
          {
            title: "How it works",
            items: [
              "First contact — We discuss your current situation, challenges, and growth goals",
              "Assessment — We identify skill gaps, opportunities, and mentoring focus areas",
              "Planning — We create a mentoring roadmap with milestones and check-ins",
              "Working together — Regular sessions with feedback, guidance, and skill-building",
              "Delivery — Ongoing support, progress reviews, and adapted mentoring approach"
            ]
          },
          {
            title: "This is for you if:",
            items: [
              "You're committed to sustained growth over quick fixes or templated advice",
              "You need accountability, not just information or resources",
              "You're facing challenges that require context-specific guidance",
              "You're ready to reflect, practice, and iterate on your approach",
              "You value long-term capability building over short-term task completion"
            ],
            preparation: {
              title: "How to prepare",
              content: "Clarify your growth goals and specific challenges. If you need team-wide capability building, explore courses. For strategic or execution support, consider consultancy or delivery services."
            },
            relatedServices: {
              title: "Related services",
              before: [],
              after: ["courses", "consultancy", "delivery"]
            }
          }
        ]
      },
      pt: {
        intro: "Orientação para crescimento, transições e desenvolvimento de times.",
        sections: [
          {
            title: "O que fazemos",
            content: "Mentoramos designers, líderes de design e times navegando crescimento ou mudança. Seja você migrando para design, liderando um time pela primeira vez ou construindo operações para escala, fornecemos orientação estruturada, feedback e perspectiva. Nossa mentoria é prática, contextual e focada em construção de capacidade de longo prazo."
          },
          {
            title: "Como funciona",
            items: [
              "Primeiro contato — Conversamos sobre sua situação atual, desafios e objetivos de crescimento",
              "Avaliação — Identificamos lacunas de habilidades, oportunidades e áreas de foco da mentoria",
              "Planejamento — Criamos um roadmap de mentoria com marcos e check-ins",
              "Trabalhando juntos — Sessões regulares com feedback, orientação e desenvolvimento de habilidades",
              "Entrega — Suporte contínuo, revisões de progresso e abordagem de mentoria adaptada"
            ]
          },
          {
            title: "Isso é pra você se:",
            items: [
              "Você está comprometido com crescimento sustentado ao invés de soluções rápidas ou conselhos genéricos",
              "Você precisa de accountability, não apenas informação ou recursos",
              "Você enfrenta desafios que requerem orientação específica ao contexto",
              "Você está pronto para refletir, praticar e iterar sobre sua abordagem",
              "Você valoriza construção de capacidade de longo prazo ao invés de completar tarefas de curto prazo"
            ],
            preparation: {
              title: "Como se preparar",
              content: "Esclareça seus objetivos de crescimento e desafios específicos. Se precisa de construção de capacidade para todo o time, explore cursos. Para suporte estratégico ou de execução, considere serviços de consultoria ou delivery."
            },
            relatedServices: {
              title: "Serviços relacionados",
              before: [],
              after: ["courses", "consultancy", "delivery"]
            }
          }
        ]
      }
    }
  };

  const details = detailContent[offering.key]?.[lang];

  return (
    <div className="offering-detail-page">
      <div className="bg-noise"></div>

      <header className="active" data-scrolled="true">
        <div className="header-left">
          <Link to="/">
            <img src={logo} alt="Eixo Logo" className="logo" />
          </Link>
          <a href="/#offerings" className="back-link">
            ← {lang === 'en' ? 'Back to offerings' : 'Voltar para ofertas'}
          </a>
        </div>
        <div className="desktop-lang-switcher">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button>
        </div>
      </header>

      <main className="offering-detail-main">
        <div className="offering-detail-hero">
          <div className="offering-detail-header">
            <img src={offering.image} alt={`${offering.title[lang]} icon`} className="offering-detail-icon" />
            <h1>{offering.title[lang]}</h1>
            <h2 className="offering-detail-subtitle">{details?.intro}</h2>
          </div>
        </div>

        <div className="offering-detail-content">

          {/* What we do */}
          {details?.sections[0] && (
            <div className="offering-section-what">
              <h2>{details.sections[0].title}</h2>
              <p>{details.sections[0].content}</p>
            </div>
          )}

          {/* How it works - Timeline */}
          {details?.sections[1] && (
            <div className="offering-section-how">
              <h2>{details.sections[1].title}</h2>
              <div className="process-timeline">
                {details.sections[1].items?.map((item, i) => {
                  const [title, description] = item.split(' — ');
                  return (
                    <div key={i} className="process-step">
                      <div className="process-step-content">
                        <div className="process-step-title">{title}</div>
                        <div className="process-step-description">{description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* This is for you if - Checklist with Preparation */}
          {details?.sections[2] && (
            <div className="offering-section-fit">
              <div className="fit-requirements">
                <h2>{details.sections[2].title}</h2>
                <ul className="fit-checklist">
                  {details.sections[2].items?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              {details.sections[2].preparation && (
                <div className="fit-sidebar">
                  <div className="fit-preparation">
                    <h3>{details.sections[2].preparation.title}</h3>
                    <p>{details.sections[2].preparation.content}</p>
                  </div>
                  {details.sections[2].relatedServices && (
                    <div className="fit-related-services">
                      <h3>{details.sections[2].relatedServices.title}</h3>
                      {details.sections[2].relatedServices.before.length > 0 && (
                        <div className="related-group">
                          <span className="related-label">{lang === 'en' ? 'Start with' : 'Comece com'}</span>
                          <div className="related-links">
                            {details.sections[2].relatedServices.before.map((serviceKey) => {
                              const service = offerings.find(o => o.key === serviceKey);
                              return service ? (
                                <Link key={serviceKey} to={`/offerings/${serviceKey}`} className="related-link">
                                  {service.title[lang]}
                                </Link>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                      {details.sections[2].relatedServices.after.length > 0 && (
                        <div className="related-group">
                          <span className="related-label">{lang === 'en' ? 'Continue with' : 'Continue com'}</span>
                          <div className="related-links">
                            {details.sections[2].relatedServices.after.map((serviceKey) => {
                              const service = offerings.find(o => o.key === serviceKey);
                              return service ? (
                                <Link key={serviceKey} to={`/offerings/${serviceKey}`} className="related-link">
                                  {service.title[lang]}
                                </Link>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="offering-cta">
            <h2>{lang === 'en' ? 'Ready to start?' : 'Pronto para começar?'}</h2>
            <p>{lang === 'en'
              ? "Let's discuss your challenge and see how we can help."
              : 'Vamos conversar sobre seu desafio e ver como podemos ajudar.'}</p>
            <a href="mailto:hello@eixo.design" className="cta-button">
              {lang === 'en' ? "Let's talk" : 'Vamos conversar'}
            </a>
          </div>
        </div>
      </main>

      <Footer footerCopy={footerCopy} />
    </div>
  );
};

export default OfferingDetail;
