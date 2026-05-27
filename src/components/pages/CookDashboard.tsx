import { useGetGrocery } from "@/hooks/groceryHooks/useGetGrocery"
import ShowGroceryCard from "../Cards/ShowGroceryCard"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {type Grocery } from "@/types/groceryTypes"
import usePagination from "@/hooks/ui/usePagination"
import Pagination from "../Pagination"

export default function CookDashboard() {

        const{data:groceryData} = useGetGrocery()
        const[search,setSearch] = useState("")
        const[filteredGroceries ,setFilteredGroceries ] = useState<Grocery[]>([])


        const displayGroceries =
            filteredGroceries.length > 0
            ? filteredGroceries
            : groceryData || []

        const {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedData,
        } = usePagination({
        data: displayGroceries,
        itemsPerPage: 3,
    })


        const searchItems = ()=>{
            
            const filterItem = groceryData?.filter((grocery)=>
                grocery.name.toLowerCase().includes(search.toLocaleLowerCase())
            )
            setFilteredGroceries(filterItem || [])
            setSearch("")
            }
            const handleUpdate = (grocery: Grocery) => {
             console.log("Update grocery:", grocery)
             }
  return (
    <div>

        <div className="flex lg:w-1/2 m-4">
             <Input
                type="text"
                placeholder="Search grocery..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={searchItems}>{search?"Search":"Back"}</Button>
        </div>

        <div className="grid  lg:grid-cols-3 gap-4 m-4">
            {
             
                 paginatedData?.map((grocery)=>(
                    <ShowGroceryCard  key={grocery._id} grocery={grocery}   onUpdate={handleUpdate}
/>
                ))
            
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
