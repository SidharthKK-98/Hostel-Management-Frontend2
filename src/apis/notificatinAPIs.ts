import {type DeleteNotificationResponse, type  NotificationsResponse } from "@/types/notificationTypes"
import commonAPI from "./commonAPI"

export const getNotifications=()=>{
    return commonAPI<NotificationsResponse>("GET","notification/getAll")
}

export const deleteNotification=(id:string)=>{
    return commonAPI<DeleteNotificationResponse>("PATCH",`notification/read/${id}`)
}