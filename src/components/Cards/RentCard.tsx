import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetRent } from "@/hooks/rentHooks/useGetRent"
import { usePostRent } from "@/hooks/rentHooks/usePostRent"
import { useUpdateRent } from "@/hooks/rentHooks/useUpdateRent"
import { Home, RefreshCw } from "lucide-react"

function RentCard() {
  const [rent, setRent] = useState("")

  const { data: rentData } = useGetRent()
  const postRentMutation = usePostRent()
  const updateRentMutation = useUpdateRent()

  const existingRent = rentData?.data

  const handleSubmit = () => {
    if (!rent) return
    const payload = { rent: Number(rent) }
    if (existingRent) {
      updateRentMutation.mutate(payload)
    } else {
      postRentMutation.mutate(payload)
    }
  }

  return (
    <div>
      <Card className="mx-auto w-full max-w-sm bg-white rounded-3xl border border-[#f0ede8] shadow-md overflow-hidden p-0">
        <div className="h-0.5 w-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />

        <CardHeader className="pt-5 pb-0 px-6 gap-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <CardTitle className="text-[17px] font-semibold text-gray-900 leading-tight">
                  Rent
                </CardTitle>
                <p className="text-[10px] tracking-widest text-emerald-500 font-medium uppercase mt-0.5">
                  Monthly Payment
                </p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#e8e4de] to-transparent" />

          <div className="mt-3 mb-1">
            <p className="text-[10px] text-[#a89b8c] uppercase tracking-widest font-medium mb-1">
              Current Rent
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-[#a89b8c]">₹</span>
              <span className="text-3xl font-semibold text-gray-900 tracking-tight">
                {existingRent?.rent?.toLocaleString() ?? "—"}
              </span>
              <span className="text-xs text-[#c8bfb5]">/month</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-[#a89b8c] mb-2"> Update monthly rent</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#c8bfb5]">₹</span>
              <Input
                type="number"
                placeholder="Enter rent amount"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                className="pl-7 rounded-xl border-[#ede9e3] bg-[#fafaf8] focus:border-emerald-400 focus:ring-emerald-100 text-sm"
              />
            </div>
          </div>
        </CardHeader>

        <CardFooter className="px-6 pb-5 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={postRentMutation.isPending || updateRentMutation.isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm gap-2 shadow-md shadow-emerald-100"
          >
            <RefreshCw className="w-4 h-4" />
            {existingRent ? "Update Rent" : "Add Rent"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RentCard