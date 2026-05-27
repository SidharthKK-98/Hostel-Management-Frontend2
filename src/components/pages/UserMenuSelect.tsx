import { useGetDailyMenu } from "@/hooks/DailyMenuItemsHooks/useGetDailyMenu"
import SelectDailyMenuCard from "../Cards/SelectDailyMenuCard";

function UserMenuSelect() {

  const {data:dailyMenu} = useGetDailyMenu()
  const length = dailyMenu?.data?.length
  
  return (

    <div >
      {
        length===0 ?(
          <div className="flex items-center justify-center h-[70vh]">
              <h1 className="text-3xl font-bold text-red-700">
                No Menu Created
              </h1>
            </div>        
      ):(
          <div className="m-4 h-lvh overflow-y-scroll">

         {
        dailyMenu?.data.map((menu)=>(
          <SelectDailyMenuCard key={menu._id} menu={menu}/>
        ))
        }

         </div>
      )
      }
    </div>
  )
}

export default UserMenuSelect