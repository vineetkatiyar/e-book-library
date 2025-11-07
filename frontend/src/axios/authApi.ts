import axiosApi from "./axiosApi";

export interface LoginPayload{
    email: string,
    password: string
}

export interface LoginResponse{
    token: string,
    user: {
        id: number,
        name: string,
        email: string
    }
}

export const login = async (data : LoginPayload) : Promise<LoginResponse | undefined> => {
   const response = await axiosApi.post<LoginResponse>('/users/signin', data);
   return response.data
}