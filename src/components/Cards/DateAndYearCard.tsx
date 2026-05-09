import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useGetTotalPrice } from "@/hooks/MenuSelectionHooks/useGetTotalPrice"

function DateAndYearAccordion() {
  const currentYear = new Date().getFullYear()

  const [year, setYear] = useState<number>(currentYear)
  const [month, setMonth] = useState<string>("")

  const {mutate:fetchTotalPrice,data} = useGetTotalPrice()
  

  const handleSubmit = () => {
    if (!month || !year) return alert("Please select month and year")
     
    const payload = { month:Number(month), year }
   fetchTotalPrice(payload)
  }
  

  return (
    <div className="mx-auto w-full max-w-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="date-selection" className="border rounded-xl px-4">
          <AccordionTrigger className="text-base font-semibold">
            Get Total Amount of the Month
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-4">
            {/* Month */}
            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">January</SelectItem>
                  <SelectItem value="02">February</SelectItem>
                  <SelectItem value="03">March</SelectItem>
                  <SelectItem value="04">April</SelectItem>
                  <SelectItem value="05">May</SelectItem>
                  <SelectItem value="06">June</SelectItem>
                  <SelectItem value="07">July</SelectItem>
                  <SelectItem value="08">August</SelectItem>
                  <SelectItem value="09">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min={2000}
                max={2100}
              />
            </div>

            <div className="font-semibold">
              {
                data?.data && (
                  `Total Amount : RS ${data?.data?.messPrice}`
                )
              }
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Get Amount
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default DateAndYearAccordion
