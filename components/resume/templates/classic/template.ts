export const template = {
    type: "doc",
    content: [
        {
            type: "page",
            attrs: {
                format: "a4",
                backgroundColor: "#ffffff",
            },
            content: [
                {
                    type: "heading",
                    attrs: {
                        level: 1,
                        styles: {
                            "text-align": "center",
                            "font-size": "28px",
                            "font-weight": "700",
                            "margin-bottom": "4px",
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "ALEXANDER MORGAN" }],
                },

                {
                    type: "paragraph",
                    attrs: {
                        styles: {
                            "text-align": "center",
                            "font-size": "12px",
                            color: "#444",
                            "margin-bottom": "2px",
                            "font-family": "Georgia, serif",
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
                            "font-family": "Georgia, serif",
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
                {
                    type: "heading",
                    attrs: {
                        level: 2,
                        styles: {
                            "font-size": "16px",
                            "margin-top": "20px",
                            "font-weight": "700",
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "PROFESSIONAL SUMMARY" }],
                },

                {
                    type: "paragraph",
                    attrs: {
                        styles: {
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [
                        {
                            type: "text",
                            text: "Frontend Engineer with 3+ years of experience building performant, scalable web applications using React, Next.js, TypeScript, and modern UI systems. Strong focus on clean architecture, reusable components, and cross-functional collaboration.",
                        },
                    ],
                },
                {
                    type: "heading",
                    attrs: {
                        level: 2,
                        styles: {
                            "font-size": "16px",
                            "margin-top": "22px",
                            "font-weight": "700",
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "EXPERIENCE" }],
                },

                {
                    type: "paragraph",
                    attrs: {
                        styles: {
                            "font-weight": "700",
                            "font-size": "14px",
                            "margin-top": "8px",
                            "font-family": "Georgia, serif",
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
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "Jul 2022 – Present" }],
                },

                {
                    type: "bulletList",
                    attrs: {
                        styles: {
                            "font-family": "Georgia, serif",
                        },
                    },
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

                {
                    type: "paragraph",
                    attrs: {
                        styles: {
                            "font-weight": "700",
                            "font-size": "14px",
                            "margin-top": "14px",
                            "font-family": "Georgia, serif",
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
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "Jan 2022 – Jun 2022" }],
                },

                {
                    type: "bulletList",
                    attrs: {
                        styles: {
                            "font-family": "Georgia, serif",
                        },
                    },
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

                {
                    type: "heading",
                    attrs: {
                        level: 2,
                        styles: {
                            "font-size": "16px",
                            "margin-top": "22px",
                            "font-weight": "700",
                            "font-family": "Georgia, serif",
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
                            "font-family": "Georgia, serif",
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
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "2018 – 2022" }],
                },

                {
                    type: "heading",
                    attrs: {
                        level: 2,
                        styles: {
                            "font-size": "16px",
                            "margin-top": "22px",
                            "font-weight": "700",
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "SKILLS" }],
                },

                {
                    type: "paragraph",
                    attrs: {
                        styles: {
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [
                        {
                            type: "text",
                            text: "React, Next.js, TypeScript, Zustand, TailwindCSS, Radix UI, Node.js, Express.js, PostgreSQL, MongoDB, Docker, Redis",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: {
                        level: 2,
                        styles: {
                            "font-size": "16px",
                            "margin-top": "22px",
                            "font-weight": "700",
                            "font-family": "Georgia, serif",
                        },
                    },
                    content: [{ type: "text", text: "PROJECTS" }],
                },

                {
                    type: "paragraph",
                    attrs: {
                        styles: {
                            "font-family": "Georgia, serif",
                        },
                    },
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
                    attrs: {
                        styles: {
                            "font-family": "Georgia, serif",
                        },
                    },
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
};
