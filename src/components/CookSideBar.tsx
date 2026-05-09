import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/authHooks/useLogout"

import {
  CalendarDays,
  Home,
  LogOut,
  ChefHat,
} from "lucide-react"

import { useState } from "react"
import { NavLink } from "react-router-dom"

type sideBarButton = {
  id: number
  name: string
  route: string
  icon: React.ReactNode
}

function CookSideBar() {
  const [activeButton, setActiveButon] = useState(1)

  const { mutate: Logout, isPending } = useLogout()

  const ButtonArray: sideBarButton[] = [
    {
      id: 1,
      name: "Home",
      route: "/cook",
      icon: <Home className="h-5 w-5" />,
    },

    {
      id: 2,
      name: "View Daily Menu",
      route: "/cook/viewDailyMenu",
      icon: <CalendarDays className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex h-full flex-col bg-[#f8f8f8] p-5 shadow-md">
      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
          <ChefHat className="h-7 w-7 text-orange-500" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-black">
            Cook Panel
          </h1>

          <p className="text-sm text-gray-400">
            Kitchen management
          </p>
        </div>
      </div>

      {/* Navigation */}
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
                    ? "bg-white text-orange-500 hover:bg-white"
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

export default CookSideBar