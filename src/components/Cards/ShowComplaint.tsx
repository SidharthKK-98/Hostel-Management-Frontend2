import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle } from "lucide-react"
import type { ComplaintStatus, GetComplaint } from "@/Types/complaintTypes"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner"
import { useUpdateComplaintStatus } from "@/hooks/ComplaintHooks/useUpdateComplaintStatus"

interface ShowComplaintProps {
  complaint: GetComplaint
  fromUser: boolean
}

function ShowComplaint({ complaint,fromUser }: ShowComplaintProps) {

    const {mutate:updateStatus} = useUpdateComplaintStatus()


  const complaintProgressMap: Record<ComplaintStatus, number> = {
    OPEN: 20,
    IN_PROGRESS: 60,
    RESOLVED: 100,
  }

  const progressColorMap: Record<ComplaintStatus, string> = {
    OPEN: "[&>div]:bg-red-500",
    IN_PROGRESS: "[&>div]:bg-yellow-500",
    RESOLVED: "[&>div]:bg-green-600",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, "0")

    const month = date.toLocaleString("default", {
      month: "short",
    })

    return `${day} ${month}`
  }

  const getStatusStyle = () => {
    switch (complaint.status) {
      case "OPEN":
        return "bg-red-50 text-red-500 border border-red-200"

      case "IN_PROGRESS":
        return "bg-yellow-50 text-yellow-600 border border-yellow-200"

      case "RESOLVED":
        return "bg-green-50 text-green-600 border border-green-200"

      default:
        return "bg-gray-50 text-gray-500 border border-gray-200"
    }
  }

  const handleUpdateComplaint=(complaintId:string)=>{

    if(complaint.status == "OPEN" && fromUser){
        toast.error("You can't update a OPEN status complaint")
        return
    }

    updateStatus(complaintId)

}

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-sm rounded-3xl border-0 bg-[#f8f8f8] shadow-sm p-2">
        <CardContent className="p-5 space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-black">
                Room Complaint
              </h2>
            </div>

            <div
              className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle()}`}
            >
              {complaint.status === "OPEN"
                ? "Open"
                : complaint.status === "IN_PROGRESS"
                ? "In Progress"
                : "Resolved"}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-3">

            <div className="bg-[#efefef] rounded-2xl p-3">
              <p className="text-[11px] text-gray-400 uppercase font-semibold">
                Resident
              </p>

              <h3 className="font-bold text-gray-800 text-base">
                {complaint.createdBy.firstName}
              </h3>
            </div>

            <div className="bg-[#efefef] rounded-2xl p-3">
              <p className="text-[11px] text-gray-400 uppercase font-semibold">
                Room No.
              </p>

              <h3 className="font-bold text-gray-800 text-base">
                {complaint.createdBy.roomId.roomNumber}
              </h3>
            </div>

            <div className="bg-[#efefef] rounded-2xl p-3">
              <p className="text-[11px] text-gray-400 uppercase font-semibold">
                Date
              </p>

              <h3 className="font-bold text-gray-800 text-base">
                {formatDate(complaint.createdAt)}
              </h3>
            </div>

          </div>

          {/* Issue Box */}
          <div className="bg-[#efefef] rounded-2xl p-4 flex gap-3 items-start">

            <div className="mt-1">
              <AlertTriangle className="w-5 h-5 text-yellow-500 fill-yellow-400" />
            </div>

            <div>
              <p className="text-xs uppercase font-semibold text-gray-400">
                Issue
              </p>

              <h3 className="font-bold text-gray-800 text-xl leading-6">
                {complaint.subject}
              </h3>
            </div>

          </div>

          {/* Progress */}
          <div className="space-y-3">

            <h3 className="text-gray-500 font-semibold">
              Progress
            </h3>

            <Progress
              value={complaintProgressMap[complaint.status]}
              className={`h-2 bg-gray-200 ${progressColorMap[complaint.status]}`}
            />

            <div className="flex justify-between text-xs font-semibold">

              <span
                className={
                  complaint.status === "OPEN"
                    ? "text-red-500"
                    : "text-gray-300"
                }
              >
                Opened
              </span>

              <span
                className={
                  complaint.status === "IN_PROGRESS"
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              >
                In Progress
              </span>

              <span
                className={
                  complaint.status === "RESOLVED"
                    ? "text-green-600"
                    : "text-gray-300"
                }
              >
                Resolved
              </span>

            </div>
          </div>

          {/* Timeline */}
<div className="border-t pt-5">

  <Accordion
    type="single"
    collapsible
    className="w-full"
  >
    <AccordionItem
      value="timeline"
      className="border-none"
    >

      <AccordionTrigger className="hover:no-underline py-0">
        <h3 className="text-gray-400 uppercase font-bold text-sm">
          Timeline
        </h3>
      </AccordionTrigger>

      <AccordionContent className="pt-5">

        <div className="space-y-5">

          {complaint.timeline.map((time) => (
            <div
              key={time._id}
              className="flex gap-3"
            >

              <div className="w-3 h-3 rounded-full bg-red-500 mt-2 shrink-0" />

              <div>
                <h4 className="font-semibold text-gray-700">
                  {time.message}
                </h4>

                <p className="text-sm text-gray-400">
                  By {time.updatedBy?.firstName} •{" "}
                  {formatDate(time.updatedAt)}
                </p>
              </div>

            </div>
          ))}

        </div>

      </AccordionContent>

    </AccordionItem>
  </Accordion>

</div>

          {/* Button */}
          {
            complaint.status !== "RESOLVED" &&(
                 <Button
                    className="w-full rounded-2xl h-14 text-base font-bold bg-black hover:bg-black/90"
                    onClick={()=>handleUpdateComplaint(complaint._id)}
                >
                    Take Action
          </Button>
            )
          }
         

        </CardContent>
      </Card>
    </div>
  )
}

export default ShowComplaint