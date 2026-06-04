import { getNotifications } from "@/apis/notificatinAPIs"
import { useQuery } from "@tanstack/react-query"

export const useGetNotifications=()=>{
    return useQuery({
        queryKey:["notifications"],
        queryFn:getNotifications,
        staleTime:60*1000,

        select: (data) => data.data
    })
}