import { updateBook } from "@/axios/bookApi";
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUpdateBook = () =>{
    const queryClient = useQueryClient();
    const nevigate = useNavigate();


    return useMutation({
        mutationFn : async({id, data} : {id: string , data: FormData}) => 
            await updateBook(id, data),

        onSuccess : (updateBook) => {
            toast.success("Book updated successfully");
            queryClient.invalidateQueries({queryKey: ["books"]});
            queryClient.invalidateQueries({queryKey: ["book", updateBook._id]});
            
            nevigate("/");

        },

        onError : (error) => {
            toast.error(error?.message || "Something went wrong");
            console.log("Update book error:", error);
        }
    })
}