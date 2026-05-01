export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
}
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
}

export function validateSignup({
  username,
  email,
  password
}: {
  username: string;
  email: string;
  password: string;
}): true | string {
  if (!username || !email || !password) {
    return "All fields are required";
  }
  if (!isValidEmail(email)) {
    return "The email address contains invalid characters.";
  }
  if (!isValidUsername(username)) {
    return "The username has to be between 3 - 30 characters and can only contain letters, numbers and underscore.";
  }
  if (!isValidPassword(password)) {
    return "Password has to be at least 6 characters and only contain letters and numbers";
  }
  return true;
}
