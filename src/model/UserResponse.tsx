export interface UserResponse {
  uid?: number
  name?: string
  username: string;
  password: string;
  avatar?: File | null;
  role?:string
}
