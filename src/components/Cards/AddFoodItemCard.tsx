import { Camera, Plus, IndianRupee, Utensils,X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddFoodItems } from "@/hooks/MenuItemsHooks/useAddFoodItems";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateFoodItems } from "@/hooks/MenuItemsHooks/useUpdateFoodItems";

type AddFoodItemCardProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
  isUpdating: boolean
  updatingFoodId: string | null
  setUpdatingFoodId: React.Dispatch<React.SetStateAction<string | null>>
}

function AddFoodItemCard({setActive,setIsUpdating,isUpdating,updatingFoodId,setUpdatingFoodId}:AddFoodItemCardProps) {

  const {mutate:addMenu}=useAddFoodItems()
  const{mutate:updateMenu} = useUpdateFoodItems()

const [name, setName] = useState("")
const [price, setPrice] = useState<number | "">("")
const [foodImg, setFoodImg] = useState<File | null>(null)
const [previewUrl,setPreviewUrl] = useState<string | null>(null)

const handleSubmit=()=>{
  if(!name || !price || !foodImg){
    toast.error("Fill all fields")
    return
  }

  addMenu(
    {name,price,foodImg},
    {
      onSuccess:(response)=>{
        toast.success(response.message)
        setActive(false)
      }
    }
  )
}

const handleUpdate=(foodId:string)=>{
    updateMenu(
      {
      id: foodId,
      name,
      price:price === "" ? undefined : Number(price),
      foodImg
      },
       
      {
        onSuccess:()=>{
          setActive(false)
          setIsUpdating(false)
          setUpdatingFoodId(null)
        }
      }
    )
}

  return (
    <div>
      <Card className=" w-full max-w-[350px] shadow-2xl border-gray-100 rounded-[2rem]">
        <CardHeader className="space-y-1">
          <div className="flex justify-between">
           <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-100 p-2 rounded-xl">
              <Utensils className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {
                isUpdating?(<div>Update Item</div>):(<div>Add Item</div> )
              }
              </CardTitle>
          </div>

          <Button onClick={()=>{setActive(false);setIsUpdating(false)}}><X/></Button>

          </div>
         
          
          <CardDescription>
            Enter the details for your new dish.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="grid gap-6">
          {/* Professional Image Upload Area */}
          <div className="group relative flex flex-col items-center justify-center h-44 w-full border-2 border-dashed border-muted rounded-[1.5rem] bg-slate-50/50 hover:bg-orange-50/30 hover:border-orange-200 transition-all cursor-pointer">
           {
            previewUrl ?(

            <div>
                <img src={previewUrl} alt="food preview" 
               className="absolute inset-0 h-full w-full object-cover"/>

              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setFoodImg(null)
                  setPreviewUrl(null)
                }}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black"
              >
                <X size={16} />
              </Button>
            </div>

            ) : (

                 <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-full shadow-sm text-muted-foreground group-hover:text-orange-500 transition-colors">
                <Camera className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium text-muted-foreground group-hover:text-orange-600">
                Click to upload photo
              </p>
            </div>
            )
           }
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={(e)=>{if(e.target.files?.[0]){
              setFoodImg(e.target.files[0])
              setPreviewUrl(URL.createObjectURL(e.target.files?.[0]))
            }

            }}
            />
          </div>

          {/* Form Inputs */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground/70">
                Dish Name
              </Label>
              <Input 
                id="name" 
                placeholder="e.g. Garlic Butter Naan" 
                onChange={(e)=>setName(e.target.value)}
                className="rounded-xl border-gray-200 focus-visible:ring-orange-400 h-11"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-xs font-bold uppercase text-muted-foreground/70">
                Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <IndianRupee className="h-4 w-4" />
                </span>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="0.00" 
                  onChange={(e)=>setPrice(Number(e.target.value))}
                  className="pl-9 rounded-xl border-gray-200 focus-visible:ring-orange-400 h-11 font-semibold"
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
          onClick={()=>{
            if(isUpdating && updatingFoodId){
              handleUpdate(updatingFoodId)
            }
            else{
              handleSubmit()
            }
          }} 
          className="w-full h-12 rounded-2xl bg-[#3c851f]
           hover:bg-green-700 text-white font-bold text-md 
           shadow transition-all active:scale-[0.98]">
             {
                isUpdating?(<div>Update Food Item</div>):
                (<div className="flex items-center"> <Plus className="mr-2 h-5 w-5" /> Save Food Item</div> )
              }
           
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddFoodItemCard