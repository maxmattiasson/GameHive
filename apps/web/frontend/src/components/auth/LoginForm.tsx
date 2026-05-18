import { useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { API_BASE_URL } from "../../config/api";

const API_URL = `${API_BASE_URL}/auth`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Fyll i email och lösenord");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Inloggning misslyckades");
        return;
      }
      const me = await fetch(`${API_URL}/me`, {
        credentials: "include"
      });
      if (!me.ok) {
        setErrorMessage("Session failed, cookie not set");
        return;
      }
      const checkedUser = await me.json();
      setUser(checkedUser);
      console.log("Logged in user:", checkedUser);

      const unlocked = data.user.newUnlocks || null;
      if (unlocked[0]) {
        alert(
          `Achievement unlocked: ${unlocked.length} new achievement(s) unlocked!`
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Kunde inte ansluta till servern");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button color="primary" disabled={isLoading} type="submit">
          Login
        </Button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};
export default LoginForm;
