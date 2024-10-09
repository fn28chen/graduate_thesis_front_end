export interface IFormUserSignUp {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface IFormUserLogin {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface IUserSignUp {
  username: string;
  password: string;
  email: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export type DefaultParams = {
  page?: number;
  limit?: number;
  filter?: string;
  q?: string;
  sort?: string;
  searchFields?: Array<string>;
};

export interface IOwner {
  displayName: string;
  id: string;
};

export interface IList {
  name: string;
  lastModified: string;
  size: number;
  storageClass: string;
  owner: IOwner;
};
