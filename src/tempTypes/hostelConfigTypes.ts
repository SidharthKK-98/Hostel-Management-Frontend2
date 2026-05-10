import type { User } from "./authTypes";


export interface AddTotalRoomResponse {
    message:string,
    saveConfig:TotalRoomConfig
}

export interface TotalRoomConfig {
    _id:string,
    totalRooms:number,
    roomCapacity:number,
    rooms:string[],
    createdAt: string; 
  updatedAt: string;
  __v: number;
}

export interface RoomOccupant {

    _id:string,
    firstName:string,
    photoUrl:string,
    age:number,
    gender:string

}

export interface Rooms {
    _id:string,
    roomNumber:number,
    capacity:number,
    occupants:RoomOccupant[],
    status:string,
    createdAt:string,
    updatedAt:string,
    __v:number
}

export interface HostelConfig {
    _id:string,
    totalRooms:number,
    roomCapacity:number,
    rooms:Rooms[],
    __v:number,
    uodatedAt:string
}

export interface HostelConfigResponse {
    message:string,
    config:HostelConfig
}

export interface RemoveRoomResponse {
    message:string
}

export interface RoomUnassignedUsers{
    message:string,
    data:User[]
}


export interface AddGuestSuccessResponse  {
  message: string;
}

export interface RemoveGuestResponse  {
  message: string;
}

export interface AddUsersParams {
    roomId:string,
    userId:string
}

export interface RemoveUsersParams {
    roomId:string,
    userId:string
}

export interface AddTotalRoomsParams {
    totalRooms:number,
    roomCapacity:number
}

export interface addRoomsResponse {
    message:string,
    rooms:Rooms[]
}

export interface addRoomsParams {
    numberOfRooms:number
}

export interface GetSummaryResponse {
    _id:null
    totalRooms:number
    totalOccupants:number
    emptyRooms:number
    partiallyOccupiedRooms:number
    fullRooms:number
}