const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderText = (node) => {
  let text = escapeHtml(node.text ?? "");
  if (node.marks) {
    node.marks.forEach((mark) => {
      if (mark.type === "bold") {
        text = `<strong>${text}</strong>`;
      }
      if (mark.type === "italic") {
        text = `<em>${text}</em>`;
      }
      if (mark.type === "underline") {
        text = `<span style="text-decoration:underline">${text}</span>`;
      }
      if (mark.type === "link") {
        text = `<a href="${escapeHtml(mark.attrs?.href ?? "#")}" target="_blank" rel="noreferrer">${text}</a>`;
      }
    });
  }
  return text;
};

const renderContent = (content = []) => content.map(renderNode).join("");

const renderNode = (node) => {
  if (!node) return "";
  switch (node.type) {
    case "text":
      return renderText(node);
    case "customParagraph":
      return `<p>${renderContent(node.content)}</p>`;
    case "customHeading": {
      const level = node.attrs?.level ?? 2;
      return `<h${level}>${renderContent(node.content)}</h${level}>`;
    }
    case "personalInfo": {
      const { title, location, email, phone } = node.attrs ?? {};
      return `<section><div class="section-title">Profile</div><p>${escapeHtml(title ?? "")}</p><p>${escapeHtml(
        location ?? ""
      )}</p><p>${escapeHtml(email ?? "")}</p><p>${escapeHtml(phone ?? "")}</p></section>`;
    }
    case "summary":
      return `<section><div class="section-title">Summary</div><div class="summary">${renderContent(
        node.content
      )}</div></section>`;
    case "experience": {
      const { company, role, dates } = node.attrs ?? {};
      return `<section><div class="section-title">Experience</div><div class="experience-card"><h3>${escapeHtml(
        role ?? ""
      )}</h3><div class="metadata">${escapeHtml(company ?? "")} • ${escapeHtml(dates ?? "")}</div><div>${renderContent(
        node.content
      )}</div></div></section>`;
    }
    case "education": {
      const { school, degree, dates } = node.attrs ?? {};
      return `<section><div class="section-title">Education</div><div class="experience-card"><h3>${escapeHtml(
        school ?? ""
      )}</h3><div class="metadata">${escapeHtml(degree ?? "")} • ${escapeHtml(dates ?? "")}</div><div>${renderContent(
        node.content
      )}</div></div></section>`;
    }
    case "project":
      return `<section><div class="section-title">Projects</div><div class="experience-card">${renderContent(
        node.content
      )}</div></section>`;
    case "skills": {
      const items = node.attrs?.items ?? [];
      return `<section class="space-y-2"><div class="section-title">Skills</div><ul class="m-0 flex flex-wrap gap-2 list-none p-0 text-sm text-slate-600">${items
        .map(
          (skill) =>
            `<li class="rounded-full bg-slate-100 px-3 py-1 text-slate-700">${escapeHtml(skill)}</li>`,
        )
        .join("")}</ul></section>`;
    }
    case "customSection": {
      const { title } = node.attrs ?? {};
      return `<section><div class="section-title">${escapeHtml(title ?? "Section")}</div>${renderContent(
        node.content
      )}</section>`;
    }
    default:
      return renderContent(node.content);
  }
};

export const jsonToDOM = (document) => {
  if (!document || !Array.isArray(document.content)) {
    return "";
  }
  return document.content.map(renderNode).join("");
};


