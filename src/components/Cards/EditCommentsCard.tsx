import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { ImageIcon } from "lucide-react"
import { useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { useEditComments } from "@/hooks/CommentHooks/useEditCommets"
import type {  GetComment } from "@/Types/commentTypes"

type Props = {
  commentData:GetComment  | null
  setIsEditing:React.Dispatch<React.SetStateAction<boolean>>
}

function EditCommentCard({
 commentData,setIsEditing
}: Props) {

    const initialImage = commentData?.image ?? null
    const initialRating = commentData?.rating ?? null
    const initialComment = commentData?.comment ?? ""
  const [photo, setPhoto] = useState<string | null>(initialImage || null)
  const [rating, setRating] = useState<number | null>(initialRating ?? null)
  const [comment, setComment] = useState(initialComment)
  const [file, setFile] = useState<File | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  const { mutate: updateComment, isPending } = useEditComments()

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setPhoto(url)
  }

  
  const handleSubmit = () => {
    const isRatingChanged = rating !== initialRating
    const isCommentChanged = comment.trim() !== initialComment.trim()
    const isImageChanged = !!file

    if (!commentData) {
        toast.error("No comment selected")
        return
        }
    
    if (!isRatingChanged && !isCommentChanged && !isImageChanged) {
      toast.error("No changes made")
      return
    }

    if (isRatingChanged && (!rating || rating < 1 || rating > 5)) {
      toast.error("Rating must be between 1 and 5")
      return
    }

    if (isCommentChanged && !comment.trim()) {
      toast.error("Comment cannot be empty")
      return
    }

    updateComment(
      {
        commentId:commentData?._id,
        ...(isRatingChanged && rating !== null  && { rating }),
        ...(isCommentChanged && { comment }),
        ...(isImageChanged && {  file }),
      },
      {
        onSuccess: () => {
          setIsEditing(false)
          toast.success("Review updated")
          
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Edit Review</CardTitle>
        <CardDescription>Update your review</CardDescription>
      </CardHeader>

      <CardContent>
    
        <div className="flex flex-col gap-1.5">
          <Label>Update Image</Label>
          <div
            className="relative flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-muted-foreground/40 bg-muted/40 p-4 text-center cursor-pointer hover:border-foreground/50 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />

            {photo ? (
              <img
                src={photo}
                alt="preview"
                className="w-full max-h-36 object-cover rounded-md"
              />
            ) : (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-primary">Click to upload</span>{" "}
                  or drag & drop
                </p>
              </>
            )}
          </div>
        </div>

        
        <div className="flex flex-col gap-1.5 mt-2">
          <Label>Rating (1–5)</Label>
          <Input
            type="number"
            min={1}
            max={5}
            step={1}
            value={rating ?? ""}
            onChange={(e) => {
              const value = Number(e.target.value)

              if (value >= 1 && value <= 5) {
                setRating(value)
              } else {
                setRating(null)
              }
            }}
            placeholder="Enter rating (1 to 5)"
          />
        </div>

        
        <div className="flex flex-col gap-1.5 mt-2">
          <Label>Comment</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-20 resize-y"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Review"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EditCommentCard