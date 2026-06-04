import { Button } from "@/components/ui/button"
import {
  Card,
  
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { useState } from "react"
import { toast } from "sonner"

import type {  Grocery } from "../../types/groceryTypes"
import { useRestoreGrocery } from "@/hooks/groceryHooks/useRestoreGrocery"
import { useUseGrocery } from "@/hooks/groceryHooks/useUseGrocery"
import { useRemoveGrocery } from "@/hooks/groceryHooks/useRemoveGrocery"
import { useGetProfile } from "@/hooks/ProfileHooks/useGetProfile"
import { Trash2 } from "lucide-react"

type Props = {
  grocery: Grocery
  onUpdate: (grocery: Grocery) => void
}

function ShowGroceryCard({ grocery, onUpdate }: Props) {
  const [qty, setQty] = useState("")
  const [useQty, setUseqty] = useState("")

  const { name, unit, lastAddedStock, currentStock, predictedOutDate } = grocery

  const { mutate: restoreItem } = useRestoreGrocery()
  const { mutate: consumeGrocery } = useUseGrocery()
  const { mutate: removeGrocery } = useRemoveGrocery()
  const { data: profile } = useGetProfile()

  const capacity = 100 
  const percent = (currentStock / capacity) * 100

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTime = today.getTime()

  const diff = predictedOutDate
    ? (() => {
        const date = new Date(predictedOutDate)
        date.setHours(0, 0, 0, 0)
        return date.getTime() - todayTime
      })()
    : null

  const daysLeft =
    diff !== null ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : null

  const predictedDate = predictedOutDate
    ? new Date(predictedOutDate).toLocaleDateString("en-GB")
    : null

  const restoreGrocery = () => {
    if (!qty) {
      toast.error("Please fill restoring quantity")
      return
    }

    restoreItem(
      { name, unit, restoringAmount: Number(qty) },
      { onSuccess: () => setQty("") }
    )
  }

  const consumeItem = () => {
    if (!useQty) {
      toast.error("Please fill consuming quantity")
      return
    }

    consumeGrocery(
      { groceryId: grocery._id, unit, qty: Number(useQty) },
      { onSuccess: () => setUseqty("") }
    )
  }

  const removeItem = () => {
    if (!grocery?._id) return
    removeGrocery({ _id: grocery._id })
  }

  return (
    <Card className="max-w-sm mx-auto rounded-2xl shadow-md p-4 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-xs text-gray-500">Kitchen Stock</p>
        </div>

        {daysLeft !== null && daysLeft <= 2 && (
          <span className="text-xs bg-yellow-100 text-red-700 px-3 py-1 rounded-full">
            Stock Running Low
          </span>
        )}
      </div>

      {/* Stock Section */}
      <div className="bg-gray-100 p-3 rounded-xl">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Current Stock</span>
          <span className="font-medium">{currentStock} {unit}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between text-xs mt-1 text-gray-500">
          <span>0</span>
          <span>Capacity {capacity} {unit}</span>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-gray-100 p-3 rounded-xl">
          <p className="text-xs text-gray-500">Last Added</p>
          <p className="font-semibold">{lastAddedStock} {unit}</p>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl">
          <p className="text-xs text-gray-500">Estimate Date</p>
          <p className="font-semibold">{predictedDate || "-"}</p>
        </div>
      </div>

      {/* Admin Section */}
      {profile?.role === "admin" ? (
        <>
          <div>
            <p className="text-sm font-medium mb-2">Restore Stock</p>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter quantity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <span className="px-3 py-2 bg-yellow-100 rounded-lg text-sm">
                {unit}
              </span>
            </div>
          </div>

          <Button className="w-full bg-green-600 text-white" onClick={restoreGrocery}>
            Restore
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onUpdate(grocery)}
            >
              ✏️ Update
            </Button>

            <Button
              variant="outline"
              className="flex-1 text-red-600 border-red-300"
              onClick={removeItem}
            >
               <Trash2 size={18} /> Remove
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-sm font-medium mb-2">Use Item</p>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={useQty}
              onChange={(e) => setUseqty(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={consumeItem}>
            Consume
          </Button>
        </>
      )}
    </Card>
  )
}

export default ShowGroceryCard