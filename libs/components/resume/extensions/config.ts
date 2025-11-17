import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Grid, GridColumn } from "./grid";

export const extensionsConfig = [
  StarterKit,
  Grid,
  GridColumn,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  Typography,
  TextStyle,
  Color,
  Placeholder.configure({
    placeholder: "Let's start fresh",
  }),
];
