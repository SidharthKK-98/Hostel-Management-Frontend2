import { getRent } from "@/apis/rentAPIs"
import { useQuery } from "@tanstack/react-query"

export const useGetRent =()=>{

    return useQuery({
        queryKey:["rent"],
        queryFn:getRent
        
    })

}