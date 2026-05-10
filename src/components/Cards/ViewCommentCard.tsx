

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import type { GetComment } from "@/types/commentTypes"
import { useRemoveComments } from "@/hooks/CommentHooks/useRemoveComments"

type ViewCommentCardProps = {
  comment: GetComment;
  fromAddComment?:boolean
  setIsEditing?:React.Dispatch<React.SetStateAction<boolean>> 
  setCommentData?:React.Dispatch<React.SetStateAction<GetComment | null>>
}

function ViewCommentCard({comment,fromAddComment,setIsEditing,setCommentData}:ViewCommentCardProps) {

    const {mutate:removeComments,isPending} = useRemoveComments()

    const handleRemoveComments=(commentId:string)=>{
        removeComments(commentId)
    }

    const handleEdit=()=>{
        setIsEditing?.(prev=>!prev)
        setCommentData?.(comment)
    }

  return (
    <div className="mx-4">
        <Card  className="mx-auto w-full max-w-sm  border border-zinc-800 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                    <Avatar className="bg-blue-600 text-white">
                      <AvatarImage src={comment.user.photoUrl} />

                    </Avatar>

                    <div>
                    <p className="font-semibold">{comment.user.firstName} {comment.user.lastName}</p>
                    <p className="text-sm text-zinc-400">{new Date(comment.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-gray-600 px-2 py-1 rounded-md text-sm">
                    <span className="text-yellow-400 font-semibold">{comment.rating}</span>
                    <span className="text-zinc-400">/ 5</span>
                </div>

            </CardHeader>
            
            <CardContent className="w-4xl">
               <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const fill = Math.min(Math.max(comment.rating - i, 0), 1) * 100;

                        return (
                        <div key={i} className="relative w-[18px] h-[18px]">
                            {/* empty star (base) */}
                            <Star size={18} className="absolute text-zinc-600" />

                            {/* filled portion */}
                            <div
                            className="absolute top-0 left-0 h-full overflow-hidden"
                            style={{ width: `${fill}%` }}
                            >
                            <Star
                                size={18}
                                className="text-yellow-400 fill-yellow-400"
                            />
                            </div>
                        </div>
                        );
                    })}
                </div>

                 {comment.image && (
                        <div className="mt-2">
                        <img
                            src={comment.image}
                            alt="comment"
                            className="w-auto max-h-30 object-cover rounded-lg"
                        />
                        </div>
                    )}

                <p className="m-4">{comment.comment}</p>

            </CardContent>
            <CardFooter>
                {
                    fromAddComment && (

                        <div className="grid grid-cols-2 w-full gap-2">
                                <Button variant="outline" size="sm" className="w-full"
                                    onClick={handleEdit}
                                >
                                  Edit
                                </Button>

                                <Button variant="outline" size="sm" className="w-full"
                                    onClick={()=>handleRemoveComments(comment._id)}
                                    disabled={isPending}
                                >
                                    {
                                        isPending?"Deleting...":"Delete"
                                    }
                                  
                            </Button>
                        </div>
                            
                    )
                }
                
            </CardFooter>
            </Card>
    </div>
  )
}

export default ViewCommentCard