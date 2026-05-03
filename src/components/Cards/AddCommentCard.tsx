
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
import { ImageIcon, Star } from "lucide-react"
import { useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useAddComent } from "@/hooks/CommentHooks/useAddComment"
import { toast } from "sonner"

const LABELS = ["", "Terrible", "Poor", "Average", "Good", "Excellent"]



function AddCommentCard() {

    const [photo, setPhoto] = useState<string | null>(null)
    const [rating, setRating] = useState(0)
    const [hovered, setHovered] = useState(0)
    const [comment, setComment] = useState("")
    const [file,setFile] = useState<File | null>(null)

    const fileRef = useRef<HTMLInputElement>(null)

    console.log(photo,rating,comment);
    const {mutate:addComment,isPending}= useAddComent()
    


  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return
        setFile(selectedFile)
        const url = URL.createObjectURL(selectedFile)
        setPhoto(url)

       
}

const handleSubmit=()=>{

  if(!rating){
    toast.error("Please add rating")
    return
  }

  if(!comment.trim()){
    toast.error("Please add comment")
    return
  }

  addComment({
    rating,
    comment,
    image:file ?? undefined
  },
  {
      onSuccess: () => {
        setRating(0)
        setComment("")
        setPhoto(null)
        setFile(null)

        if (fileRef.current) fileRef.current.value = ""
      }
    }
)

}


  return (
    <div>

            <Card  className=" w-full max-w-sm">
            <CardHeader>
                <CardTitle>Add Review</CardTitle>
                <CardDescription>
                  Add your reviews
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1.5">
                  <Label>Upload Image</Label>
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
                          or drag &amp; drop
                        </p>
                        <p className="text-[11px] text-muted-foreground">PNG, JPG up to 5MB</p>
                      </>
                    )}

                      
                    </div>
                  </div>

                   <Label className="m-2">Rating</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-5 w-7 cursor-pointer transition-colors"
                            fill={(hovered || rating) >= star ? "#EF9F27" : "transparent"}
                            stroke={(hovered || rating) >= star ? "#BA7517" : "currentColor"}
                            strokeWidth={1.5}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                          />
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {LABELS[hovered || rating] || "Tap to rate"}
                        </span>
                      </div>


                    <div className="flex flex-col gap-1.5 mt-2">
                        <Label>Comment</Label>
                        <Textarea
                          placeholder="Share your experience..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-20 resize-y"
                        />
                  </div>
                
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full"
                  onClick={handleSubmit}
                  disabled={isPending}
                >
                       {isPending? "Posting" : " Add Review"}
                </Button>
            </CardFooter>
            </Card>

    </div>
  )
}

export default AddCommentCard