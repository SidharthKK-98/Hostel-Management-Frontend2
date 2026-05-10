import { getTotalRooms } from "@/apis/hostelConfigAPI"
import { type HostelConfig } from "@/types/hostelConfigTypes"
import { useQuery } from "@tanstack/react-query"

export const useHostelConfig=()=>{
    return useQuery<HostelConfig,Error>({
        queryKey:["hostelConfig","rooms"],
        queryFn:async()=>{
            const response = await getTotalRooms()
            return response.config
        },
        staleTime:5*60*1000
    })
}