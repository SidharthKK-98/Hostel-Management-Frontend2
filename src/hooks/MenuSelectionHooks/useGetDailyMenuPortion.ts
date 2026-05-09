import { getDailyPortion } from "@/apis/UserSelectMenuAPIs"
import { useQuery } from "@tanstack/react-query"

type Options={
    enabled?:boolean
}

export const useDailyMenuPortion = (date:Date | null,options?:Options)=>{

    return useQuery({
        queryKey:["daily-portion",date?.toDateString().split("T")[0]],
        queryFn:()=>{  
            if (!date) throw new Error("Date is required")
                return getDailyPortion(date)
        },
        enabled: options?.enabled
    })

}