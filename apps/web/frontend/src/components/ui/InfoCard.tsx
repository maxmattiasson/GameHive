import "./InfoCard.css";

type Props = {
  children: React.ReactNode;
};

export function InfoCard({ children }: Props) {
  return <div className="info-card">{children}</div>;
}
