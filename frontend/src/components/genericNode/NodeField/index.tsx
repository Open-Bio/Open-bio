import { cn } from "@/utils";
import { useEffect, useRef } from "react";

import { getCustomParameterTitle } from "./CustomParameter";
import { ParameterRenderComponent } from "@/components/ParameterRenderComponent";
import { NodeDataType, TargetHandleType } from "@/types/common";

export type NodeFieldComponentTypeProps = {
  id: TargetHandleType;
  data: NodeDataType;
  title: string;
  type: string | undefined;
  name: string;
  required: boolean;
  lastInput?: boolean;
  info: string;
  proxy: { field: string; id: string } | undefined;
};

export default function NodeField({
  data,
  title,
  name = "",
  required = false,
  lastInput = false,
}: NodeFieldComponentTypeProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-10 w-full flex-wrap items-center justify-between  py-2",
        lastInput ? "rounded-b-[0.69rem] pb-5" : ""
      )}
    >
      <div className={cn("flex w-full flex-col gap-2", "flex-col")}>
        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex w-full items-center truncate">
            <div className="flex gap-2">
              <span>
                {
                  <span className="text-sm font-medium">
                    {getCustomParameterTitle({
                      title,
                      nodeId: data.id,
                    })}
                  </span>
                }
              </span>
            </div>
            <span className={"text-red-400"}>{required ? "*" : ""}</span>
          </div>
        </div>

        {data.node?.template[name] !== undefined && (
          <ParameterRenderComponent
            name={name}
            nodeId={data.id}
            templateData={data.node?.template[name]!}
            placeholder={data.node?.template[name].placeholder}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
}
