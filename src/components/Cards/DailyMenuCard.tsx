

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDeleteDailyMenu } from "@/hooks/DailyMenuItemsHooks/useDeleteDailyMenu";
import { useGetProfile } from "@/hooks/ProfileHooks/useGetProfile";
import type { DailyMenuCardProps } from "@/types/dailyMenuTypes";



function DailyMenuCard({menu}:DailyMenuCardProps) {

     const today = new Date(menu.date)
         const day = String(today.getDate()).padStart(2, "0")
         const month = String(today.getMonth() + 1).padStart(2, "0")
         const year = today.getFullYear()

        const Today = `${day}-${month}-${year}`

        const {mutate:deleteMenu} = useDeleteDailyMenu()
        const {data:Profile} = useGetProfile()


    const handleRemove=(id:string)=>{
            deleteMenu(id)

    }

  return (
    <div>

            <Card  className="w-full max-w-2xl bg-orange-50/30 border-orange-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{Today}</CardTitle>
        <CardDescription>
          
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-scroll h-80">

        <h1 className="font-semibold my-2">Morning</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menu.morning.map((meal, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              
              
              <div className="relative group">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
                />
                 <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
                                Rs. {meal.price}
                </div>
              </div>
              
              <p className="text-sm font-medium leading-tight px-2">
                {meal.name}
              </p>
            </div>
          ))}
        </div>

        <h1 className="font-semibold my-2">Noon</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menu.noon.map((meal, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              
              
              <div className="relative group">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
                                Rs. {meal.price}
                </div>
              </div>
              
              <p className="text-sm font-medium leading-tight px-2">
                {meal.name}
              </p>
            </div>
          ))}
        </div>


        <h1 className="font-semibold my-2">Night</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menu.night.map((meal, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              
              
              <div className="relative group">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
                                Rs. {meal.price}
                </div>
              </div>
              
              <p className="text-sm font-medium leading-tight px-2">
                {meal.name}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {
          Profile?.role==="admin"&&(
              <Button variant="destructive" size="sm" className="w-full" onClick={()=>handleRemove(menu._id)}>
                Remove
              </Button>
          )
        }
        
      </CardFooter>
    </Card>
    </div>
  )
}

export default DailyMenuCard