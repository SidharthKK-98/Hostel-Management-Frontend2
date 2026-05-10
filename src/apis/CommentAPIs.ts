import {type AddCommentResponse, type AddCommentPayload, type GetCommentsResponse, type EditCommentsPayload } from "@/types/commentTypes";
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

export const getUserSpecificComments=(userId:string)=>{
  return commonAPI<GetCommentsResponse>("GET",`comment/get/${userId}`)
}

export const removeComments=(commentId:string)=>{
    return commonAPI<AddCommentResponse>("DELETE",`comment/remove/${commentId}`)
}

export const editComments =(payload:EditCommentsPayload)=>{
     const formData = new FormData();

  formData.append("commentId", payload.commentId);

  if (payload.rating !== undefined) {
    formData.append("rating", payload.rating.toString());
  }

  if (payload.comment !== undefined) {
    formData.append("comment", payload.comment);
  }

  if (payload.file) {
    formData.append("commentImg", payload.file);
  }

      return commonAPI<AddCommentResponse>("PATCH","comment/edit",formData)


}