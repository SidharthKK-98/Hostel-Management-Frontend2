import {type AddCommentResponse, type AddCommentPayload, type GetCommentsResponse } from "@/Types/commentTypes";
import commonAPI from "./commonAPI";

export const addComment=(payload:AddCommentPayload)=>{

    const formData = new FormData()

    formData.append("rating",payload.rating.toString())
    formData.append("comment",payload.comment)

    if(payload.image){
        formData.append("commentImg",payload.image)
    }

    return commonAPI<AddCommentResponse>("POST","comment/add",formData)
}

export const getComments=()=>{
    return commonAPI<GetCommentsResponse>("GET","comment/get")
}