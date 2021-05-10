export interface UserInput {
  name: string;
  password: string;
  email: string;
  birthDate?: string;
  phone?: string;
  avatar?: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  birthDate?: string;
  phone?: string;
  avatar?: string;
}
