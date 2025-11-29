export const template = {
  type: "doc",
  content: [
    {
      type: "grid",
      attrs: { columnWidth: [100] },
      content: [
        {
          type: "gridColumn",
          attrs: {
            styles: {
              padding: "20px 28px",
              "font-family": "Georgia, serif",
              color: "#000000",
              "background-color": "#ffffff",
              width: "210mm",
              "min-height": "297mm",
              "box-sizing": "border-box",
              "font-size": "13px",
              "line-height": "1.5"
            }
          },
          content: [
            /* ======================= HEADER ======================= */
            {
              type: "heading",
              attrs: {
                level: 1,
                styles: {
                  "text-align": "center",
                  "font-size": "28px",
                  "font-weight": "700",
                  "margin-bottom": "6px"
                }
              },
              content: [{ type: "text", text: "ALEXANDER MORGAN" }]
            },

            {
              type: "paragraph",
              attrs: {
                styles: {
                  "text-align": "center",
                  "font-size": "12px",
                  color: "#444",
                  "margin-bottom": "4px"
                }
              },
              content: [
                { type: "text", text: "+1 555 908 3321 | alex.morgan@example.com | alexm.dev" }
              ]
            },

            {
              type: "paragraph",
              attrs: {
                styles: {
                  "text-align": "center",
                  "font-size": "12px",
                  color: "#444",
                  "margin-bottom": "14px"
                }
              },
              content: [
                { type: "text", text: "github.com/alexdev | linkedin.com/in/alexmorgan" }
              ]
            },

            { type: "horizontalRule" },

            /* ======================= SUMMARY ======================= */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "16px",
                  "margin-top": "14px",
                  "font-weight": "700"
                }
              },
              content: [{ type: "text", text: "PROFESSIONAL SUMMARY" }]
            },

            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text:
                    "Frontend Engineer with 3+ years of experience building scalable, high-performance web applications using React, Next.js, TypeScript, and modern UI systems. Strong focus on performance optimization, clean architecture, and delivering production-ready features. Proven ability to collaborate across teams and improve engineering efficiency."
                }
              ]
            },

            /* ======================= EXPERIENCE ======================= */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "16px",
                  "margin-top": "18px",
                  "font-weight": "700"
                }
              },
              content: [{ type: "text", text: "EXPERIENCE" }]
            },

            /* Job 1 */
            {
              type: "grid",
              attrs: { columnWidth: [70, 30] },
              content: [
                {
                  type: "gridColumn",
                  attrs: { styles: { "font-weight": "600", "font-size": "14px" } },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "TechNova Solutions — Frontend Engineer" }]
                    }
                  ]
                },
                {
                  type: "gridColumn",
                  attrs: { styles: { "text-align": "right", "white-space": "nowrap" } },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "July 2022 – Present" }]
                    }
                  ]
                }
              ]
            },

            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    { type: "paragraph", content: [
                      { type: "text", text: "Developed and optimized React components used by 200,000+ monthly users, improving page performance by 32%." }
                    ]}
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    { type: "paragraph", content: [
                      { type: "text", text: "Led migration from JavaScript to TypeScript across 30+ modules, reducing runtime errors by 45%." }
                    ]}
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    { type: "paragraph", content: [
                      { type: "text", text: "Implemented reusable UI component systems using Tailwind CSS and Radix UI, cutting development time by 25%." }
                    ]}
                  ]
                },
                {
                  type: "listItem",
                  content: [
                    { type: "paragraph", content: [
                      { type: "text", text: "Collaborated with backend teams to build scalable REST and GraphQL integrations." }
                    ]}
                  ]
                }
              ]
            },

            /* Job 2 */
            {
              type: "grid",
              attrs: { columnWidth: [70, 30] },
              content: [
                {
                  type: "gridColumn",
                  attrs: { styles: { "font-weight": "600", "font-size": "14px" } },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "BrightLabs — Software Engineer Intern" }]
                    }
                  ]
                },
                {
                  type: "gridColumn",
                  attrs: { styles: { "text-align": "right" } },
                  content: [
                    { type: "paragraph", content: [{ type: "text", text: "Jan 2022 – June 2022" }] }
                  ]
                }
              ]
            },

            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    { type: "paragraph", content: [
                      { type: "text", text: "Built internal tooling dashboards using React and Zustand, reducing report generation time by 70%." }
                    ]}
                  ]
                }
              ]
            },

            /* ======================= EDUCATION ======================= */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "16px",
                  "margin-top": "18px",
                  "font-weight": "700"
                }
              },
              content: [{ type: "text", text: "EDUCATION" }]
            },

            {
              type: "grid",
              attrs: { columnWidth: [75, 25] },
              content: [
                {
                  type: "gridColumn",
                  attrs: { styles: { "font-weight": "600" } },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "California Institute of Technology — B.Sc. Software Engineering" }]
                    }
                  ]
                },
                {
                  type: "gridColumn",
                  attrs: { styles: { "text-align": "right" } },
                  content: [
                    { type: "paragraph", content: [{ type: "text", text: "2018 – 2022" }] }
                  ]
                }
              ]
            },

            {
              type: "paragraph",
              content: [{ type: "text", text: "CGPA: 8.12 / 10" }]
            },

            /* ======================= SKILLS ======================= */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "16px",
                  "margin-top": "18px",
                  "font-weight": "700"
                }
              },
              content: [{ type: "text", text: "SKILLS" }]
            },

            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    { type: "paragraph",
                      content: [
                        { type: "text", text: "React, Next.js, JavaScript, TypeScript, Zustand, Tailwind CSS, Radix UI, Node.js, Express.js, PostgreSQL, MongoDB, GraphQL, Docker" }
                      ]
                    }
                  ]
                }
              ]
            },

            /* ======================= PROJECTS ======================= */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "16px",
                  "margin-top": "18px",
                  "font-weight": "700"
                }
              },
              content: [{ type: "text", text: "PROJECTS" }]
            },

            {
              type: "paragraph",
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "TaskFlow — " },
                { type: "text", text: "Kanban task manager with real-time collaboration using WebSockets." }
              ]
            },

            {
              type: "paragraph",
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "ShopBase — " },
                { type: "text", text: "Full-stack e-commerce starter kit using Next.js + Stripe." }
              ]
            },

            /* ======================= PUBLICATIONS ======================= */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "16px",
                  "margin-top": "18px",
                  "font-weight": "700"
                }
              },
              content: [{ type: "text", text: "PUBLICATIONS" }]
            },

            {
              type: "paragraph",
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "[J.1] " },
                {
                  type: "text",
                  text: "Morgan, A., et al. (2021). A Study on Frontend Performance Optimization. IEEE Journal."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
