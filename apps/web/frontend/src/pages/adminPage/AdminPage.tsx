import styles from "./AdminPage.module.css";

const AdminPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.heading}>ADMIN</h1>
        <p className={styles.subheading}>Find and delete them maggots!</p>
      </div>
      <input className={styles.input} placeholder="Find user" />
    </div>
  );
};

export default AdminPage;
