// pages/workflows/WorkflowEditor.jsx
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Dataset' },
    position: { x: 250, y: 25 }
  }
];

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = React.useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      };
      const newNode = {
        id: String(Date.now()),
        type: 'default',
        position,
        data: { label: `${type} node` }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    []
  );

  return (
    <div className="h-[calc(100vh-12rem)]">
      <ReactFlowProvider>
      <div className="flex h-full">
        <div className="w-64 bg-white border-r p-4">
          <h3 className="text-lg font-medium mb-4">Tools</h3>
          <div className="space-y-2">
            {['Analysis', 'Preprocessing', 'Visualization'].map((tool) => (
              <div
                key={tool}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('application/reactflow', tool);
                }}
                className="p-2 bg-gray-50 rounded cursor-move hover:bg-gray-100"
              >
                {tool}
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
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {selectedNode && (
          <div className="w-64 bg-white border-l p-4">
            <h3 className="text-lg font-medium mb-4">Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Node Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedNode.data.label}
                  onChange={(evt) =>
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, label: evt.target.value } }
                          : node
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowEditor;