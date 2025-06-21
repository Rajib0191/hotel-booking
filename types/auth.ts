// types/auth.ts
export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  token: string;
  role: string;
  isActive: boolean;
  expirationTime: string;
  timestamp: string;
}

export interface ErrorResponse {
  message?: string;
}

export interface SuccessResponse {
  message?: string;
}
