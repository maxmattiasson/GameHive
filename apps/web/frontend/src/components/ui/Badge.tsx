import "./Badge.css";

interface Props {
  label: string;
}

export function Badge({ label }: Props) {
  return <span className="badge">{label}</span>;
}
