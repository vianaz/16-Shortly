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
  url?: string;
  shortUrl?: string;
}
