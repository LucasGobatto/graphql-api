export interface UserInput {
  name: string;
  password: string;
  email: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface LoginType {
  token: string;
  user?: UserType;
}
