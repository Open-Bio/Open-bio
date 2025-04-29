import { useMemo } from "react";
import NodeField from "../NodeField";
import { getFieldTitle, scapedJSONStringfy } from "@/utils";
import { NodeDataType } from "@/types/common";

const RenderParameters = ({ data }: { data: NodeDataType }) => {
  /** 获取data.node?.template keys */
  const templateFields = useMemo(() => {
    return Object.keys(data.node?.template || {}).filter(
      (templateField) => templateField.charAt(0) !== "_"
    );
  }, [data.node?.template]);

  /** 把data.node?.template中的对象放入Map中 */
  const memoizedKeys = useMemo(() => {
    const keyMap = new Map();

    templateFields.forEach((templateField) => {
      const template = data.node?.template[templateField];
      if (template) {
        keyMap.set(
          templateField,
          scapedJSONStringfy({
            type: template.type,
            id: data.id,
            fieldName: templateField,
            proxy: template.proxy,
          })
        );
      }
    });

    return keyMap;
  }, [templateFields, data.id, data.node?.template]);

  /** 渲染data.node?.template每一个对象对应的组件 */
  const renderInputParameter = templateFields.map(
    (templateField: string, idx) => {
      const template = data.node?.template[templateField];

      if (!template?.show) {
        return null;
      }

      const memoizedKey = memoizedKeys.get(templateField);

      return (
        <NodeField
          // lastInput={!(shownOutputs.length > 0 || showHiddenOutputs)}
          key={memoizedKey}
          data={data}
          title={getFieldTitle(data.node?.template!, templateField)}
          info={template.info!}
          name={templateField}
          required={template.required}
          id={{
            type: template.type,
            id: data.id,
            fieldName: templateField,
          }}
          type={template.type}
          proxy={template.proxy}
        />
      );
    }
  );

  return <>{renderInputParameter}</>;
};

export default RenderParameters;
