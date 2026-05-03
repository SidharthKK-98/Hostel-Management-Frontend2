import { getRoomUnassignedUsers } from "@/apis/authAPIs"
import type { User } from "@/Types/authTypes"
// import { type RoomUnassignedUsers } from "@/Types/hostelConfigTypes"
import { useQuery } from "@tanstack/react-query"



export const useUnassignedUsers=()=>{

    return useQuery<User[],Error>({
        queryKey:["RoomUnassignedUsers"],
        queryFn:async()=>{
            const response =  await getRoomUnassignedUsers()
            return response.data
        },
        staleTime:5*60*1000
    })

}