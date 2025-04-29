import {
  Connection,
  Edge,
  OnEdgesChange,
  ReactFlowInstance,
  Viewport,
} from "reactflow";
import { FlowState, FlowType, GenericNodeType, OnNodesChange } from "../common";

export type FlowStoreType = {
  autoSaveFlow: (() => void) | undefined;
  isBuilding: boolean;
  isPending: boolean;
  setIsBuilding: (isBuilding: boolean) => void;
  setPending: (isPending: boolean) => void;
  // resetFlow: (flow: FlowType | undefined) => void;
  // reactFlowInstance: ReactFlowInstance<GenericNodeType, Edge> | null;
  // setReactFlowInstance: (
  //   newState: ReactFlowInstance<GenericNodeType, Edge>
  // ) => void;
  flowState: FlowState | undefined;
  // setFlowState: (
  //   state:
  //     | FlowState
  //     | undefined
  //     | ((oldState: FlowState | undefined) => FlowState),
  // ) => void;
  nodes: GenericNodeType[];
  edges: Edge[];
  onNodesChange: OnNodesChange<GenericNodeType>;
  onEdgesChange: OnEdgesChange;
  setNodes: (
    update:
      | GenericNodeType[]
      | ((oldState: GenericNodeType[]) => GenericNodeType[])
  ) => void;
  setEdges: (update: Edge[] | ((oldState: Edge[]) => Edge[])) => void;
  setNode: (
    id: string,
    update: GenericNodeType | ((oldState: GenericNodeType) => GenericNodeType),
    isUserChange?: boolean,
    callback?: () => void
  ) => void;
  getNode: (id: string) => GenericNodeType | undefined;
  deleteNode: (nodeId: string | Array<string>) => void;
  deleteEdge: (edgeId: string | Array<string>) => void;
  // paste: (
  //   selection: { nodes: any; edges: any },
  //   position: { x: number; y: number; paneX?: number; paneY?: number },
  // ) => void;
  // lastCopiedSelection: { nodes: any; edges: any } | null;
  // setLastCopiedSelection: (
  //   newSelection: { nodes: any; edges: any } | null,
  //   isCrop?: boolean,
  // ) => void;
  // cleanFlow: () => void;
  // setFilterEdge: (newState) => void;
  // getFilterEdge: any[];
  // onConnect: (connection: Connection) => void;
  // unselectAll: () => void;
  // buildFlow: ({
  //   startNodeId,
  //   stopNodeId,
  //   input_value,
  //   files,
  //   silent,
  //   setLockChat,
  //   session,
  // }: {
  //   setLockChat?: (lock: boolean) => void;
  //   startNodeId?: string;
  //   stopNodeId?: string;
  //   input_value?: string;
  //   files?: string[];
  //   silent?: boolean;
  //   session?: string;
  // }) => Promise<void>;
  // getFlow: () => { nodes: Node[]; edges: Edge[]; viewport: Viewport };

  // getNodePosition: (nodeId: string) => { x: number; y: number };
  // setLockChat: (lock: boolean) => void;
  // lockChat: boolean;
  // updateFreezeStatus: (nodeIds: string[], freeze: boolean) => void;
  currentFlow: FlowType | undefined;
  setCurrentFlow: (flow: FlowType | undefined) => void;
  updateCurrentFlow: ({
    nodes,
    edges,
    viewport,
  }: {
    nodes?: GenericNodeType[];
    edges?: Edge[];
    viewport?: Viewport;
  }) => void;
  // handleDragging:
  //   | {
  //       source: string | undefined;
  //       sourceHandle: string | undefined;
  //       target: string | undefined;
  //       targetHandle: string | undefined;
  //       type: string;
  //       color: string;
  //     }
  //   | undefined;
  // setHandleDragging: (
  //   data:
  //     | {
  //         source: string | undefined;
  //         sourceHandle: string | undefined;
  //         target: string | undefined;
  //         targetHandle: string | undefined;
  //         type: string;
  //         color: string;
  //       }
  //     | undefined,
  // ) => void;

  // stopBuilding: () => void;
  // buildController: AbortController;
  // setBuildController: (controller: AbortController) => void;
  // currentBuildingNodeId: string[] | undefined;
  // setCurrentBuildingNodeId: (nodeIds: string[] | undefined) => void;
  // clearEdgesRunningByNodes: () => Promise<void>;
};
