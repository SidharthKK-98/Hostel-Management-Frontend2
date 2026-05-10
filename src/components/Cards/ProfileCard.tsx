
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { User } from "@/types/authTypes"

interface ProfileCardProps {
  viewProfile: User | undefined
  setIsEdit:React.Dispatch<React.SetStateAction<boolean>>
  fromAdmin?:boolean
}


function ProfileCard({viewProfile,setIsEdit,fromAdmin}:ProfileCardProps) {
  const room = viewProfile?.roomId
  return (
    <div>
      <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-xl">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-xl"  />
      <img
        src={viewProfile?.photoUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-full rounded-xl  "
      />
      <CardHeader>
        <CardAction>
        </CardAction>
        <CardTitle>{`${viewProfile?.firstName} ${viewProfile?.lastName}` }</CardTitle>
        <CardDescription>
         {
          !fromAdmin && (
                <div>
            Room Number : {
               viewProfile?.isRoomAllocated && room && typeof room !== "string"
                ? room.roomNumber
                : "Not Allocated"
            }
          </div>
          )
         }
          
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={()=>setIsEdit(prev=>!prev)}>Edit Profile</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default ProfileCard