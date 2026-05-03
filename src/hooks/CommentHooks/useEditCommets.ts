import { editComments } from "@/apis/CommentAPIs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useEditComments = ()=>{

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:editComments,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["comments"]})
        },

         onError: (error) => {
            toast.error(error?.message || "Edit failed");
            },
    })

}