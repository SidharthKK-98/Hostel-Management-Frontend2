
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { DailyMenuItemCardProps, MealType } from "@/types/dailyMenuTypes";
// import type { FoodItem } from "@/Types/MenuItemsTypes";

function DailyMenuItemCard({item,selectedMeals,onChange}:DailyMenuItemCardProps) {

    const {name,price,image} = item

    const mealTimes:{ id: MealType; label: string }[] = [
    { id: "morning", label: "Morning" },
    { id: "noon", label: "Noon" },
    { id: "night", label: "Night" },
  ];

  return (
    <div>
        <Card className="w-75 overflow-hidden border-zinc-200 shadow-sm transition-hover hover:shadow-md">
      {/* Image Section */}
      <div className="relative h-48 w-full p-2 ">
        <img
          src={image} 
          alt="image"
          className="h-full w-full object-cover rounded"
        />
        <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
          Rs. {price}
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className="text-center text-xl font-bold text-slate-800 capitalize">
            {name}
        </h3>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="mt-2 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center mb-4">
            Select for Daily Menu
          </p>
          
          <div className="flex  gap-3 rounded-lg bg-slate-50 p-3">
            {mealTimes.map((time) => (
              <div key={time.id} className="flex items-center space-x-3">
                <Checkbox id={time.id} className="h-5 w-5 border-slate-300 data-[state=checked]:bg-teal-600"
                  checked = {selectedMeals[time.id]}
                  onCheckedChange={(v)=>onChange(time.id, !!v)}
                />
                <Label
                  htmlFor={time.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
                >
                  {time.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default DailyMenuItemCard