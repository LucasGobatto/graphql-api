export interface CreateUserInput {
  name: string;
  password: string;
  email: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInput {
  id: string;
}

export interface UsersInput {
  offset?: number;
  limit?: number;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface UsersType {
  users: UserType[];
  count: number;
  hasNextPage: boolean;
  hasPreviusPage: boolean;
}

export interface LoginType {
  token: string;
  user?: UserType;
}

export interface Context {
  token: string;
}
