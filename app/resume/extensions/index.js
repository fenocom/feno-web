import StarterKit from "@tiptap/starter-kit";

import { CustomHeading } from "./core/CustomHeading.js";
import { CustomParagraph } from "./core/CustomParagraph.js";
import { CustomBold } from "./core/Bold.js";
import { CustomItalic } from "./core/Italic.js";
import { Underline } from "./core/Underline.js";
import { CustomLink } from "./core/Link.js";
import { CustomHighlight } from "./core/Highlight.js";
import { SlashCommand } from "./core/SlashCommand.js";

import { PersonalInfoNode } from "./blocks/PersonalInfoNode.js";
import { SummaryNode } from "./blocks/SummaryNode.js";
import { ExperienceNode } from "./blocks/ExperienceNode.js";
import { ProjectNode } from "./blocks/ProjectNode.js";
import { EducationNode } from "./blocks/EducationNode.js";
import { SkillsNode } from "./blocks/SkillsNode.js";
import { CustomSectionNode } from "./blocks/CustomSectionNode.js";

export const extensions = [
  StarterKit.configure({
    heading: false,
    paragraph: false,
    bold: false,
    italic: false,
    blockquote: {
      HTMLAttributes: { class: "border-l-4 border-slate-200 pl-4 text-slate-600" },
    },
  }),
  CustomHeading,
  CustomParagraph,
  CustomBold,
  CustomItalic,
  Underline,
  CustomLink,
  CustomHighlight.configure({ multicolor: true }),
  SlashCommand,
  PersonalInfoNode,
  SummaryNode,
  ExperienceNode,
  ProjectNode,
  EducationNode,
  SkillsNode,
  CustomSectionNode,
];


