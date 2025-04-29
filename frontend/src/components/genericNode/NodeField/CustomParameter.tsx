import { cn } from "@/utils";

export function getCustomParameterTitle({
  title,
  isFlexView = false,
}: {
  title: string;
  nodeId: string;
  isFlexView?: boolean;
}) {
  return (
    <div className={cn(isFlexView && "max-w-56 truncate")}>
      <span
        data-testid={`title-${title.toLocaleLowerCase()}`}
        className="text-[13px]"
      >
        {title}
      </span>
    </div>
  );
}
