export type user = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type baseRespone = {
  message: string;
  error: string;
};

export interface registration extends baseRespone {
  user?: user | undefined;
}

export interface loginUser extends user {
  token: string;
}
export interface login extends baseRespone {
  user?: loginUser | null;
}
