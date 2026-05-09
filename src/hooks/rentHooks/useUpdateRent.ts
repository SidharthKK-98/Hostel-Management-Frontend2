import { updateRent } from "@/apis/rentAPIs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateRent =()=>{
    const qc = useQueryClient()

    return useMutation({
        mutationFn:updateRent,
        onSuccess:(data)=>{
            toast.success(data.message)

            qc.invalidateQueries({
                queryKey: ["rent"]
            })
        },
         onError: (error) => {
            toast.error(
                error.message || "Failed to update rent"
            )
        }
    })
}