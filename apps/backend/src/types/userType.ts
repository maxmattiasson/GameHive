export type UserRole = "user" | "admin" | "dev";

export interface User {
  username: string;
  passwordHash: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
