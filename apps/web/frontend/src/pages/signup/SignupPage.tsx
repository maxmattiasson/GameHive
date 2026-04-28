import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export function SignupPage() {
  const {
    username,
    email,
    password,
    confirmPassword,
    error,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    signup,
    success
  } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hallå?");
    await signup();
  };

  return (
    <section>
      <h1>Sign up</h1>
      <p>Join the GameHive Community</p>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="username"
        />
        <input
          type="text"
          value={email}
          onChange={onChangeEmail}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="password"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          placeholder="re-enter password"
        />

        <button type="submit">SingUp</button>
      </form>
      <Link to="/">Back to home</Link>
    </section>
  );
}
