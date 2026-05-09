import { useMenuSelectionHistory } from "@/hooks/MenuSelectionHooks/useMenuSelectionHistory"
import MenuHistoryCard from "../Cards/MenuHistoryCard";
import DateAndYearCard from "../Cards/DateAndYearCard";

function MenuOverview() {

    const {data:menuSelsction} = useMenuSelectionHistory()
    console.log(menuSelsction);


    
  return (
    <div>
          <h1 className="text-center m-4 font-bold text-3xl">Your Menu History</h1>

          <div>
            <DateAndYearCard/>
          </div>

      {
        <div className="grid grid-cols-3 gap-4">
            {
                menuSelsction?.data.map(item=>(
              <MenuHistoryCard key={item._id} item={item}/>
            ))
            }
        </div>
      
      }
    </div>
  )
}

export default MenuOverview