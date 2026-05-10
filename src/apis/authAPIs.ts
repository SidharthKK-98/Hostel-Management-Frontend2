

//login API

import { type LoginResponse, type LoginPayload, type SignupPayload,type LogoutResponse, type UpdateProfileParams, type UpdateProfileResponse, type GetProfileResponse,type GetUsersResponse, type User } from "@/types/authTypes";
import commonAPI from "./commonAPI";
import { type RoomUnassignedUsers } from "@/types/hostelConfigTypes";
import {type GetTotalPriceResponse } from "@/types/selectDailyMenuTypes";

export const signupAPI = (payload:SignupPayload)=>{
    return commonAPI<LoginResponse>("POST","/signup",payload)
}

export const loginAPI = (payload:LoginPayload)=>{

    return commonAPI<LoginResponse>("POST","/login",payload)

}

export const logoutApI=()=>{
    return commonAPI<LogoutResponse>("POST","logout")
}

export const getAuthUser=()=>{
    return commonAPI<User>("GET","authenticated")
}

export const getRoomUnassignedUsers =()=>{
    return commonAPI<RoomUnassignedUsers>("GET","/room/RoomUnassignedUsers")
}

export const getProfile =()=>{
    return commonAPI<GetProfileResponse>("GET","profile/view")
}

export const updateProfile=(payload:UpdateProfileParams)=>{

    const formData = new FormData()

    if(payload.firstName){
        formData.append("firstName" , payload.firstName)
    }

    if(payload.lastName){
        formData.append("lastName" , payload.lastName)
    }

    if(payload.userImg){
        formData.append("userImg" , payload.userImg)
    }

    return commonAPI<UpdateProfileResponse>("PATCH","profile/edit",formData)
}

export const getAllUsers =()=>{
    return commonAPI<GetUsersResponse>("GET","profile/getAllUsers")
}

export const getMonthlyAmount=(payload:string)=>{
    return commonAPI<GetTotalPriceResponse>("GET",`foodSelction/getAmount/${payload}`)
}