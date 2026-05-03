import { getComments } from "@/apis/CommentAPIs"
import { useQuery } from "@tanstack/react-query"

export const useGetComments =()=>{

    return useQuery({
        queryKey:["comments"],
        queryFn:getComments
    })

}