import {type SaveFoodItemResponse, type AddFoodItemsParams,type FoodMenuResponse, type UpdateFoodItemsParams } from "@/types/MenuItemsTypes";
import commonAPI from "./commonAPI";

export const addMenu=(payload:AddFoodItemsParams)=>{

    const formData = new FormData()
    formData.append("name",payload.name)
    formData.append("price",payload.price.toString())
    formData.append("foodImg",payload.foodImg)
    return commonAPI<SaveFoodItemResponse>("POST","foodMenu/addFoodItem",formData)
}

export const getFoodMenu=()=>{
    return commonAPI<FoodMenuResponse>("GET","foodMenu/getFoodItems")
}

export const removeFoodItem=(ItemId:string)=>{
    return commonAPI<SaveFoodItemResponse>("DELETE",`foodMenu/deleteFoodItem/${ItemId}`)
}

export const updateFoodItem=(payload:UpdateFoodItemsParams)=>{

    const formData = new FormData()

            if (payload.name) {
                formData.append("name", payload.name)
            }

            if (payload.price !== undefined) {
                formData.append("price", (payload.price??0).toString())
            }

            if (payload.foodImg) {
                formData.append("foodImg", payload.foodImg)
            }

    return commonAPI<SaveFoodItemResponse>("PATCH",`foodMenu/updateFoodItem/${payload.id}`,formData)
}