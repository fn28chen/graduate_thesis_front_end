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
  DisplayName: string;
  id: string;
}

export interface IListMeDataType {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: string;
  url: string;
  owner: IOwner;
}

export interface ISvgIcon {
  width?: number;
  height?: number;
  fillColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
