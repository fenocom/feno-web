import { Node, mergeAttributes } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";

const GridRenderer = ({ node }: NodeViewProps) => {
  const gridTemplate = node.attrs.columnWidth
    .map((w: number) => `${w}fr`)
    .join(" ");

  return (
    <NodeViewWrapper as="div">
      <NodeViewContent
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplate,
          gap: "1rem",
          width: "100%",
        }}
      />
    </NodeViewWrapper>
  );
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    grid: {
      insertGrid: (cols?: number[]) => ReturnType;
    };
  }
}

export const Grid = Node.create({
  name: "grid",
  group: "block",
  content: "gridColumn+",

  addAttributes() {
    return {
      columnWidth: {
        default: [50, 50],
        parseHTML: (element) => {
          const width = element.getAttribute("data-col-width");
          return width ? JSON.parse(width) : [50, 50];
        },
        renderHTML: (attributes) => {
          return {
            "data-col-width": JSON.stringify(attributes.columnWidth),
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='grid']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "grid" }), 0];
  },

  addCommands() {
    return {
      insertGrid:
        (cols = [50, 50]) =>
        ({ tr, dispatch, state }) => {
          const { schema } = state;

          const nodes = cols.map((_) => {
            return schema.nodes.gridColumn.create({}, [
              schema.nodes.paragraph.create({}, []),
            ]);
          });

          const gridNode = schema.nodes.grid.create(
            { columnWidth: cols },
            nodes,
          );

          if (dispatch) {
            tr.replaceSelectionWith(gridNode);
          }

          return true;
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(GridRenderer);
  },
});
