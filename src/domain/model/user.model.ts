export interface CreateUserInputModel {
  name: string;
  password: string;
  email: string;
  phone?: string;
}

export interface LoginInputModel {
  email: string;
  password: string;
}

export interface UserInputModel {
  id: string;
}

export interface UsersInputModel {
  offset?: number;
  limit?: number;
}

export interface UserTypeModel {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface UsersTypeModel {
  users: UserTypeModel[];
  count: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LoginTypeModel {
  token: string;
  user: UserTypeModel;
}

export interface ServerContext {
  token: string;
}
