import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { removeComments } from "@/apis/CommentAPIs"

export const useRemoveComments = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:removeComments,

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["comments"] })

            toast.success(data.message)
        },

        onError: (error) => {
            toast.error(error.message|| "Remove failed")
        }
    })
}