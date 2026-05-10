import {
  CreditCard,
  DoorClosed,
  Mail,
  ReceiptText,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { useGetAmount } from "@/hooks/ProfileHooks/useGetAmount"
import type { GetUsers } from "@/Types/authTypes"

type UserCardProps = {
  user: GetUsers
}

function UserProfileCard({ user }: UserCardProps) {
  const { data: getMonthlyAmount } = useGetAmount(user._id)

  return (
    <div>
      <Card className="mx-auto w-full max-w-md overflow-hidden rounded-[28px] border-0 bg-[#f8f8f8] shadow-md max-h-80 overflow-y-auto">
        {/* Top Gradient Line */}
        <div className="h-1 w-full bg-linear-to-r from-violet-500 via-sky-400 to-green-400" />

        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="profile img"
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
              )}

              {/* User Details */}
              <div>
                <h2 className="text-xl font-bold text-black">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Room{" "}
                  {user.roomId?.roomNumber
                    ? user.roomId.roomNumber
                    : "Not Allocated"}{" "}
                  • {user.gender} • Age {user.age}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                user.isFeesPayed
                  ? "border-green-200 bg-green-100 text-green-700"
                  : "border-red-200 bg-red-100 text-red-500"
              }`}
            >
              {user.isFeesPayed ? "Paid" : "Unpaid"}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Divider */}
          <div className="mb-6 border-t border-gray-200" />

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-gray-100 p-4">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Email
                </p>

                <p className="text-lg font-medium text-black">
                  {user.emailId}
                </p>
              </div>
            </div>

            {/* Room */}
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-gray-100 p-4">
                <DoorClosed className="h-5 w-5 text-gray-500" />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Room
                </p>

                <p className="text-lg font-medium text-black">
                  {user.roomId?.roomNumber
                    ? `No. ${user.roomId.roomNumber}`
                    : "Room not Allocated"}
                </p>
              </div>
            </div>

            {/* Fees */}
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-red-50 p-4">
                <CreditCard className="h-5 w-5 text-red-500" />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Fees
                </p>

                <p
                  className={`text-lg font-semibold ${
                    user.isFeesPayed
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {user.isFeesPayed ? "Paid" : "Not Paid"}
                </p>
              </div>
            </div>

            {/* Mess Amount */}
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-gray-100 p-4">
                <ReceiptText className="h-5 w-5 text-gray-500" />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Mess Amount
                </p>

                <p className="text-lg font-medium text-black">
                  ₹{getMonthlyAmount?.data?.messPrice ?? 0}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
         
        </CardFooter>
      </Card>
    </div>
  )
}

export default UserProfileCard