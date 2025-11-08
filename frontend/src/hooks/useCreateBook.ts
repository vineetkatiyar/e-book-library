import { createBook } from "@/axios/bookApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      toast.success("Book created successfully!");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/"); 
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while creating the book.";
      toast.error(message);
      console.error("Create book error:", error);
    },
  });
};
