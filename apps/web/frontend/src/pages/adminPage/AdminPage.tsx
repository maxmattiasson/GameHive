import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UsersSearchField from "../../components/ui/UsersSearchField";
import styles from "./AdminPage.module.css";
import { useEffect } from "react";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [loading, user, navigate]);

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.heading}>ADMIN</h1>
        <p className={styles.subheading}>Find and delete them maggots!</p>
      </div>
      <UsersSearchField />
    </div>
  );
};

export default AdminPage;
