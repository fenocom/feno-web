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
                content: [{ type: "text", text: "UJWAL PRATAP SINGH" }],
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
                  { type: "text", text: "+91 7014671715 | " },
                  { type: "text", text: "Email", marks: [{ type: "underline" }] },
                  { type: "text", text: " | " },
                  { type: "text", text: "Github", marks: [{ type: "underline" }] },
                  { type: "text", text: " | " },
                  {
                    type: "text",
                    text: "Linkedin",
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
                    text: "Lovely Professional University (2019–2023)",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "B.Tech in Computer Science and Engineering",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [{ type: "text", text: "CGPA: 7.61" }],
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
                          {
                            type: "text",
                            text: "Myntra - M1 Software Engineer",
                          },
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
                        content: [{ type: "text", text: "01/2025 - present" }],
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
                            text: "Implemented reusable and scalable common UI components.",
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
                            text: "Managed the Node.js layer for authentication and authorization.",
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
                            text: "Integrated Grafana monitoring into the Node layer for BFF API calls.",
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
                            text: "Performed data migration from FCC to Myntra DB through APIs.",
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
                            text: "C++, Python, JavaScript, TypeScript, React, Next.js, Zustand, GraphQL, Hasura",
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
                content: [{ type: "text", text: "PERSONAL PROJECTS" }],
              },
              { type: "horizontalRule" },
  
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [{ type: "bold" }],
                    text: "EazyChats",
                  },
                  { type: "text", text: " — Multi-page real-time chat application." },
                ],
              },
  
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [{ type: "bold" }],
                    text: "Clipphy",
                  },
                  {
                    type: "text",
                    text: " — Serverless URL shortener using Vercel + GitHub.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  