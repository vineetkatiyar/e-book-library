import axiosApi from "./axiosApi";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
    accessToken: string;
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
    accessToken: string;
  user: User;
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosApi.post<LoginResponse>("/users/signin", data);
  return response.data; // No localStorage here
};

export const register = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await axiosApi.post<RegisterResponse>(
    "/users/register",
    data
  );
  return response.data;
};
