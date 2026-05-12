export type User = {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin" | "dev";
    loginCount: number;
    userAchievements: string[];
  };