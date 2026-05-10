
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { RoomCardProps} from "@/types/authTypes"




function RoomCard({viewProfile}:RoomCardProps) {

const room = viewProfile?.roomId

const Occupants =room?.occupants ?? []   
  return (
    <div>
        {
            
        <Card  className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Room Mate</CardTitle>
                    <CardDescription>
                            details of room mate
                    </CardDescription>
                </CardHeader>
                <CardContent >

                    {
                        Occupants[0] ? (
                            <div className="flex gap-4 items-center">
                                <div>
                                    <img src={Occupants[0]?.photoUrl} alt="roomMate image"  className="w-20 h-20 rounded-full"/>
                                </div>
                                <div>
                                    <h1>{Occupants[0]?.firstName}</h1>
                                </div>
                            </div>
                                
                        ):
                        (
                                <h1>No Room Mate</h1>
                        )
                    }
                   
                </CardContent>
                
        </Card>
                        
        }
    </div>
  )
}

export default RoomCard