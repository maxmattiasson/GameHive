import { useState, type ChangeEvent } from "react";
import { signupUser } from "../services/signupService";
import { validateSignup } from "../helpers/validators";

export function useSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const signup = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("passwords do not match");
      setLoading(false);
      return;
    }

    const validationResult = validateSignup({ username, email, password });
    console.log("[signup] validationResult:", validationResult);
    if (validationResult !== true) {
      setError(validationResult);
      setLoading(false);
      return;
    }

    // API
    try {
      const data = await signupUser({ username, email, password });

      setSuccess(data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    username,
    setUsername,
    error,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    signup,
    success,
    loading
  };
}
