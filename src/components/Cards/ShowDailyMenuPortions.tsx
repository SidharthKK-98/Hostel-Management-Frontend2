import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import type { SelectedFoodResponse } from "@/Types/dailyMenuTypes"

interface Props {
  DailyMenuPortion?: SelectedFoodResponse
}

function ShowDailyMenuPortions({ DailyMenuPortion }: Props) {
  const totalItems = DailyMenuPortion?.data?.length || 0

  const totalQty =
    DailyMenuPortion?.data?.reduce(
      (acc, item) => acc + item.totalPortion,
      0
    ) || 0

  return (
    <div>
      <Card className="mx-auto w-full max-w-md rounded-[32px] border-0 bg-[#f7f7f7] shadow-md max-h-95 space-y-4 overflow-y-auto ">
        <CardHeader className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dff3df] text-2xl">
                🍽️
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black">
                  Tomorrow&apos;s Menu
                </h2>
                <p className="text-sm text-gray-400">
                  Selected items for the day
                </p>
              </div>
            </div>

            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#ececef] py-5 text-center">
              <p className="text-4xl font-bold text-black">
                {totalItems}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Items
              </p>
            </div>

            <div className="rounded-2xl bg-[#ececef] py-5 text-center">
              <p className="text-4xl font-bold text-black">
                {totalQty}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Total Qty
              </p>
            </div>

           
          </div>
        </CardHeader>

        <CardContent>
          {/* Divider */}
          <div className="mb-6 border-t border-gray-200" />

          <p className="mb-4 text-sm font-bold tracking-wide text-gray-400 uppercase">
            Menu Items
          </p>

          {/* Loading */}
          {!DailyMenuPortion ? (
            <p className="text-gray-500">Loading....</p>
          ) : DailyMenuPortion.data.length === 0 ? (
            <p className="text-gray-500">No items found</p>
          ) : (
            <div className="space-y-4">
              {DailyMenuPortion?.data?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl bg-[#ececef] px-5 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">🍛</div>

                    <p className="text-xl font-medium text-black">
                      {item.name}
                    </p>
                  </div>

                  <div className="rounded-full border border-gray-300 bg-white px-4 py-1 text-lg font-semibold text-gray-700 shadow-sm">
                    ×{item.totalPortion}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter />
      </Card>
    </div>
  )
}

export default ShowDailyMenuPortions