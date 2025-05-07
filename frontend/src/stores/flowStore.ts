import {
  GenericNodeType,
  NodeChangeType,
  NodeDataType,
  OnNodesChange,
} from "@/types/common";
import { FlowStoreType } from "@/types/stores/flowStore";
import { cleanEdges } from "@/utils/reactFlow";
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge } from "reactflow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialNodes: GenericNodeType[] = [
  {
    data: {
      id: "Prompt-TbFnC",
      node: {
        base_classes: [],
        description: "Create a prompt template with dynamic variables.",
        display_name: "Prompt",
        template: {
          input: {
            _input_type: "PromptInput",
            advanced: false,
            display_name: "Template",
            dynamic: false,
            info: "",
            list: false,
            load_from_db: false,
            name: "template",
            placeholder: "Please Input",
            required: true,
            show: true,
            title_case: false,
            tool_mode: false,
            trace_as_input: true,
            type: "input",
            value: "",
          },
          file: {
            _input_type: "PromptUpload",
            advanced: false,
            display_name: "Upload",
            dynamic: false,
            info: "",
            list: false,
            load_from_db: false,
            name: "Upload",
            placeholder: "",
            required: true,
            show: true,
            title_case: false,
            tool_mode: false,
            trace_as_input: true,
            type: "upload",
            value: "",
          },
        },
      },
      type: "Prompt",
    },
    dragging: false,
    height: 260,
    id: "Prompt-TbFnC",
    position: { x: 250, y: 45 },
    selected: false,
    type: "genericNode",
    width: 320,
  },
];

const useFlowStore = create(
  devtools<FlowStoreType>((set, get) => ({
    flowState: undefined,
    currentFlow: undefined,
    autoSaveFlow: undefined,
    isBuilding: false,
    isPending: false,
    setIsBuilding: (isBuilding) => {
      set({ isBuilding });
    },
    setPending: (isPending) => {
      set({ isPending });
    },
    nodes: initialNodes,
    edges: [],
    setNodes: (change) => {
      let newChange =
        typeof change === "function" ? change(get().nodes) : change;
      let newEdges = cleanEdges(newChange, get().edges);
      // get().updateComponentsToUpdate(newChange);
      set({
        edges: newEdges,
        nodes: newChange,
      });
      get().updateCurrentFlow({ nodes: newChange, edges: newEdges });
      if (get().autoSaveFlow) {
        get().autoSaveFlow!();
      }
    },
    setEdges: (change) => {
      let newChange =
        typeof change === "function" ? change(get().edges) : change;
      set({
        edges: newChange,
        flowState: undefined,
      });
      get().updateCurrentFlow({ edges: newChange });
      if (get().autoSaveFlow) {
        get().autoSaveFlow!();
      }
    },
    setNode: (
      id: string,
      change:
        | GenericNodeType
        | ((oldState: GenericNodeType) => GenericNodeType),
      isUserChange: boolean = true,
      callback?: () => void
    ) => {
      let newChange =
        typeof change === "function"
          ? change(get().nodes.find((node) => node.id === id)!)
          : change;

      const newNodes = get().nodes.map((node) => {
        if (node.id === id) {
          if (isUserChange) {
            if ((node.data as NodeDataType).node?.frozen) {
              (newChange.data as NodeDataType).node!.frozen = false;
            }
          }
          return newChange;
        }
        return node;
      });

      const newEdges = cleanEdges(newNodes, get().edges);

      set((state) => {
        if (callback) {
          // Defer the callback execution to ensure it runs after state updates are fully applied.
          queueMicrotask(callback);
        }
        return {
          ...state,
          nodes: newNodes,
          edges: newEdges,
        };
      });
      get().updateCurrentFlow({ nodes: newNodes, edges: newEdges });
      if (get().autoSaveFlow) {
        get().autoSaveFlow!();
      }
    },
    getNode: (id: string) => {
      return get().nodes.find((node) => node.id === id);
    },
    deleteNode: (nodeId) => {
      const { filteredNodes, deletedNode } = get().nodes.reduce<{
        filteredNodes: GenericNodeType[];
        deletedNode: GenericNodeType | null;
      }>(
        (acc, node) => {
          const isMatch =
            typeof nodeId === "string"
              ? node.id === nodeId
              : nodeId.includes(node.id);

          if (isMatch) {
            acc.deletedNode = node;
          } else {
            acc.filteredNodes.push(node);
          }

          return acc;
        },
        { filteredNodes: [], deletedNode: null }
      );

      get().setNodes(filteredNodes);

      if (deletedNode) {
      }
    },
    deleteEdge: (edgeId) => {
      get().setEdges(
        get().edges.filter((edge) =>
          typeof edgeId === "string"
            ? edge.id !== edgeId
            : !edgeId.includes(edge.id)
        )
      );
    },
    onNodesChange: (changes: NodeChangeType<GenericNodeType>[]) => {
      set({
        nodes: applyNodeChanges<NodeDataType>(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      let newEdges: Edge[] = [];
      get().setEdges((oldEdges) => {
        newEdges = addEdge(connection, oldEdges);

        return newEdges;
      });
    },
    setCurrentFlow: (flow) => {
      set({ currentFlow: flow });
    },
    updateCurrentFlow: ({ nodes, edges }) => {
      set({
        currentFlow: {
          ...get().currentFlow!,
          data: {
            nodes: nodes ?? get().currentFlow?.data?.nodes ?? [],
            edges: edges ?? get().currentFlow?.data?.edges ?? [],
            viewport: get().currentFlow?.data?.viewport ?? {
              x: 0,
              y: 0,
              zoom: 1,
            },
          },
        },
      });
    },
  }))
);

export default useFlowStore;
