import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetRent } from "@/hooks/rentHooks/useGetRent"
import { usePostRent } from "@/hooks/rentHooks/usePostRent"
import { useUpdateRent } from "@/hooks/rentHooks/useUpdateRent"



function RentCard() {
  const [rent, setRent] = useState("")

  const { data:rentData } = useGetRent()

  const postRentMutation = usePostRent()
  const updateRentMutation = useUpdateRent()

  const existingRent = rentData?.data

//   useEffect(() => {
//     if (existingRent?.rent) {
//       setRent(String(existingRent.rent))
//     }
//   }, [existingRent])

  const handleSubmit = () => {
    if (!rent) return

    const payload = {
      rent: Number(rent),
    }

    if (existingRent) {
      updateRentMutation.mutate(payload)
    } else {
      postRentMutation.mutate(payload)
    }
  }

  return (
    <div>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Rent</CardTitle>

          <CardDescription>
            Add or update monthly rent
            <p className="font-bold">Current Rent : {rentData?.data?.rent}</p>
          </CardDescription>

          <Input
            type="number"
            placeholder="Enter rent amount"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </CardHeader>

        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleSubmit}
            disabled={
              postRentMutation.isPending ||
              updateRentMutation.isPending
            }
          >
            {existingRent ? "Update Rent" : "Add Rent"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RentCard