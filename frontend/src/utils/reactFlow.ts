import { Edge } from "reactflow";
import { cloneDeep } from "lodash-es";

import { GenericNodeType } from "@/types/common";

export function cleanEdges(nodes: GenericNodeType[], edges: Edge[]) {
  let newEdges = cloneDeep(edges);
  edges.forEach((edge) => {
    // 检查边的源节点和目标节点是否存在
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);
    if (!sourceNode || !targetNode) {
      newEdges = newEdges.filter((edg) => edg.id !== edge.id);
      return;
    }
  });
  return newEdges;
}
