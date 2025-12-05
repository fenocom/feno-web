"use client";

import {
  type Connection,
  type Edge,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { FileDown, Shuffle, Globe } from "lucide-react";
import Toolbar from "./menus/toolbar";
import { ResumeEditor } from "./resume-editor";
import { downloadPDF } from "./utils";
import { usePrintResume } from "./hooks/use-print-resume";

const nodeTypes = {
  "resume-editor": ResumeEditor,
};

const initialNodes: Node[] = [
  {
    id: "node-1",
    type: "resume-editor",
    position: { x: 0, y: 0 },
    data: {},
  },
];

export const ResumePage = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const {printResume} = usePrintResume();

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const switchTemplate = () => {};

  const createPortfolio = () => {};

  const toolbarConfig = [
    {
      id: "download",
      label: "Download PDF",
      icon: FileDown,
      action: printResume,
      disabled: false,
    },
    {
      id: "switch-template",
      label: "Switch Template",
      icon: Shuffle,
      action: switchTemplate,
      disabled: false,
    },
    {
      id: "create-portfolio",
      label: "Create Portfolio",
      icon: Globe,
      action: createPortfolio,
      disabled: true,
      className: "opacity-50 cursor-not-allowed",
    },
  ];



  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbar config={toolbarConfig} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="w-full h-full"
      />
    </div>
  );
};
