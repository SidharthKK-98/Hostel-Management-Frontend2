import { useGetProfile } from "@/hooks/ProfileHooks/useGetProfile"
import ProfileCard from "../Cards/ProfileCard"
import { useState } from "react"
import EditProfileCard from "../Cards/EditProfileCard"
import StatCard from "../Cards/StatCard"
import { useGetSummary } from "@/hooks/HostelConfigureHooks/useGetSummary"
import { useGetAllUnresolvedComplaints } from "@/hooks/ComplaintHooks/useGetAllUnresolvedComplaints"
import { useGetDailyMenu } from "@/hooks/DailyMenuItemsHooks/useGetDailyMenu"
import { getTomorrow } from "@/utils/getTomorrow"
import RentCard from "../Cards/RentCard"

function AdminHome() {

  
      const [isEdit,setIsEdit] = useState<boolean>(false)

      const {data:viewProfile} =useGetProfile()
      const fromAdmin:boolean = true
      const {data:RoomSummary} =useGetSummary()
      const {data:complaint}= useGetAllUnresolvedComplaints()
      const occupiedRoom:number = (RoomSummary?.fullRooms?? 0) + (RoomSummary?.partiallyOccupiedRooms?? 0)
      const {data:dailyMenu} = useGetDailyMenu()

      const isTomorrow = dailyMenu?.data?.some(menu => getTomorrow(menu.date)) ?? false

      
  return (
    <div className="p-4">
        <h1 className="text-center font-semibold text-2xl p-2"> Profile</h1>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Rooms" value={RoomSummary?.totalRooms} sub={` Occupied Rooms : ${occupiedRoom} / vaccant : ${RoomSummary?.emptyRooms} Rooms`} />
                <StatCard title="Residents" value={RoomSummary?.totalOccupants} sub="Active Users" />
                <StatCard title="Complaints " value={complaint?.data?.length} sub="Pending" />
                <StatCard title="Tomorrow Menu Status" value={`${isTomorrow ? " Published" : "Not Published"}`} danger />
          </div>
          <div className="m-2 my-4 lg:grid grid-cols-3 gap-4 ">

            <div>
              <ProfileCard viewProfile={viewProfile} setIsEdit={setIsEdit} fromAdmin={fromAdmin}/>
            </div>

            <div>
              {
                isEdit && (
                  <EditProfileCard setIsEdit={setIsEdit}/>
                )
              }
            </div>

            <div>
              <RentCard/>
            </div>

            <div>
              <h1 className="font-semibold text-xl">Quick Actions</h1>
            </div>
        </div>

    </div>
  )
}

export default AdminHome