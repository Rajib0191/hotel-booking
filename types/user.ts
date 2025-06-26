type UserRole = "ADMIN" | "USER" | "MODERATOR"; // etc.

export type Profile = {
  id: number;
  address?: string;
  city?: string;
  country?: string;
  occupation?: string;
  gender?: string;
  profilePictureUrl?: string;
};

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  profile: Profile;
  isActive: boolean;
  createdAt: string;
}
export interface UserResponse {
  status: number;
  message: string;
  user: User;
  timestamp: string;
}
