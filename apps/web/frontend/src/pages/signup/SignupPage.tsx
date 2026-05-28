import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import Button from "../../components/ui/Button";
import styles from "./SignupPage.module.css";

export function SignupPage() {
  const {
    username,
    email,
    password,
    confirmPassword,
    success,
    error,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    signup,
    loading,
  } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup();
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Sign up</h1>
      <p className={styles.subheading}>Join the GameHive Community</p>

      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <input
          className={styles.input}
          type="text"
          value={username}
          name="signup_user_field"
          onChange={onChangeUsername}
          placeholder="Username"
          autoComplete="off"
        />
        <input
          className={styles.input}
          type="email"
          value={email}
          name="signup_email_field"
          onChange={onChangeEmail}
          placeholder="Email"
          autoComplete="off"
        />
        <input
          className={styles.input}
          type="password"
          name="signup_password_field"
          value={password}
          autoComplete="new-password"
          onChange={onChangePassword}
          placeholder="Password"
        />
        <input
          className={styles.input}
          type="password"
          name="signup_confirm_field"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={onChangeConfirmPassword}
          placeholder="Re-enter password"
        />
        <Button color="primary" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <Link to="/" className={styles.backLink}>
        Back to home
      </Link>
    </section>
  );
}
