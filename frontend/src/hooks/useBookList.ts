import { getBooks, type Book } from "@/axios/bookApi"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useBookList = () =>{
    return useQuery<Book[], Error>({
        queryKey: ['books'],
        queryFn: async () => {
            try {
                return await getBooks()
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message || "Something went wrong")
                } else {
                    toast.error(String(error) || "Something went wrong")
                }
                throw error  
            } 
        },
    })
}