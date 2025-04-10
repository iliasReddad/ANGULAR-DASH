export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  jobTitle?: string;
  about?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  AGENT = 'Agent',
  CUSTOMER = 'Customer'
}

export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  about: string;
  avatarUrl?: string;
}
