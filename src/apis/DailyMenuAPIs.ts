import { type AddDailyMenuResponse, type DailyMenuProps, type DailyMenu } from "@/types/dailyMenuTypes";
import commonAPI from "./commonAPI";


export const createDailyMenu=(payload:DailyMenuProps)=>{

    return commonAPI<AddDailyMenuResponse>("POST","dailyFoodMenu/setFood",payload)
}

export const getDailyMenu=()=>{
    return commonAPI<DailyMenu>("GET","dailyFoodMenu/getFoodMenu")
}

export const deleteDailyMenu=(payload:string)=>{
    return commonAPI<DailyMenu>("DELETE",`dailyFoodMenu/deleteFoodMenu/${payload}`)
}