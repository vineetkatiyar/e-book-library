import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validator/authSchema";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useRegister } from "@/hooks/useRegister";
import { toast } from "sonner";

// import { useAuthStore } from '@/store/auth-store';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: doRegister, isPending } = useRegister();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Registration successful:", data);

      doRegister(data, {
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
          setError("root", {
            message: error.message || "Registration failed",
          });
        },
      });
    } catch (error: any) {
      setError("root", {
        message: error.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 book-text">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Root Error */}
        {errors.root && (
          <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.root.message}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          {isPending ? <Spinner /> : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-black underline dark:text-white"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
