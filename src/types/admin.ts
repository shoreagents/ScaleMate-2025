export interface AdminFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'moderator' | 'user' | 'developer' | 'author';
}

export interface UserEditFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  phone_number: string;
  location: string;
  profile_picture?: string | null;
}

export interface BaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  last_login?: string;
  profile_picture?: string;
}

export interface Admin extends BaseUser {
  role: 'admin';
  last_sign_in: string | null;
  phone_number: string;
  gender: string;
  username: string;
  roles: string[];
  status: 'active' | 'pending';
  location: string;
}

export interface UserRole extends BaseUser {
  role: 'user' | 'admin' | 'moderator' | 'developer' | 'author';
  last_sign_in: string | null;
  phone_number: string;
  gender: string;
  username: string;
  roles: string[];
  status: string;
  location: string;
}

export type UserToDelete = UserRole | Admin;
export type SortField = 'email' | 'name' | 'roles' | 'last_sign_in';
export type TabType = 'admins' | 'moderators' | 'users' | 'regular-users' | 'developers' | 'authors'; 