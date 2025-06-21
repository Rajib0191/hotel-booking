type UserRole = "ADMIN" | "USER" | "MODERATOR"; // etc.

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}
export interface UserResponse {
  status: number;
  message: string;
  user: User;
  timestamp: string;
}
