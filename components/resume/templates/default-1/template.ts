export const template = {
    type: "doc",
    content: [
        {
            type: "grid",
            attrs: {
                columnWidth: [33, 67],
            },
            content: [
                {
                    type: "gridColumn",
                    attrs: {
                        styles: {
                            "background-color": "#2c3440",
                            color: "#ffffff",
                            padding: "2rem",
                            "font-family": "Arial, sans-serif",
                            "min-height": "100%",
                        },
                    },
                    content: [
                        {
                            type: "image",
                            attrs: {
                                src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
                                alt: "Profile Photo",
                                style: "width: 100%; height: auto; border-radius: 4px; display: block; margin-bottom: 20px;",
                            },
                        },
                        {
                            type: "heading",
                            attrs: {
                                level: 1,
                                styles: {
                                    "font-size": "2.2rem",
                                    "line-height": "1.2",
                                },
                            },
                            content: [{ type: "text", text: "Susan Williams" }],
                        },
                        { type: "paragraph" },
                        {
                            type: "heading",
                            attrs: {
                                level: 3,
                                styles: {
                                    "font-size": "1.3rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [{ type: "text", text: "Contact" }],
                        },
                        { type: "horizontalRule" },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "Address:",
                                },
                                { type: "hardBreak" },
                                {
                                    type: "text",
                                    text: "177 Great Portland Street, London",
                                },
                                { type: "hardBreak" },
                                { type: "text", text: "W5W 6PQ" },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "Phone:",
                                },
                                { type: "hardBreak" },
                                { type: "text", text: "+1 (970) 333-3833" },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "E-mail:",
                                },
                                { type: "hardBreak" },
                                {
                                    type: "text",
                                    text: "susan.williams@coolfreecv.com",
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "LinkedIn:",
                                },
                                { type: "hardBreak" },
                                {
                                    type: "text",
                                    text: "linkedin.com/susan.williams",
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    marks: [{ type: "bold" }],
                                    text: "WWW:",
                                },
                                { type: "hardBreak" },
                                {
                                    type: "text",
                                    text: "https://www.coolfreecv.com",
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "heading",
                            attrs: {
                                level: 3,
                                styles: {
                                    "font-size": "1.3rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [
                                { type: "text", text: "Additional Skills" },
                            ],
                        },
                        { type: "horizontalRule" },
                        { type: "paragraph" },
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
                                                    text: "Results-oriented",
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
                                                    text: "Organisational capacity",
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
                                                    text: "Revenue generation",
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
                                                    text: "Business development",
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
                                                    text: "Effective marketing",
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
                                                    text: "Organisational capacity",
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
                                                    text: "Operability and commitment",
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
                                                    text: "Ability to motivate staff",
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
                                                    text: "Maintain good relations",
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
                                                    text: "Organisational capacity",
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
                                                    text: "Resistance to stress",
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
                                                    text: "Good manners",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "gridColumn",
                    attrs: {
                        styles: {
                            padding: "1rem 2rem",
                            "background-color": "#ffffff",
                            color: "#333333",
                            "font-family": "Arial, sans-serif",
                        },
                    },
                    content: [
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "1.6rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [
                                { type: "text", text: "Professional Summary" },
                            ],
                        },
                        { type: "horizontalRule" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Store Manager equipped with extensive experience in automotive sales management. Employs excellent leadership skills and multi-tasking strengths. Demonstrated ability to improve store operations, increase top line sales, and reduce costs.",
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "1.6rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [
                                { type: "text", text: "Work Experience" },
                            ],
                        },
                        { type: "horizontalRule" },
                        { type: "paragraph" },
                        {
                            type: "grid",
                            attrs: { columnWidth: [75, 25] },
                            content: [
                                {
                                    type: "gridColumn",
                                    attrs: {
                                        styles: {
                                            padding: "0",
                                            "font-weight": "bold",
                                        },
                                    },
                                    content: [
                                        {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "Store Manager LUXURY CAR CENTER, New York",
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
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "09/2015 to 05/2019",
                                                },
                                            ],
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
                                                    text: "Motivate and coach employees to meet service, sales, and repair goals.",
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
                                                    text: "Create and modify employee schedules with service levels in mind.",
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
                                                    text: "Recruit and hire top mechanics, service advisors, and sales people.",
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
                                                    text: "Maintain detailed logs and reports of services performed, profit, and budget information.",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "grid",
                            attrs: { columnWidth: [75, 25] },
                            content: [
                                {
                                    type: "gridColumn",
                                    attrs: {
                                        styles: {
                                            padding: "0",
                                            "font-weight": "bold",
                                        },
                                    },
                                    content: [
                                        {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "Store Manager LUXURY CAR CENTER, New York",
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
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "09/2015 to 05/2019",
                                                },
                                            ],
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
                                                    text: "Motivate and coach employees to meet service, sales, and repair goals.",
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
                                                    text: "Recruit and hire top mechanics, service advisors, and sales people.",
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
                                                    text: "Maintain detailed logs and reports of services performed, profit, and budget information.",
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
                                                    text: "Help out in sales and repair areas as needed and maintain comprehensive current knowledge of operations.",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "1.6rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [{ type: "text", text: "Education" }],
                        },
                        { type: "horizontalRule" },
                        { type: "paragraph" },
                        {
                            type: "grid",
                            attrs: { columnWidth: [75, 25] },
                            content: [
                                {
                                    type: "gridColumn",
                                    attrs: { styles: { padding: "0" } },
                                    content: [
                                        {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "text",
                                                    marks: [{ type: "bold" }],
                                                    text: "Bachelor of Science: Automotive Technology",
                                                },
                                            ],
                                        },
                                        {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "Technical Institute, NY",
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
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "2009-2015",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "grid",
                            attrs: { columnWidth: [75, 25] },
                            content: [
                                {
                                    type: "gridColumn",
                                    attrs: { styles: { padding: "0" } },
                                    content: [
                                        {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "text",
                                                    marks: [{ type: "bold" }],
                                                    text: "Bachelor of Science: Automotive Technology",
                                                },
                                            ],
                                        },
                                        {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "Technical Institute, NY",
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
                                            content: [
                                                {
                                                    type: "text",
                                                    text: "2015-2018",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "1.6rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [{ type: "text", text: "Languages" }],
                        },
                        { type: "horizontalRule" },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Spanish — Intermediate",
                                },
                            ],
                        },
                        { type: "paragraph" },
                        {
                            type: "heading",
                            attrs: {
                                level: 2,
                                styles: {
                                    "font-size": "1.6rem",
                                    "font-weight": "bold",
                                },
                            },
                            content: [{ type: "text", text: "Hobby" }],
                        },
                        { type: "horizontalRule" },
                        { type: "paragraph" },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Playing chess - great way to unwind, destress, and keep the mind sharp.",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
