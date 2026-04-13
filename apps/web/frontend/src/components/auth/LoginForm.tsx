import { useState } from "react";

const [email, setEmail] = useState("");
const [pasword, setPassword] = useState("");
const [username, setUsername] = useState("");
const [isLoading, setIsLoading] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const loginForm = () => {
  return;
  <form>
    <div className="login">
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button type="submit">Login</button>
    </div>
    <div className="signup">
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <input type="password" placeholder="verify password" />
      <button type="submit">signup</button>
    </div>
  </form>;
};
export default loginForm;
