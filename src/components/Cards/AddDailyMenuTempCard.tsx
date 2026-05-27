

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAddDailyMenu } from "@/hooks/DailyMenuItemsHooks/useAddDailyMenu";
import type { AddDailyMenuTempCardProps } from "@/types/dailyMenuTypes";




function AddDailyMenuTempCard({selectedDate,selectedMenu,onSuccessAdd}:AddDailyMenuTempCardProps) {

    const{mutate}=useAddDailyMenu()

    // console.log(selectedDate,selectedMenu);

    const Today = selectedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })

    const handleAddDailyMenu=()=>{

        mutate({
            date:selectedDate.toLocaleDateString("en-CA"),
            morning:selectedMenu.morning.map(item=>item._id),
            noon:selectedMenu.noon.map(item=>item._id),
            night:selectedMenu.night.map(item=>item._id)


        },
    {
        onSuccess:()=>{
            localStorage.removeItem("tempDailyMenu");
            onSuccessAdd()
        }
    })

    }
    
  return (
    <div>

    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle> {
            Today
            }
          </CardTitle>
        <CardDescription>
            {
                `Menu`
            }
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 p-4 h-60 w-auto  overflow-x-auto overflow-y-auto">
        <div className="shrink-0 ">
             <h1 className="my-2 font-semibold">Morning</h1>
           <div >
                {
                selectedMenu.morning.map((item)=>(
                    <div key={item._id} className="relative bg-white rounded p-2 shadow-2xl my-2">
                            <img src={item.image} alt="image" className="rounded w-25 h-25 shadow-2xl" />
                            
                                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
                                Rs. {item.price}
                                </div>

                                <div className="flex justify-center font-semibold mb-4">
                                    {item.name}
                                </div>                   
                        </div>
                ))
            }
           </div>
            
        </div>

        <div className="shrink-0 ">
             <h1  className="my-2 font-semibold" >Noon</h1>
           <div>
                {
                    selectedMenu.noon.map((item)=>(
                        <div key={item._id} className="relative bg-white rounded p-2 shadow-2xl my-2 ">
                            <img src={item.image} alt="image" className="rounded w-25 h-25 shadow-2xl" />
                            
                                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
                                Rs. {item.price}
                                </div>

                                <div className="flex justify-center font-semibold mb-4">
                                    {item.name}
                                </div>                   
                        </div>
                    ))
            }
           </div>
            
        </div>

        <div className="shrink-0 ">
             <h1  className="my-2 font-semibold">Night</h1>
           <div >
                {
                selectedMenu.night.map((item)=>(
                   <div key={item._id} className="relative bg-white rounded p-2 shadow-2xl my-2">
                            <img src={item.image} alt="image" className="rounded w-25 h-25 shadow-2xl" />
                            
                                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
                                Rs. {item.price}
                                </div>

                                <div className="flex justify-center font-semibold mb-4">
                                    {item.name}
                                </div>                   
                        </div>
                ))
            }
           </div>
            
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddDailyMenu} variant="outline" size="sm" className="w-full">
          Add Menu
        </Button>
      </CardFooter>
    </Card>

    </div>
  )
}

export default AddDailyMenuTempCard