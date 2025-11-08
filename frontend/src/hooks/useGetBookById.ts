import { getBookById } from "@/axios/bookApi";
import { useQuery } from "@tanstack/react-query";

export const useGetBookById = (id: string) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: async () => await getBookById(id),
        enabled: !!id,
        retry: 1
    })
};