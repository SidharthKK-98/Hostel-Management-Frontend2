import { postRent } from "@/apis/rentAPIs"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const usePostRent =()=>{

    return useMutation({
        mutationFn:postRent,
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(error)=>{
              toast.error( error.message || "Failed to add rent"
            )
        }
    })

}