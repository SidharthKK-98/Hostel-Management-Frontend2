import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/authHooks/useLogout"
import {
  CalendarDays,
  CirclePlus,
  ClipboardMinus,
  DoorClosed,
  House,
  ShoppingCart,
  Users,
  Building2,
  LogOut,
} from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

type sideBarButton = {
  id: number
  name: string
  route: string
  section: string
  icon: React.ReactNode
}

function SideBar() {
  const [activeButton, setActiveButon] = useState(1)

  const { mutate: Logout, isPending } = useLogout()

  const ButtonArray: sideBarButton[] = [
    {
      id: 1,
      name: "Home",
      route: "/admin",
      section: "MAIN",
      icon: <House className="h-5 w-5" />,
    },

    {
      id: 2,
      name: "Users",
      route: "/admin/users",
      section: "MAIN",
      icon: <Users className="h-5 w-5" />,
    },

    {
      id: 3,
      name: "Rooms",
      route: "/admin/room",
      section: "MAIN",
      icon: <DoorClosed className="h-5 w-5" />,
    },

    {
      id: 4,
      name: "Add Menu",
      route: "/admin/addMenu",
      section: "FOOD",
      icon: <CirclePlus className="h-5 w-5" />,
    },

    {
      id: 5,
      name: "Daily Menu",
      route: "/admin/add-Daily-Menu",
      section: "FOOD",
      icon: <CalendarDays className="h-5 w-5" />,
    },

    {
      id: 7,
      name: "Add Groceries",
      route: "/admin/addGroceries",
      section: "FOOD",
      icon: <ShoppingCart className="h-5 w-5" />,
    },

    {
      id: 6,
      name: "Complaints",
      route: "/admin/complaints",
      section: "SUPPORT",
      icon: <ClipboardMinus className="h-5 w-5" />,
    },
  ]

  const mainItems = ButtonArray.filter(
    (item) => item.section === "MAIN"
  )

  const foodItems = ButtonArray.filter(
    (item) => item.section === "FOOD"
  )

  const supportItems = ButtonArray.filter(
    (item) => item.section === "SUPPORT"
  )

  return (
    <div className="flex h-full flex-col bg-[#f8f8f8] p-5 shadow-md">
      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
          <Building2 className="h-7 w-7 text-violet-600" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-black">
            Hostel Admin
          </h1>

          <p className="text-sm text-gray-400">
            Management panel
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="mb-8">
        <h2 className="mb-3 px-3 text-sm font-bold tracking-widest text-gray-400">
          MAIN
        </h2>

        <div className="space-y-2">
          {mainItems.map((item) => (
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

      {/* FOOD */}
      <div className="mb-8">
        <h2 className="mb-3 px-3 text-sm font-bold tracking-widest text-gray-400">
          FOOD
        </h2>

        <div className="space-y-2">
          {foodItems.map((item) => (
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

      {/* SUPPORT */}
      <div className="mb-8">
        <h2 className="mb-3 px-3 text-sm font-bold tracking-widest text-gray-400">
          SUPPORT
        </h2>

        <div className="space-y-2">
          {supportItems.map((item) => (
            <NavLink key={item.id} to={item.route}>
              <Button
                onClick={() => setActiveButon(item.id)}
                className={`flex h-14 w-full items-center justify-between rounded-2xl border border-gray-200 px-5 text-base font-semibold shadow-none transition-all ${
                  activeButton === item.id
                    ? "bg-white text-violet-600 hover:bg-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  {item.name}
                </div>

                
              </Button>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-2">
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

export default SideBar