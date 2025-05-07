// import { InputProps } from "./types";
import { InputFieldType } from "@/types/common";
import { Button, Input, InputProps } from "@mui/joy";
import UploadButton from "./components/UploadButton";

export function ParameterRenderComponent({
  templateData,
  ...props
}: {
  name: string;
  nodeId: string;
  templateData: Partial<InputFieldType>;
  isToolMode?: boolean;
} & InputProps) {
  const id = (templateData.type + "_" + templateData.name).toLowerCase();

  const renderComponent = (): React.ReactElement<InputProps> => {
    switch (templateData.type) {
      case "input":
        return <Input {...props} id={`int_${id}`} />;
      case "upload":
        return <UploadButton />;
      default:
        return (
          <p className="text-gray-500">
            {props.value || templateData.text || ""}
          </p>
        );
    }
  };

  return renderComponent();
}
