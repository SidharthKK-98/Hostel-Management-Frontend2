import type {CardProps} from "../types/cardTypes"
import {
  Card as UICard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function Card(props:CardProps) {
    if(props.type=="feature"){

        return (
    <UICard className="grid grid-cols-2  lg:grid-cols-2  mx-5">
       
            <div>
                <img src={props.image} alt="image" />
            </div>

            <div className="my-auto">
                <CardHeader>
                    <CardTitle>{props.heading}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{props.description}</p>
                </CardContent>
 
            </div>
       
       
</UICard>
  )

    }
  
}

export default Card