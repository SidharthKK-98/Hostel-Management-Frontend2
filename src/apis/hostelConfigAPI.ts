import  {type AddTotalRoomsParams,type RemoveUsersParams, type AddGuestSuccessResponse, 
    type AddUsersParams, type HostelConfigResponse, type RemoveGuestResponse,type AddTotalRoomResponse,
    type addRoomsResponse, type addRoomsParams,type RemoveRoomResponse, 
   type GetSummaryResponse} from "@/types/hostelConfigTypes"
import commonAPI from "./commonAPI"


export const addTotalRooms=(payload:AddTotalRoomsParams)=>{
    return commonAPI<AddTotalRoomResponse>("POST","hostelConfig/totalRoom/create",payload)
}

export const getTotalRooms=()=>{
    return commonAPI<HostelConfigResponse>("GET","/hostelConfig/totalroom/get")
}

export const addRooms=(payload:addRoomsParams)=>{
    return commonAPI<addRoomsResponse>("POST","hostelConfig/totalRoom/addRooms",payload)
}

export const removeRooms=(roomId:string)=>{
    return commonAPI<RemoveRoomResponse>("DELETE",`hostelConfig/totalRoom/deleteRoom/${roomId}`)
}

export const addUsers=({roomId,userId}:AddUsersParams)=>{
    return commonAPI<AddGuestSuccessResponse>("POST",`room/addGuest/${roomId}`,{userId})
}

export const removeUser=({roomId,userId}:RemoveUsersParams)=>{
    return commonAPI<RemoveGuestResponse>("DELETE",`room/removeGuest/${roomId}/${userId}`)
}

export const getRoomSummary = ()=>{
    return commonAPI<GetSummaryResponse>("GET","/room/summary")
}