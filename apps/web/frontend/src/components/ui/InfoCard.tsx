import styles from "./InfoCard.module.css";

type Props = {
  children: React.ReactNode;
};

export function InfoCard({ children }: Props) {
  return <div className={styles.infoCard}>{children}</div>;
}
