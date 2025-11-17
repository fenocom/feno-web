// grid.jsx
"use client";

import React from "react";
import {
  Node,
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
} from "@tiptap/react";

/**
 * GridColumn node - child node that accepts normal block content
 * HTML: <div data-type="grid-column"> ...child blocks... </div>
 */
export const GridColumn = Node.create({
  name: "grid_column",
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[data-type="grid-column"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "grid-column", ...HTMLAttributes }, 0];
  },
});

/**
 * React node view for the grid node
 * - Header (non-editable)
 * - Two-column layout container which will contain the
 *   two grid_column children rendered by ProseMirror/Tiptap
 */
function GridComponent() {
  // inline styles so you can paste quickly — replace with classes if you prefer
  const wrapperStyle = {
    border: "1px dashed #cfcfcf",
    padding: 12,
    borderRadius: 6,
    margin: "8px 0",
    background: "#fff",
  };

  const headerStyle = {
    fontWeight: 700,
    marginBottom: 8,
    background: "#ff4d4f",
    color: "#fff",
    padding: "6px 8px",
    borderRadius: 4,
    display: "inline-block",
    userSelect: "none",
  };

  const columnsWrapperStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    alignItems: "start",
  };

  return (
    <NodeViewWrapper as="div" data-type="grid-node" style={wrapperStyle}>
      {/* Non-editable header */}
      <div style={headerStyle} contentEditable={false} suppressContentEditableWarning>
        Hola Grid
      </div>

      {/* The container that will hold both grid_column child nodes */}
      {/* NodeViewContent is where the editor's children are rendered */}
      {/* We set styles so the two grid_column children render side-by-side */}
      <div style={columnsWrapperStyle}>
        {/* The child nodes (grid_column) will be rendered inside this NodeViewContent.
            Because our grid_node contains *two* grid_column children, ProseMirror
            will render both as children inside this single NodeViewContent.
            We style the immediate children via the CSS attribute selectors below. */}
        <NodeViewContent as="div" style={{ display: "contents" }} />
      </div>

      <style jsx>{`
        /* Ensure each rendered grid_column gets correct column styling.
           The NodeViewContent above renders the grid_column DOM elements as direct
           children of the columnsWrapper. Target them here for column appearance. */
        div[data-type="grid-node"] > div[data-type="grid-column"] {
          /* each column becomes a grid cell visually */
        }

        /* Because NodeViewContent uses display:contents (above),
           the actual grid_column elements are direct children of the grid wrapper.
           We use the selector below to style them. */
        div[data-type="grid-node"] div[data-type="grid-column"] {
          padding: 8;
          border-radius: 6px;
          border: 1px solid #eee;
          background: #fff;
          min-height: 40px;
        }

        /* Make sure paragraphs inside columns have no extra margin that breaks layout */
        div[data-type="grid-node"] div[data-type="grid-column"] p {
          margin: 0 0 8px 0;
        }
      `}</style>
    </NodeViewWrapper>
  );
}

/**
 * GridNode (parent) definition
 * - group: block
 * - content: two grid_column children (exactly two)
 *  -> to allow exactly two columns: use `grid_column grid_column`
 */
export const GridNode = Node.create({
  name: "grid_node",
  // put it in the block group so StarterKit paragraphs/etc. can sit inside columns
  group: "block",
  // require exactly two child column nodes inside the grid node
  content: "grid_column grid_column",

  // HTML parsing/rendering
  parseHTML() {
    return [{ tag: 'div[data-type="grid-node"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "grid-node", ...HTMLAttributes }, 0];
  },

  // Render using our React component
  addNodeView() {
    return ReactNodeViewRenderer(GridComponent);
  },

  // Provide a simple input rule/commands or attributes if you want later...
});
