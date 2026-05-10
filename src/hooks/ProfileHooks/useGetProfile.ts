import { getProfile } from "@/apis/authAPIs"
import type { User } from "@/types/authTypes"
import { useQuery } from "@tanstack/react-query"

export const useGetProfile =()=>{

     return useQuery<User>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await getProfile()
      return res.data
    },
    staleTime: 0,
  })

}