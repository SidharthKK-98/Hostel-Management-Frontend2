import { addComment } from "@/apis/CommentAPIs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useAddComent=()=>{

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:addComment,
        onSuccess:(data)=>{
            toast.success(data.message)
            queryClient.invalidateQueries({queryKey:["comments"]})
        },
        onError:(error)=>{
            console.log(error.message)
            toast.error("Unable to add comment")
            
        }
    })

}