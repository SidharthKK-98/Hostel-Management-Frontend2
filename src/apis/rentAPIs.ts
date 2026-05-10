import { type RentResponse, type RentPayload } from "@/types/rentTypes";
import commonAPI from "./commonAPI";

export const postRent=(payload:RentPayload)=>{
    return commonAPI<RentResponse>("POST","/rent/addRent",payload)
}

export const getRent=()=>{
    return commonAPI<RentResponse>("GET","/rent/getRent")
}

export const updateRent=(payload:RentPayload)=>{
    return commonAPI<RentResponse>("PATCH","/rent/updateRent",payload)
}