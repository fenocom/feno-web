"use client";

import {
    type Connection,
    type Edge,
    type OnEdgesChange,
    type OnNodesChange,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    type Node,
    type NodeChange,
    type EdgeChange,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { MainMenu } from "../main-menu";
import { ResumeEditor } from "./resume-editor";

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

    const onNodesChange = useCallback(
        (changes: NodeChange<Node>[]) =>
            setNodes((nodesSnapshot) =>
                applyNodeChanges(changes, nodesSnapshot),
            ),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) =>
            setEdges((edgesSnapshot) =>
                applyEdgeChanges(changes, edgesSnapshot),
            ),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) =>
            setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
};
