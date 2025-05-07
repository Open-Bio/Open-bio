import { GenericNodeType, TargetHandleType } from "@/types/common";
import { cn, scapedJSONStringfy } from "@/utils";
import React, { useCallback, useMemo } from "react";
import { Edge, Handle, Position } from "reactflow";

function CustomHandle({
  id,
  left,
}: {
  left?: boolean;
  id: TargetHandleType | string;
}) {
  const handleId = useMemo(
    () => (typeof id === "string" ? id : scapedJSONStringfy(id)),
    [id]
  );

  return (
    <Handle
      type={left ? "target" : "source"}
      position={left ? Position.Left : Position.Right}
      id={handleId}
      className="bg-slate-500 z-10"
    />
  );
}

export default CustomHandle;
