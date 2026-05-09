import type { FoodItemCardProps } from "@/Types/MenuItemsTypes"
import { Button } from "@/components/ui/button"
import { useRemoveFoodItems } from "@/hooks/MenuItemsHooks/useRemoveFoodItems"
import { Pencil, Trash2, UtensilsCrossed } from "lucide-react"

function FoodItemCard({
  foodItem,
  setIsUpdating,
  setUpdatingFoodId,
}: FoodItemCardProps) {
  const { image, name, price, _id } = foodItem

  const { mutate: removeFoodItem } = useRemoveFoodItems()

  const removeItem = (itemId: string) => {
    removeFoodItem(itemId)
  }

  return (
    <div>
      <div className="max-w-[300px] overflow-hidden rounded-[2rem] bg-[#f8f8f8] shadow-md">
        {/* Top Section */}
        <div className="relative flex h-[210px] flex-col items-center justify-center bg-[#f3f3f5] px-6 py-5">
          {/* Price Badge */}
          <div className="absolute right-5 top-4 rounded-full border border-gray-200 bg-white px-4 py-1 text-lg font-bold text-black shadow-sm">
            ₹ {price}
          </div>

          {/* Food Icon/Image */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm">
  {image ? (
    <img
      src={image}
      alt="food image"
      className="h-full w-full rounded-full object-cover"
    />
  ) : (
    <UtensilsCrossed className="h-10 w-10" />
  )}
</div>

          {/* Food Name */}
          <h2 className="text-2xl font-bold text-gray-300">
            {name}
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="bg-white px-6 py-6">
          <h2 className="text-xl font-semibold text-black">
            {name}
          </h2>

         
          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            {/* Update */}
            <Button
              onClick={() => {
                setIsUpdating(true)
                setUpdatingFoodId(_id)
              }}
              className="h-10 rounded-2xl border-2 border-green-600 bg-white text-sm font-semibold text-green-600 hover:bg-white"
            >
              <Pencil className="mr-2 h-5 w-5" />
              Update
            </Button>

            {/* Remove */}
            <Button
              onClick={() => removeItem(_id)}
              className="h-10 rounded-2xl border-2 border-red-500 bg-white text-sm font-semibold text-red-500 hover:bg-white"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItemCard