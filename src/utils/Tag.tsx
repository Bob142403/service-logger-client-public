import { Tag as TagAnt } from "antd";

export function Tag(props: { type: string }) {
  let color = "default";
  if (props.type === "ERROR") color = "error";
  if (props.type === "WARN") color = "warning";
  return <TagAnt color={color}>{props.type}</TagAnt>;
}
