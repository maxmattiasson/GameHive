import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © {new Date().getFullYear()} GameHive |{" "}
        <span className={styles.devLink}>Sign up as a developer</span>
      </p>
    </footer>
  );
}
