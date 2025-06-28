import { UserRole } from "./user";

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  isAccessible: UserRole[];
}
