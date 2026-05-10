import  { useGetGrocery } from "@/hooks/groceryHooks/useGetGrocery"
import AddGroceryCard from "../Cards/AddGroceryCard"
import ShowGroceryCard from "../Cards/ShowGroceryCard"
import { useMemo, useState } from "react"
import type { Grocery } from "@/types/groceryTypes"
import UpdateGroceryDataCard from "../Cards/UpdateGroceryDataCard"

function AddGroceries() {

    const{data:groceryData} = useGetGrocery()
    const [selectedGrocery, setSelectedGrocery] = useState<Grocery | null>(null)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)

   const sortedGroceries = useMemo(() => {
            if (!groceryData) return []

            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const todayTime = today.getTime()

            return groceryData.slice().sort((a, b) => {
                if (!a.predictedOutDate) return 1
                if (!b.predictedOutDate) return -1

                const dateA = new Date(a.predictedOutDate)
                const dateB = new Date(b.predictedOutDate)

                dateA.setHours(0, 0, 0, 0)
                dateB.setHours(0, 0, 0, 0)

                return (dateA.getTime() - todayTime) - (dateB.getTime() - todayTime)
            })

}, [groceryData])

  return (
    <div>
        <h1 className="font-semibold text-2xl text-center">Groceries</h1>

        <div className="m-4 lg:flex "> 
            {isUpdateOpen && selectedGrocery ? (
            <UpdateGroceryDataCard
                selectedGrocery={selectedGrocery}
                onClose={() => setIsUpdateOpen(false)}
            />
            ):(
                <AddGroceryCard/>

            )
        }       
 </div>

        <div className="grid  lg:grid-cols-3 gap-4 m-4">
            {
                sortedGroceries?.map((grocery)=>(
                    <ShowGroceryCard  key={grocery._id} grocery={grocery}
                        onUpdate={(grocery)=>{
                            setSelectedGrocery(grocery)
                            setIsUpdateOpen(true)
                        }}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default AddGroceries