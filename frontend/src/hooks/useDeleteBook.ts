import { deleteBook } from "@/axios/bookApi";
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteBook = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : async (id: string) => {
            return await deleteBook(id);
        },
        onSuccess : () => {
            toast.success("Book deleted successfully");
            queryClient.invalidateQueries({queryKey: ["books"]});
        },
        onError : (error) => {
            toast.error(error?.message || "Something went wrong");
        }
    })
}