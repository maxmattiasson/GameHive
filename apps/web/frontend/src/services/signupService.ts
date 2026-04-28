export const handleSignup = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
