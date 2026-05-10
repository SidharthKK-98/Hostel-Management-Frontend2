import { getMonthlyAmount } from "@/apis/authAPIs"
import type { GetTotalPriceResponse } from "@/types/selectDailyMenuTypes"
import { useQuery } from "@tanstack/react-query"

export const useGetAmount = (userId: string) => {
  return useQuery<GetTotalPriceResponse>({
    queryKey: ["monthlyAmount", userId],
    queryFn: () => getMonthlyAmount(userId),
    enabled: !!userId
  })
}
