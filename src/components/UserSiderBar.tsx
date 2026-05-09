import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useLogout } from "@/hooks/authHooks/useLogout"
import { useGetProfile } from "@/hooks/ProfileHooks/useGetProfile"

import {
  CalendarCheck,
  ClipboardMinus,
  LayoutDashboard,
  LogOut,
  MessageSquarePlus,
  UtensilsCrossed,
} from "lucide-react"

type userSideBarButton = {
  id: number
  name: string
  route: string
  icon: React.ReactNode
}

function UserSiderBar() {
  const [activeButton, setActiveButon] = useState(1)

  const { mutate: Logout, isPending } = useLogout()

  const { data: viewProfile } = useGetProfile()

  const ButtonArray: userSideBarButton[] = [
    {
      id: 1,
      name: "User Dashboard",
      route: "/user",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },

    {
      id: 2,
      name: "Select Daily Menu",
      route: "/user/selectDailyMenu",
      icon: <UtensilsCrossed className="h-5 w-5" />,
    },

    {
      id: 3,
      name: "Menu Overview",
      route: "/user/menuOverview",
      icon: <CalendarCheck className="h-5 w-5" />,
    },

    {
      id: 4,
      name: "Complaints",
      route: "/user/complaint",
      icon: <ClipboardMinus className="h-5 w-5" />,
    },

    {
      id: 5,
      name: "Add Review",
      route: "/user/comment",
      icon: <MessageSquarePlus className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex h-full flex-col bg-[#f8f8f8] p-5 shadow-md">
      {/* User Header */}
      <div className="mb-10 flex items-center gap-4">
        {viewProfile?.photoUrl ? (
          <img
            src={viewProfile?.photoUrl}
            alt="profileImg"
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-xl font-bold text-violet-600">
            {viewProfile?.firstName?.[0]}
          </div>
        )}

        <div>
          <h1 className="text-xl font-bold text-black">
            Welcome {viewProfile?.firstName}
          </h1>

          <p className="text-sm text-gray-400">
            Hostel resident panel
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="mb-3 px-3 text-sm font-bold tracking-widest text-gray-400">
          MENU
        </h2>

        <div className="space-y-2">
          {ButtonArray.map((item) => (
            <NavLink key={item.id} to={item.route}>
              <Button
                onClick={() => setActiveButon(item.id)}
                className={`flex h-14 w-full items-center justify-start gap-4 rounded-2xl border border-gray-200 px-5 text-base font-semibold shadow-none transition-all ${
                  activeButton === item.id
                    ? "bg-white text-violet-600 hover:bg-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Button>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <Button
          onClick={() => Logout()}
          disabled={isPending}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-black text-base font-semibold text-white hover:bg-black"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default UserSiderBar