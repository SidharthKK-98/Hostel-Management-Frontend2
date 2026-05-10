

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import { Textarea } from "@/components/ui/textarea"
import { usePostComplaint } from "@/hooks/ComplaintHooks/usePostComplaint"
import {type ComplaintCategory } from "@/types/complaintTypes"
import { useState } from "react"
import { toast } from "sonner"



function PostComplaintCard() {

    const[category,setCategory] = useState<ComplaintCategory>("FOOD")
    const[subject,setSubject] = useState<string>("")

    const {mutate:postComplaint,isPending} =usePostComplaint()

    const handlePostComplaint=()=>{
        if(!subject.trim()) return toast.error("Please enter complaint details")

        postComplaint({category,subject},
            {
                onSuccess:()=>{
                    setSubject("")
                },
                onError:(err)=>{
                    toast.error(err.message)
                }
            }
        )            
    }

  return (
    <div>

            <Card className="w-full max-w-sm p-2">
                <CardHeader>
                    <CardTitle>Post Complaint</CardTitle>
                    <CardDescription>
                        Post your complaints
                    </CardDescription>
                    
                </CardHeader>
                <CardContent >

                    <div>
                        <RadioGroup defaultValue="FOOD" className="w-fit " value={category} onValueChange={(value) => setCategory(value as ComplaintCategory)}>

                               <div className="flex gap-2">
                                     <div className="flex items-center gap-3">
                                    <RadioGroupItem value="FOOD" id="food" />
                                    <Label htmlFor="r1">FOOD</Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="ROOM" id="room" />
                                    <Label htmlFor="r2">ROOM</Label>
                                </div>
                               </div>

                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="MAINTENANCE" id="maintenance" />
                                    <Label htmlFor="r3">MAINTENANCE</Label>
                                </div>

                                 <div className="flex items-center gap-3">
                                    <RadioGroupItem value="OTHER" id="other" />
                                    <Label htmlFor="r3">OTHER</Label>
                                </div>
                        </RadioGroup>

                    </div>
                        <div className="grid gap-2 ">
                        <Label htmlFor="description" className="my-4">Details</Label>
                          <Textarea  id="description" placeholder="Type details here." 
                          value={subject} 
                          onChange={(e) => setSubject(e.target.value)}/>

                        </div>
                        
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handlePostComplaint} disabled={isPending}>
                    {
                        isPending?("Posting...."):("Post")
                    }
                    </Button>
                    
                </CardFooter>
                </Card>
    </div>
  )
}

export default PostComplaintCard