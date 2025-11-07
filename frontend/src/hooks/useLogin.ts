import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { login, type LoginPayload, type LoginResponse } from "@/axios/authApi";

export const useLogin = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (data) => {
      setLoading(true);
      const res = await login(data);
      return res;
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      setUser(data.user);
      setLoading(false);

      toast.success(`Welcome back, ${data.user.name}`);
      navigate("/");
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error?.message || "Invalid email or password");
    },
  });
};
