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
                            padding: "28px 36px",
                            "background-color": "#ffffff",
                            "font-family": "Georgia, serif",
                            color: "#000",
                            "font-size": "13px",
                            "line-height": "1.55",
                            "box-sizing": "border-box",
                            width: "100%",
                            "min-height": "297mm",
                        },
                    },
                    content: [
                        /* ===========================================================
                         * HEADER
                         * =========================================================== */
                        {
                            type: "heading",
                            attrs: {
                                level: 1,
                                styles: {
                                    "text-align": "center",
                                    "font-size": "28px",
                                    "font-weight": "700",
                                    "margin-bottom": "4px",
                                },
                            },
                            content: [
                                { type: "text", text: "ALEXANDER MORGAN" },
                            ],
                        },

                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "text-align": "center",
                                    "font-size": "12px",
                                    color: "#444",
                                    "margin-bottom": "2px",
                                },
                            },
                            content: [
                                {
                                    type: "text",
                                    text: "+1 555 908 3321 • alex.morgan@example.com • alexm.dev",
                                },
                            ],
                        },

                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "text-align": "center",
                                    "font-size": "12px",
                                    color: "#444",
                                    "margin-bottom": "14px",
                                },
                            },
                            content: [
                                {
                                    type: "text",
                                    text: "GitHub: github.com/alexdev • LinkedIn: linkedin.com/in/alexmorgan",
                                },
                            ],
                        },

                        { type: "horizontalRule" },

                        /* ===========================================================
                         * SUMMARY
                         * =========================================================== */
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "16px",
                                    "margin-top": "20px",
                                    "font-weight": "700",
                                },
                            },
                            content: [
                                { type: "text", text: "PROFESSIONAL SUMMARY" },
                            ],
                        },

                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Frontend Engineer with 3+ years of experience building performant, scalable web applications using React, Next.js, TypeScript, and modern UI systems. Strong focus on clean architecture, reusable components, and cross-functional collaboration.",
                                },
                            ],
                        },

                        /* ===========================================================
                         * EXPERIENCE
                         * =========================================================== */
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "16px",
                                    "margin-top": "22px",
                                    "font-weight": "700",
                                },
                            },
                            content: [{ type: "text", text: "EXPERIENCE" }],
                        },

                        /* —— Job 1 —— */
                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "font-weight": "700",
                                    "font-size": "14px",
                                    "margin-top": "8px",
                                },
                            },
                            content: [
                                {
                                    type: "text",
                                    text: "TechNova Solutions — Frontend Engineer",
                                },
                            ],
                        },

                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "font-size": "12px",
                                    color: "#555",
                                    "margin-bottom": "6px",
                                },
                            },
                            content: [
                                { type: "text", text: "Jul 2022 – Present" },
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
                                                    text: "Optimized React components serving 200k+ monthly users, improving speed by 32%.",
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
                                                    text: "Migrated 30+ modules from JS → TS reducing runtime bugs by 40%.",
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
                                                    text: "Designed reusable UI systems in Tailwind + Radix UI reducing dev time by 25%.",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },

                        /* —— Job 2 —— */
                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "font-weight": "700",
                                    "font-size": "14px",
                                    "margin-top": "14px",
                                },
                            },
                            content: [
                                {
                                    type: "text",
                                    text: "BrightLabs — Software Engineer Intern",
                                },
                            ],
                        },

                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "font-size": "12px",
                                    color: "#555",
                                    "margin-bottom": "6px",
                                },
                            },
                            content: [
                                { type: "text", text: "Jan 2022 – Jun 2022" },
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
                                                    text: "Built internal dashboards using React + Zustand, reducing reporting time by 70%.",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },

                        /* ===========================================================
                         * EDUCATION
                         * =========================================================== */
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "16px",
                                    "margin-top": "22px",
                                    "font-weight": "700",
                                },
                            },
                            content: [{ type: "text", text: "EDUCATION" }],
                        },

                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "font-weight": "700",
                                    "margin-top": "6px",
                                },
                            },
                            content: [
                                {
                                    type: "text",
                                    text: "California Institute of Technology — B.Sc. Software Engineering",
                                },
                            ],
                        },

                        {
                            type: "paragraph",
                            attrs: {
                                styles: {
                                    "font-size": "12px",
                                    color: "#555",
                                    "margin-bottom": "6px",
                                },
                            },
                            content: [{ type: "text", text: "2018 – 2022" }],
                        },

                        /* ===========================================================
                         * SKILLS
                         * =========================================================== */
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "16px",
                                    "margin-top": "22px",
                                    "font-weight": "700",
                                },
                            },
                            content: [{ type: "text", text: "SKILLS" }],
                        },

                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "React, Next.js, TypeScript, Zustand, TailwindCSS, Radix UI, Node.js, Express.js, PostgreSQL, MongoDB, Docker, Redis",
                                },
                            ],
                        },

                        /* ===========================================================
                         * PROJECTS
                         * =========================================================== */
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "16px",
                                    "margin-top": "22px",
                                    "font-weight": "700",
                                },
                            },
                            content: [{ type: "text", text: "PROJECTS" }],
                        },

                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "TaskFlow — ",
                                },
                                {
                                    type: "text",
                                    text: "Kanban task manager with real-time collaboration.",
                                },
                            ],
                        },

                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "ShopBase — ",
                                },
                                {
                                    type: "text",
                                    text: "E-commerce starter kit using Next.js + Stripe.",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
