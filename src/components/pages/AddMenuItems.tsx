import { useGetFoodItems } from "@/hooks/MenuItemsHooks/useGetFoodItems"
import FoodItemCard from "../Cards/FoodItemCard";
import AddFoodItemCard from "../Cards/AddFoodItemCard";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import usePagination from "@/hooks/ui/usePagination";
import Pagination from "../Pagination";

function AddMenuItems() {

  const {data,isLoading} = useGetFoodItems()
  const [active,setActive] = useState<boolean>(false)
  const [isUpdating,setIsUpdating] = useState<boolean>(false)
  const [updatingFoodId,setUpdatingFoodId] = useState<string | null>(null)

  const {
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedData,
} = usePagination({
  data: data?.foodMenu || [],
  itemsPerPage: 5,
})

  
  return (
    <div className='text-black  h-full p-2  w-full  sm:px-4 lg:px-6 '>

      <div className="font-bold text-3xl text-center m-4">
        Add Menu 
      </div>
      <div className="">
        {
          active || isUpdating ?(
               <AddFoodItemCard setActive={setActive} setIsUpdating={setIsUpdating} 
               isUpdating={isUpdating} updatingFoodId={updatingFoodId} setUpdatingFoodId={setUpdatingFoodId}/> 

          ):
          (
            <Button  onClick={()=>setActive(true)}>Add Food Item</Button>

          )
        }
      </div>
      <div  >
        {
          isLoading ? <h1>Loading...</h1>
          :
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 w-full p-4">
            {
              paginatedData?.map((foodItem)=>(
                <FoodItemCard key={foodItem._id} foodItem={foodItem} setIsUpdating={setIsUpdating}
                setUpdatingFoodId={setUpdatingFoodId}
                />
              ))
            }
          </div>
        
        } 
      </div>

      <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={setCurrentPage}
        />
    </div>
  )
}

export default AddMenuItems