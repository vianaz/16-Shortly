export interface ISignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ISignIn {
  email: string;
  password: string;
}
export interface IUrls {
  id?: number;
  url?: string;
  shortUrl?: string;
}
export interface IConfigDB {
  connectionString: string;
  ssl?: {
    rejectUnauthorized: boolean;
  };
}
