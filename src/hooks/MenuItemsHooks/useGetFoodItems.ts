import { getFoodMenu } from "@/apis/MenuAPIs"
import type { FoodMenuResponse } from "@/types/MenuItemsTypes"
import { useQuery } from "@tanstack/react-query"


export const useGetFoodItems=()=>{

    return useQuery<FoodMenuResponse>({
        queryKey:["FoodMenu"],
        queryFn:async()=>{
            const response = await getFoodMenu()
            return response
        }
    })
}