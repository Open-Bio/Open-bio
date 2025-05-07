import { memo, useCallback } from "react";

import { classNames, cn } from "@/utils";
import { NodeDataType } from "@/types/common";
import RenderParameters from "./RenderParameters";
import { Handle, Position } from "reactflow";
import CustomHandle from "./NodeField/CustomHandle";

const MemoizedRenderParameters = memo(RenderParameters);

function GenericNode({
  data,
  selected,
}: {
  data: NodeDataType;
  selected?: boolean;
  xPos?: number;
  yPos?: number;
}): JSX.Element {
  const {
    node: { icon, description },
  } = data;

  const renderParameters = useCallback(() => {
    return <MemoizedRenderParameters data={data} />;
  }, [data]);

  return (
    <div className={cn("relative -mt-10 z-0")}>
      <CustomHandle left id={data.id} />
      <CustomHandle id={data.id} />
      <div
        className={cn(
          "w-80",
          "relative rounded-xl shadow-sm hover:shadow-md bg-white",
          "pb-4"
        )}
      >
        <div
          data-testid={`${data.id}-main-node`}
          className={cn("grid gap-3 truncate text-wrap  leading-5")}
        >
          <div
            data-testid={"div-generic-node"}
            className={" justify-between rounded-t-lg p-4"}
          >
            <div>
              {icon}
              <div className="">{description}</div>
            </div>
          </div>
        </div>
        <div className="border-t">{renderParameters()}</div>
      </div>
    </div>
  );
}

export default memo(GenericNode);
