const textNode = (text = "") => {
  if (!text) {
    return [];
  }

  return [
    {
      type: "text",
      text,
    },
  ];
};

const paragraph = (text = "") => ({
  type: "paragraph",
  content: textNode(text),
});

const heading = (text, level = 2) => ({
  type: "heading",
  attrs: { level },
  content: textNode(text),
});

const bulletList = (items = []) => ({
  type: "bulletList",
  content: items.map((item) => ({
    type: "listItem",
    content: [paragraph(item)],
  })),
});

const projectParagraph = (project) => {
  const parts = [project.name];
  if (project.url) {
    parts.push(`(${project.url})`);
  }

  return paragraph(`${parts.join(" ")} — ${project.description}`);
};

const formatDuration = (start, end) => {
  if (!start && !end) return "";
  if (start && end) return `${start} • ${end}`;
  return start || end || "";
};

export const buildDocFromTemplate = (template) => {
  const content = [];
  const { personal, summary, education, experience, projects, skills } =
    template;

  if (personal?.name) {
    content.push(heading(personal.name, 1));
  }

  const subtitle = [personal?.title, personal?.location]
    .filter(Boolean)
    .join(" • ");
  if (subtitle) {
    content.push(paragraph(subtitle));
  }

  const contact = [personal?.email, personal?.phone]
    .filter(Boolean)
    .join(" | ");
  if (contact) {
    content.push(paragraph(contact));
  }

  if (Array.isArray(personal?.links) && personal.links.length > 0) {
    const links = personal.links
      .map((link) => `${link.type}: ${link.url}`)
      .join("  •  ");
    content.push(paragraph(links));
  }

  if (summary) {
    content.push(heading("Summary"));
    content.push(paragraph(summary));
  }

  if (Array.isArray(experience) && experience.length > 0) {
    content.push(heading("Experience"));

    experience.forEach((role) => {
      content.push(heading(role.title, 3));
      content.push(
        paragraph(
          [role.company, role.location, formatDuration(role.start, role.end)]
            .filter(Boolean)
            .join(" • ")
        )
      );

      if (Array.isArray(role.bullets) && role.bullets.length > 0) {
        content.push(bulletList(role.bullets));
      }
    });
  }

  if (Array.isArray(projects) && projects.length > 0) {
    content.push(heading("Projects"));
    projects.forEach((project) => {
      content.push(projectParagraph(project));
    });
  }

  if (Array.isArray(education) && education.length > 0) {
    content.push(heading("Education"));
    education.forEach((degree) => {
      content.push(heading(degree.degree, 3));
      content.push(
        paragraph(
          [
            degree.institution,
            degree.location,
            formatDuration(degree.start, degree.end),
            degree.grade ? `CGPA ${degree.grade}` : null,
          ]
            .filter(Boolean)
            .join(" • ")
        )
      );
      if (degree.description) {
        content.push(paragraph(degree.description));
      }
    });
  }

  if (Array.isArray(skills) && skills.length > 0) {
    content.push(heading("Skills"));
    content.push(paragraph(skills.join(", ")));
  }

  return {
    type: "doc",
    content,
  };
};

