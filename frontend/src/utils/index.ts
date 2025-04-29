import { Node } from "reactflow";
import { APITemplateType, NodeDataType } from "@/types/common";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...classes: Array<string>): string {
  return classes.filter(Boolean).join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function customStringify(obj: any): string {
  if (typeof obj === "undefined") {
    return "null";
  }

  if (obj === null || typeof obj !== "object") {
    if (obj instanceof Date) {
      return `"${obj.toISOString()}"`;
    }
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const arrayItems = obj.map((item) => customStringify(item)).join(",");
    return `[${arrayItems}]`;
  }

  const keys = Object.keys(obj).sort();
  const keyValuePairs = keys.map(
    (key) => `"${key}":${customStringify(obj[key])}`
  );
  return `{${keyValuePairs.join(",")}}`;
}
export function scapedJSONStringfy(json: object): string {
  return customStringify(json).replace(/"/g, "œ");
}

export function getFieldTitle(
  template: APITemplateType,
  templateField: string
): string {
  return template[templateField].display_name
    ? template[templateField].display_name!
    : template[templateField].name ?? templateField;
}

export const generateDefaultNode = ({
  id,
  ...params
}: Omit<Node, "data"> & Pick<NodeDataType, "id">): Node => {
  return {
    ...params,
    id,
    type: "genericNode",
    data: {
      id: id + "default",
      node: {
        base_classes: [],
        description: "Default component",
        display_name: "default",
        template: {
          default: {
            _input_type: "MessageText",
            display_name: "default",
            dynamic: false,
            info: "",
            list: false,
            load_from_db: false,
            name: "default",
            placeholder: "",
            required: false,
            show: true,
            title_case: false,
            tool_mode: true,
            trace_as_input: true,
            trace_as_metadata: true,
            // type: "default text node",
            text: "this is a default text node",
            value: "",
          },
        },
      },
    },
  };
};
