import { useMenuSelectionHistory } from "@/hooks/MenuSelectionHooks/useMenuSelectionHistory"
import MenuHistoryCard from "../Cards/MenuHistoryCard";
import DateAndYearCard from "../Cards/DateAndYearCard";
import usePagination from "@/hooks/ui/usePagination";
import Pagination from "../Pagination";

function MenuOverview() {

    const {data:menuSelsction} = useMenuSelectionHistory()
    console.log(menuSelsction);

    const {
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedData,
} = usePagination({
  data: menuSelsction?.data || [],
  itemsPerPage: 3,
})



    
  return (
    <div>
          <h1 className="text-center m-4 font-bold text-3xl">Your Menu History</h1>

          <div>
            <DateAndYearCard/>
          </div>

      {
        <div className="grid grid-cols-3 gap-4">
            {
                paginatedData?.map(item=>(
              <MenuHistoryCard key={item._id} item={item}/>
            ))
            }
        </div>
        
      
      }

       <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={setCurrentPage}
        />
    </div>
  )
}

export default MenuOverview