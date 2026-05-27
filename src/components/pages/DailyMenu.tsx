import { useState } from "react"
import DatePicker from "../DatePicker"
import DailyMenuItemCard from "../Cards/DailyMenuItemCard"
import { useGetFoodItems } from "@/hooks/MenuItemsHooks/useGetFoodItems"
import { Button } from "@/components/ui/button"
import AddDailyMenuTempCard from "../Cards/AddDailyMenuTempCard"
import type { FoodItem } from "@/types/MenuItemsTypes"
import type { MealType, SelectedMenu } from "@/types/dailyMenuTypes"
import { useGetDailyMenu } from "@/hooks/DailyMenuItemsHooks/useGetDailyMenu"
import DailyMenuCard from "../Cards/DailyMenuCard"
import { useDailyMenuPortion } from "@/hooks/MenuSelectionHooks/useGetDailyMenuPortion"
import ShowDailyMenuPortions from "../Cards/ShowDailyMenuPortions"


function DailyMenu() {


    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [portionDate, setPortionDate] = useState<Date | null>(null)

    const [isSelectFood,setIsSelectFood] = useState<boolean>(false)
    const [isSelectPortion,setIsSelectPortion] = useState<boolean>(false)
    const [selectedMenu,setSelectedMenu] = useState<{morning:FoodItem[]
      noon:FoodItem[]
      night:FoodItem[]
    }>({morning:[],noon:[],night:[]})

    const {data:Items} = useGetFoodItems()
    const {data:DailyMenu} = useGetDailyMenu()
    const {data:DailyMenuPortion} = useDailyMenuPortion(portionDate,{enabled: !!portionDate})


    const getTomorrow =()=>{
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate()+1)
      return tomorrow
    }
    
   

    const handleMealChange = (item:FoodItem,meal:MealType,value:boolean)=>{

      setSelectedMenu((prev)=>{

         let newMenu:SelectedMenu
        const existing = prev[meal].some((i:FoodItem)=>i._id === item._id)

        if(value && !existing){
          newMenu= {...prev,[meal]:[...prev[meal],item]}
        }

       else if(!value && existing){
          newMenu= {
            ...prev,
            [meal]:prev[meal].filter((i)=>i._id !== item._id)
          }
        }
        else{
          newMenu=prev
        }

         localStorage.setItem("tempDailyMenu",JSON.stringify(newMenu))

         return newMenu
      })

    }
    const onSuccessAdd=()=>{
      setSelectedDate(undefined)
      setSelectedMenu({ morning: [], noon: [], night: [] });

    }
    
    const handleDailyItems=()=>{
         setPortionDate(getTomorrow())

    }

  return (
    <div className='text-black m-4'>

      <div className="font-bold text-3xl text-center m-4">
        Meal Schedule 
      </div>

    <div className="flex justify-around">
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

        <Button onClick={()=>setIsSelectFood(prev=>!prev)}>
            Select Food Items
        </Button>

        <Button onClick={()=>{handleDailyItems();setIsSelectPortion(prev=>!prev)}}>
          Get Daily Items
        </Button>
    </div>
     

     <div className="m-4">

        {
          isSelectFood &&  <div className="flex justify-around gap-2 overflow-x-scroll">
            {
              Items?.foodMenu.map((item)=>{

                const selectedMeals = {
                  morning:selectedMenu.morning.some((i)=>i._id === item._id),
                  noon:selectedMenu.noon.some((i)=>i._id === item._id),
                  night:selectedMenu.night.some((i)=>i._id === item._id)
                }

               return( 
               <DailyMenuItemCard key={item._id}
                item={item}
                selectedMeals = {selectedMeals}
                onChange={(meal:MealType,value:boolean)=>handleMealChange(item,meal,value)}
                />)


      })
            }

          </div>

        }

     </div>

     <div>
        {
          selectedDate &&(
            <AddDailyMenuTempCard selectedDate={selectedDate}
              selectedMenu={selectedMenu}
              onSuccessAdd={onSuccessAdd}
            />
          )
        }

     </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {
          DailyMenu?.data?.map((menu)=>(
           
                <DailyMenuCard key={menu._id} menu={menu}/>
              
          ))
        }
     </div>

     <div className="my-2">
      {
        isSelectPortion &&(
       <ShowDailyMenuPortions DailyMenuPortion={DailyMenuPortion}/>
        )
      }
     </div>

     

    </div>
  )
}

export default DailyMenu