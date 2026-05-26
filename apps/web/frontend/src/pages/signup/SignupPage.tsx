import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import Button from "../../components/ui/Button";

export function SignupPage() {
  const navigate = useNavigate();
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
    loading
  } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup();
    navigate("/");
  };

  return (
    <section>
      <h1>Sign up</h1>
      <p>Join the GameHive Community</p>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          value={username}
          name="signup_user_field"
          onChange={onChangeUsername}
          placeholder="Username"
          autoComplete="off"
        />
        <input
          type="email"
          value={email}
          name="signup_email_field"
          onChange={onChangeEmail}
          placeholder="Email"
          autoComplete="off"
        />

        <input
          type="password"
          name="signup_password_field"
          value={password}
          autoComplete="new-password"
          onChange={onChangePassword}
          placeholder="Password"
        />

        <input
          type="password"
          name="signup_confirm_field"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={onChangeConfirmPassword}
          placeholder="Re-enter password"
        />

        <Button color="primary" type="submit" disabled={loading}>
          {" "}
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
      <Link to="/">Back to home</Link>
    </section>
  );
}
