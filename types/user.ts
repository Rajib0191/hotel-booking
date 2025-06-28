export type UserRole = "ADMIN" | "CUSTOMER" | "MODERATOR";

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

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  isAdmin: boolean;
};

export interface GetAllUsersResponse {
  status: number;
  message: string;
  users: User[];
  timestamp: string;
}
