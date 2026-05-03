import AddCommentCard from "../Cards/AddCommentCard"
import ViewCommentCard from "../Cards/ViewCommentCard"
import EditCommentCard from "../Cards/EditCommentsCard"
import { useState } from "react"
import type {  GetComment } from "@/Types/commentTypes"
import { useGetUserSpecificComments } from "@/hooks/authHooks/useGetUserSpecificComments"
import { useGetProfile } from "@/hooks/ProfileHooks/useGetProfile"

function AddComment() {
        const {data:profile} = useGetProfile()
        const userId = profile?._id
        const {data:comments} = useGetUserSpecificComments(userId)
        const [isEditing,setIsEditing] = useState<boolean>(false)
        const [commentData,setCommentData] = useState<GetComment | null>(null)
  

  return (
    <div>

      <div className="m-5 w-full lg:grid grid-cols-2 gap-4">
          <AddCommentCard />
          {
            isEditing&& <EditCommentCard commentData={commentData} setIsEditing={setIsEditing}/>
          }
         
      </div>

      <div className="lg:grid grid-cols-3">
        
        {
          comments?.data.map((comment)=>(
            <ViewCommentCard key={comment._id} comment={comment} fromAddComment={true}
             setIsEditing={setIsEditing} setCommentData={setCommentData}/>
          ))
        }
      </div>


    </div>
  )
}

export default AddComment