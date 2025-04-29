// pages/workflows/WorkflowEditor.jsx
import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import GenericNode from "../../components/GenericNode";
import useFlowStore from "@/stores/flowStore";
import { generateDefaultNode } from "@/utils";

const nodeTypes = {
  genericNode: GenericNode,
};

const WorkflowEditor = () => {
  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const edges = useFlowStore((state) => state.edges);
  const setEdges = useFlowStore((state) => state.setEdges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);

  const [selectedNode, setSelectedNode] = useState<any>(null);
  const reactFlowWrapper = React.useRef(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: any) => {
    event.preventDefault();

    const reactFlowBounds =
      reactFlowWrapper?.current?.getBoundingClientRect?.();
    // const type = event.dataTransfer.getData("application/reactflow");
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = generateDefaultNode({
      id: String(Date.now()),
      position,
    });
    setNodes((nds) => nds.concat(newNode));
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)]">
      <ReactFlowProvider>
        <div className="flex h-full">
          <div className="w-64 bg-white border-r p-4">
            <h3 className="text-lg font-medium mb-4">Tools</h3>
            <div className="space-y-2">
              {["Analysis", "Preprocessing", "Visualization"].map((tool) => (
                <div
                  key={tool}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData("application/reactflow", tool);
                  }}
                  className="p-2 bg-gray-50 rounded cursor-move hover:bg-gray-100"
                >
                  {tool}
                  <span>upload</span>
                  <input placeholder="name" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onDragOver={onDragOver}
              onDrop={onDrop}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>

          {/* {selectedNode && (
            <div className="w-64 bg-white border-l p-4">
              <h3 className="text-lg font-medium mb-4">Properties</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Node Name?
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedNode.data.label}
                    onChange={(evt) => {
                      console.log(" evt.target.value", evt.target.value);
                      const newNode = {
                        ...selectedNode,
                        data: { ...selectedNode.data, label: evt.target.value },
                      };

                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id ? newNode : node
                        )
                      );
                      setSelectedNode(newNode);
                    }}
                  />
                </div>
              </div>
            </div>
          )} */}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowEditor;
