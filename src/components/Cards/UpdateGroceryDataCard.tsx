
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import type { Grocery } from "../../types/groceryTypes"
import { useState } from "react"
import { useUpdateGrocery } from "@/hooks/groceryHooks/useUpdateGrocery"

type Props = {
  selectedGrocery: Grocery | null
  onClose: () => void
}

function UpdateGroceryDataCard({selectedGrocery,onClose}:Props) {

      const [name, setName] = useState("")
      const [unit, setUnit] = useState("")
      const [minStock, setMinStock] = useState<number | undefined>()
      const{mutate:updateGrocery} = useUpdateGrocery()

      

      const updateItem=()=>{
          if (!selectedGrocery) return

            const payload = { _id:selectedGrocery?._id,
                        name: name !== "" ? name : selectedGrocery?.name,
                        unit: unit !== "" ? unit : selectedGrocery?.unit,
                        minStock: minStock ?? selectedGrocery?.minStock
                      }

            updateGrocery(payload,{
                onSuccess:()=>{
                    setName("")
                    setUnit("")
                    setMinStock(undefined)
                }
            })

      }                

  return (
    <div>
             <Card  className="mx-auto w-full max-w-lg">
            <CardHeader className="flex justify-between items-center">
                <div>
                        <CardTitle>Update Item</CardTitle>
                        <CardDescription>
                            Update the data
                        </CardDescription>
                </div>

                <div>
                    <Button variant={"outline"} onClick={onClose}>X</Button>
                </div>
               
            </CardHeader>
            <CardContent>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Item Name</label>
                        <Input placeholder="Update grocery name"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-2">

                                <div className="space-y-2">
                                    <label className="text-sm font-medium ">Min Stock</label>
                                   <Input 
                                        type="number" 
                                        placeholder="Update Minimum stock"
                                        value={minStock ?? ""}
                                        onChange={(e)=> {const value = e.target.value
                                                        setMinStock(value === "" ? undefined : Number(value))
                                                        }}
                                        />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Unit</label>
                                    
                                    <Select value={unit} onValueChange={setUnit}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Update unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="kg">kg</SelectItem>
                                            <SelectItem value="g">g</SelectItem>
                                            <SelectItem value="liter">liter</SelectItem>
                                            <SelectItem value="ml">ml</SelectItem>
                                            <SelectItem value="packet">Packet</SelectItem>
                                            <SelectItem value="pcs">pcs</SelectItem>

                                        </SelectContent>
                                    </Select>
                                </div>

                     </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button  size="sm" className="bg-green-500 hover:bg-green-600"
                    onClick={()=>{updateItem() ;onClose()}}
                >
                   Update
                </Button>
            </CardFooter>
            </Card>
    </div>
  )
}

export default UpdateGroceryDataCard