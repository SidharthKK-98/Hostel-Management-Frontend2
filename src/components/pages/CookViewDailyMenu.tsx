import { useGetDailyMenu } from "@/hooks/DailyMenuItemsHooks/useGetDailyMenu"
import DailyMenuCard from "../Cards/DailyMenuCard"
import { useDailyMenuPortion } from "@/hooks/MenuSelectionHooks/useGetDailyMenuPortion"
import { useState } from "react"
import { Button } from "../ui/button"
import ShowDailyMenuPortions from "../Cards/ShowDailyMenuPortions"

function CookViewDailyMenu() {

        const [portionDate, setPortionDate] = useState<Date | null>(null)
        const [isSelectPortion,setIsSelectPortion] = useState<boolean>(false)

        
        const {data:DailyMenu} = useGetDailyMenu()
        const {data:DailyMenuPortion} = useDailyMenuPortion(portionDate,{enabled: !!portionDate})


      const getTomorrow =()=>{
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate()+1)
      return tomorrow
    }

    const handleDailyItems=()=>{
         setPortionDate(getTomorrow())

    }
        
    
    
  return (
    <div className="m-4 text-center ">
        <h1 className="font-semibold text-2xl my-2">View Menu</h1>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        {
         (DailyMenu?.data?.length ?? 0)>0?(
          DailyMenu?.data?.map((menu)=>(
           
                <DailyMenuCard key={menu._id} menu={menu}/>
              
          ))
        ):(
            <div className=" flex  justify-center m-5">
                <h1 className="text-2xl  font-semibold text-red-600">No Menu Published</h1>

            </div>
        )
        }
     </div>

     <div className="relative w-full m-4">
      <Button className="absolute left-4 " onClick={()=>{handleDailyItems();setIsSelectPortion(prev=>!prev)}}>
          Get Daily Items
        </Button>

         {
           isSelectPortion &&(
           <ShowDailyMenuPortions DailyMenuPortion={DailyMenuPortion}/>
           )
        }
     </div>
    </div>
  )
}

export default CookViewDailyMenu