import {
  ReactFlowJsonObject,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  NodeDimensionChange,
  NodePositionChange,
  NodeSelectionChange,
  NodeRemoveChange,
  NodeAddChange,
  NodeResetChange,
} from "reactflow";

export type InputFieldType = {
  type: string;
  required: boolean;
  placeholder?: string;
  list: boolean;
  show: boolean;
  readonly?: boolean;
  password?: boolean;
  multiline?: boolean;
  value?: any;
  dynamic?: boolean;
  proxy?: { id: string; field: string };
  display_name?: string;
  name?: string;
  real_time_refresh?: boolean;
  refresh_button?: boolean;
  refresh_button_text?: string;
  combobox?: boolean;
  info?: string;
  [key: string]: any;
  icon?: string;
  text?: string;
};

export type APITemplateType = {
  [key: string]: InputFieldType;
};

export type APIClassType = {
  base_classes?: Array<string>;
  description: string;
  template: APITemplateType;
  display_name: string;
  icon?: string;
  edited?: boolean;
};

export type NodeDataType = {
  type: string;
  node: APIClassType;
  id: string;
};

// right side
export type SourceHandleType = {
  baseClasses?: string[];
  dataType: string;
  id: string;
  conditionalPath?: string | null;
  name: string;
};
//left side
export type TargetHandleType = {
  type: string;
  fieldName: string;
  id: string;
  proxy?: { field: string; id: string };
};

export type EdgeDataType = {
  sourceHandle: SourceHandleType;
  targetHandle: TargetHandleType;
};

export type GenericNodeType = Node<NodeDataType>;

export type FlowStyleType = {
  emoji: string;
  color: string;
  flow_id: string;
};

export type FlowType = {
  name: string;
  id: string;
  data: ReactFlowJsonObject<NodeDataType, Edge> | null;
  description: string;
  endpoint_name?: string | null;
  style?: FlowStyleType;
  is_component?: boolean;
  last_tested_version?: string;
  updated_at?: string;
  date_created?: string;
  parent?: string;
  folder?: string;
  user_id?: string;
  icon?: string;
  gradient?: string;
  tags?: string[];
  icon_bg_color?: string;
  folder_id?: string;
  webhook?: boolean;
  locked?: boolean | null;
};

export type FlowState = {
  template?: string;
  memory_keys?: Array<string>;
  handle_keys?: Array<string>;
};

export type NodeChangeType<T extends Node = Node> =
  | NodeDimensionChange
  | NodePositionChange
  | NodeSelectionChange
  | NodeRemoveChange
  | NodeAddChange<T>
  | NodeResetChange<T>;

export type OnNodesChange<T extends Node = Node> = (
  changes: NodeChangeType<T>[]
) => void;
export type OnEdgesChange<EdgeType extends Edge = Edge> = (
  changes: EdgeType[]
) => void;
