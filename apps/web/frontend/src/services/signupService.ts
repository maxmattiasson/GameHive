export async function signupUser(formData: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  let data = null;
  let errorText = "Signup failed";
  try {
    data = await response.json();
    if (data && data.message) errorText = data.message;
  } catch {
    // if anwser is not JSON, set null
  }

  if (!response.ok) {
    throw new Error(errorText);
  }

  return data;
}
