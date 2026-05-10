import {type GroceryResponse, type AddGroceryParams, type GetGroceryResponse, type RestoreGroceryParam, type TakeGroceryParam, type UpdateGroceryParam, type RemoveGreceryParam } from "@/types/groceryTypes";
import commonAPI from "./commonAPI";


export const addGrocery=(payload:AddGroceryParams)=>{
    return commonAPI<GroceryResponse>("POST","grocery/add",payload)
}

export const getGrocery=()=>{
    return commonAPI<GetGroceryResponse>("GET","grocery/getItems")
}

export const restoreGrocery=(payload:RestoreGroceryParam)=>{
    return commonAPI<GroceryResponse>("PATCH","grocery/restore",payload)
}

export const useGrocery=(payload:TakeGroceryParam)=>{
    return commonAPI<GroceryResponse>("POST","grocery/takeGrocery",payload)
}

export const updateGrocery = (payload:UpdateGroceryParam)=>{
    return commonAPI<GroceryResponse>("PATCH","grocery/update",payload)
}

export const removeGrocery = (payload:RemoveGreceryParam)=>{
    return commonAPI<GroceryResponse>("DELETE","grocery/remove",payload)
}