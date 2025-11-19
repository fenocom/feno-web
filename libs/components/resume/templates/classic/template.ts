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
              padding: "2rem",
              "font-family": "Inter, Arial, sans-serif",
              color: "#111",
            },
          },
          content: [
            /* ===========================
             * NAME + TITLE + CONTACT
             * =========================== */
            {
              type: "heading",
              attrs: {
                level: 1,
                styles: {
                  "font-size": "2.4rem",
                  "font-weight": "700",
                  "margin-bottom": "0.25rem",
                },
              },
              content: [{ type: "text", text: "ALEXANDER MORGAN" }],
            },

            {
              type: "paragraph",
              attrs: {
                styles: {
                  "font-size": "0.95rem",
                  "font-weight": "500",
                  color: "#444",
                  "margin-bottom": "0.75rem",
                },
              },
              content: [
                { type: "text", text: "+1 555 908 3321 | " },
                { type: "text", text: "alex.morgan@example.com", marks: [{ type: "underline" }] },
                { type: "text", text: " | " },
                { type: "text", text: "github.com/alexdev", marks: [{ type: "underline" }] },
                { type: "text", text: " | " },
                {
                  type: "text",
                  text: "linkedin.com/in/alexmorgan",
                  marks: [{ type: "underline" }],
                },
              ],
            },

            { type: "horizontalRule" },

            /* ===========================
             * EDUCATION
             * =========================== */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "1.3rem",
                  "font-weight": "700",
                  "margin-top": "1.6rem",
                },
              },
              content: [{ type: "text", text: "EDUCATION" }],
            },
            { type: "horizontalRule" },

            {
              type: "paragraph",
              attrs: { styles: { "margin-top": "0.5rem" } },
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "California Institute of Technology (2018–2022)",
                },
              ],
            },
            {
              type: "paragraph",
              content: [{ type: "text", text: "B.Sc. in Software Engineering" }],
            },
            {
              type: "paragraph",
              content: [{ type: "text", text: "CGPA: 8.12 / 10" }],
            },

            /* ===========================
             * EXPERIENCE
             * =========================== */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "1.3rem",
                  "font-weight": "700",
                  "margin-top": "1.6rem",
                },
              },
              content: [{ type: "text", text: "EXPERIENCE" }],
            },
            { type: "horizontalRule" },

            /* --- Job 1 --- */
            {
              type: "grid",
              attrs: { columnWidth: [70, 30] },
              content: [
                {
                  type: "gridColumn",
                  attrs: { styles: { padding: "0", "font-weight": "600" } },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        { type: "text", text: "TechNova Solutions — Frontend Engineer" },
                      ],
                    },
                  ],
                },
                {
                  type: "gridColumn",
                  attrs: {
                    styles: {
                      padding: "0",
                      "text-align": "right",
                      "white-space": "nowrap",
                    },
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "07/2022 - Present" }],
                    },
                  ],
                },
              ],
            },

            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Developed responsive UIs using React, Next.js and TypeScript.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Optimized rendering performance, improving page speed by 32%.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Integrated company-wide design system and reusable components.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Collaborated with backend team on scalable API design.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* ===========================
             * SKILLS
             * =========================== */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "1.3rem",
                  "font-weight": "700",
                  "margin-top": "1.6rem",
                },
              },
              content: [{ type: "text", text: "TECHNICAL SKILLS" }],
            },
            { type: "horizontalRule" },

            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text:
                            "JavaScript, TypeScript, React, Next.js, Redux, Zustand, Tailwind CSS, Node.js, Express.js, PostgreSQL, MongoDB, GraphQL, Docker",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* ===========================
             * PROJECTS
             * =========================== */
            {
              type: "heading",
              attrs: {
                level: 2,
                styles: {
                  "font-size": "1.3rem",
                  "font-weight": "700",
                  "margin-top": "1.6rem",
                },
              },
              content: [{ type: "text", text: "PROJECTS" }],
            },
            { type: "horizontalRule" },

            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "TaskFlow — Kanban Task Manager",
                },
                { type: "text", text: " — Built a real-time task board using Zustand + WebSockets." },
              ],
            },

            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "ShopBase",
                },
                {
                  type: "text",
                  text: " — E-commerce starter kit built with Next.js + Stripe.",
                },
              ],
            },

            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "PictoAI",
                },
                {
                  type: "text",
                  text: " — AI-powered image caption generator using HuggingFace APIs.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
