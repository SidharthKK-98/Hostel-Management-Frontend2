import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import type { DatePickerProps } from "@/types/dailyMenuTypes"
import { toast } from "sonner"


function DatePicker({selectedDate,setSelectedDate}:DatePickerProps) {

        const [open, setOpen] = useState(false)

        const today = new Date()
        today.setHours(0,0,0,0)

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate()+1)


  return (
    <div>
             <div className="flex flex-col gap-3">
     
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
                if (!date) return 

              const picked = new Date(date)
              picked.setHours(0,0,0,0)

              if(picked<tomorrow){
                toast.error("You can only select Tomorrow's menu")
                return
              }
              setSelectedDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
    </div>
  )
}

export default DatePicker