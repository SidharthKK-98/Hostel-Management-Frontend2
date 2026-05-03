import { getUserSpecificComments } from "@/apis/CommentAPIs"
import { useQuery } from "@tanstack/react-query"

export const useGetUserSpecificComments = (userId?: string) => {
  return useQuery({
    queryKey: ["comments", userId], 
    queryFn: () => getUserSpecificComments(userId!),
    enabled: !!userId, 
  })
}