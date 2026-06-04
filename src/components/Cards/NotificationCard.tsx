import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Notification } from "@/types/notificationTypes"
import { Checkbox } from "@/components/ui/checkbox"
import { useDeleteNotification } from "@/hooks/NotificationHooks/useDeleteNotification"
import { ShoppingCart } from "lucide-react"

interface GroceryNotificationProps {
  GroceryNotification: Notification[]
}

function NotificationCard({ GroceryNotification }: GroceryNotificationProps) {
  const { mutate: deleteNotification } = useDeleteNotification()

  return (
    <div>
      <Card className="mx-auto w-full max-w-sm bg-white rounded-3xl shadow-lg border border-orange-50 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300" />

        <CardHeader className="pb-2 pt-5 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-[17px] font-semibold text-gray-900 leading-tight">
                  Grocery Notifications
                </CardTitle>
                <p className="text-[10px] tracking-widest text-orange-300 font-medium uppercase mt-0.5">
                  Stock Alerts
                </p>
              </div>
            </div>
            {GroceryNotification.length > 0 && (
              <span className="bg-orange-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full leading-tight">
                {GroceryNotification.length} Low
              </span>
            )}
          </div>

          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-orange-100 to-transparent" />
        </CardHeader>

        <CardContent className="px-6 pb-2 flex flex-col gap-3">
          {GroceryNotification.map((notification, i) => (
            <div
              key={notification._id}
              className="flex items-center gap-3 bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-orange-50 hover:border-orange-300 hover:translate-x-1 group cursor-pointer"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Checkbox
                id={notification._id}
                className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded-md w-5 h-5 flex-shrink-0"
                onCheckedChange={(checked) => {
                  if (checked) {
                    deleteNotification(notification._id)
                  }
                }}
              />
              <label
                htmlFor={notification._id}
                className="flex-1 cursor-pointer"
              >
                <span className="block text-[13px] font-medium text-gray-800 leading-tight">
                  {notification.message}
                </span>
                <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-orange-400 font-medium bg-orange-100 px-2 py-0.5 rounded-md">
                  ▼ stock low
                </span>
              </label>
            </div>
          ))}

          
        </CardContent>

        
      </Card>
    </div>
  )
}

export default NotificationCard