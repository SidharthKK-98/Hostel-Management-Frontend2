import type { Rooms } from "./hostelConfigTypes"

export interface SignupPayload {
    firstName:string,
    lastName:string,
    emailId:string,
    password:string,
    age:number,
    gender:string
}

export interface LoginPayload {
    emailId:string,
    password:string
}

export interface LoginResponse{
    message:string,
    user:User 
}



export interface User {

    _id:string,
    firstName:string,
    lastName:string,
    emailId?:string,
    role?: "user" | "admin",
    photoUrl:string,
    photoPublicId?:string,
    isFeesPayed?:boolean,
    gender:"male" | "female" | "other",
    age?:number,
    roomId?: Rooms | null,
    isRoomAllocated?:boolean,
    createdAt?:string,
    updatedAt?:string,
    __v?:number,
     viewProfile?: boolean

}



export interface LogoutResponse {
    message:string
}

export interface GetProfileResponse {
    message:string
    data:User
}

export interface UpdateProfileParams {
    firstName?:string
    lastName?:string
    userImg?:File | null
}

export interface UpdateProfileResponse {
    message:string
    data:User
}

export interface RoomCardProps {
    viewProfile:User 
}

export interface RoomId {
    _id:string
    roomNumber:number
}

export interface GetUsers {

    _id:string
    firstName:string
    lastName:string
    emailId:string
    photoUrl:string
    isFeesPayed:boolean
    gender:string
    age:number
    roomId:RoomId | null
    isRoomAllocated:boolean


}

export interface GetUsersResponse {
    message:string
    data:GetUsers[]
}

