import { Node } from "@tiptap/core";

export const createNode = ({ name, group = "block", atom = false, addAttributes = () => ({}), renderHTML }) =>
  Node.create({
    name,
    group,
    atom,
    content: atom ? "" : "inline*",
    selectable: true,
    addAttributes,
    parseHTML() {
      return [{ tag: `section[data-node="${name}"]` }];
    },
    renderHTML({ HTMLAttributes }) {
      return [
        "section",
        {
          ...HTMLAttributes,
          "data-node": name,
          class: `resume-node resume-${name}`,
        },
        0,
      ];
    },
    addCommands() {
      return {
        [`insert${name.charAt(0).toUpperCase() + name.slice(1)}`]:
          () =>
          ({ commands }) =>
            commands.insertContent({ type: name }),
        [`toggle${name.charAt(0).toUpperCase() + name.slice(1)}`]:
          () =>
          ({ commands }) =>
            commands.insertContent({ type: name }),
      };
    },
    ...({ renderHTML } ?? {}),
  });


