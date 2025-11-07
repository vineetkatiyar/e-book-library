import {login, type LoginPayload, type LoginResponse } from "@/axios/authApi"
import { useAuthStore } from "@/store/authStore"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useLogin = () =>{
    const navigate = useNavigate()
    const setToken = useAuthStore(state => state.setToken)
    const setUser = useAuthStore(state => state.setUser)
    const setLoading = useAuthStore(state => state.setLoading)

    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn : async (data) => {
            try {
                const response = await login(data);
                return response;
              } finally {
                setLoading(false);
              }
        },
        onSuccess : (data) => {
            setToken(data.token)
            setUser(data.user)
            setLoading(false)
            toast.success(`Welcome back, ${data.user.name}`)
            navigate("/")
        },
        onError : (error) => {
            setLoading(false)
            toast.error(error?.message || "Something went wrong")
        }

    })
   
}