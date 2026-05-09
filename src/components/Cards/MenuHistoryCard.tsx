import { Card, CardContent } from "@/components/ui/card"
import type { MenuHistoryCardProps } from "@/Types/selectDailyMenuTypes"

function MenuHistoryCard({ item }: MenuHistoryCardProps) {
  const today = new Date(item.date)

  const day = String(today.getDate()).padStart(2, "0")
  const month = today.toLocaleString("default", { month: "short" })
  const year = today.getFullYear()

  const Today = `${day} ${month} ${year}`

  const getMealTotal = (
    meals:
      | {
          foodId: {
            price: number
          }
          portion: number
        }[]
      | undefined
  ) => {
    return (
      meals?.reduce(
        (acc, curr) => acc + curr.foodId.price * curr.portion,
        0
      ) || 0
    )
  }

  return (
    <div className="m-4">
      <Card className="mx-auto my-4 max-w-md rounded-[32px] border-0 bg-[#f6f6f6] shadow-md">
        <CardContent className="h-[250px] overflow-y-auto p-6">
          {/* Top Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
             
              <h1 className="text-xl font-bold text-black">
                {Today}
              </h1>
            </div>

            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Total
              </p>

              <p className="text-xl font-bold text-black">
                ₹{item.totalPrice}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Morning */}
            {item?.morning?.length > 0 && (
              <div className="rounded-[28px] bg-white p-5 shadow-sm">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-xl">
                      🌅
                    </div>

                    <div>
                      <h2 className="text-base font-semibold text-black">
                        Morning
                      </h2>

                      <p className="text-xs text-gray-400">
                        Breakfast · {item.morning.length} items
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    ₹{getMealTotal(item.morning)}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {item?.morning?.map((menu) => (
                    <div
                      key={menu._id}
                      className="flex items-center justify-between rounded-2xl bg-[#f3f4f6] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">🍽️</div>

                        <p className="text-base font-medium text-black">
                          {menu?.foodId?.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-600">
                          ×{menu?.portion}
                        </div>

                        <p className="text-base font-semibold text-black">
                          ₹{menu?.foodId?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Noon */}
            {item?.noon?.length > 0 && (
              <div className="rounded-[28px] bg-white p-5 shadow-sm">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-xl">
                      ☀️
                    </div>

                    <div>
                      <h2 className="text-base font-semibold text-black">
                        Noon
                      </h2>

                      <p className="text-xs text-gray-400">
                        Lunch · {item.noon.length} items
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                    ₹{getMealTotal(item.noon)}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {item?.noon?.map((menu) => (
                    <div
                      key={menu._id}
                      className="flex items-center justify-between rounded-2xl bg-[#f3f4f6] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">🍽️</div>

                        <p className="text-base font-medium text-black">
                          {menu?.foodId?.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-600">
                          ×{menu?.portion}
                        </div>

                        <p className="text-base font-semibold text-black">
                          ₹{menu?.foodId?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Night */}
            {item?.night?.length > 0 && (
              <div className="rounded-[28px] bg-white p-5 shadow-sm">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-xl">
                      🌙
                    </div>

                    <div>
                      <h2 className="text-base font-semibold text-black">
                        Night
                      </h2>

                      <p className="text-xs text-gray-400">
                        Dinner · {item.night.length} items
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    ₹{getMealTotal(item.night)}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {item?.night?.map((menu) => (
                    <div
                      key={menu._id}
                      className="flex items-center justify-between rounded-2xl bg-[#f3f4f6] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">🍽️</div>

                        <p className="text-base font-medium text-black">
                          {menu?.foodId?.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-600">
                          ×{menu?.portion}
                        </div>

                        <p className="text-base font-semibold text-black">
                          ₹{menu?.foodId?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MenuHistoryCard