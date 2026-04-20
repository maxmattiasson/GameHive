import { useState } from "react";
import type { ChangeEvent } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await fetch("http://localhost:3000/api/auth/login", {
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
    const me = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include"
      });
      if (!me.ok) {
        setErrorMessage("Session failed, cookie not set");
        return;
      }
      const checkedUser = await me.json();
      console.log("Logged in user:", checkedUser);
      setUser(checkedUser)

    } catch {
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
          Logga in
        </Button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};
export default LoginForm;
