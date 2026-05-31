

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetTotalPrice } from "@/hooks/MenuSelectionHooks/useGetTotalPrice"
import { useCreatePayment } from "@/hooks/PaymentHooks/useCreatePayment"
import { useVerifyPayment } from "@/hooks/PaymentHooks/useVerifyPayment"
import type { RazorpayPaymentResponse } from "@/types/paymentTypes"
import { useState } from "react"
import { toast } from "sonner"


function PaymentCard() {
  const [month, setMonth] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [showPay, setShowPay] = useState(false)
  const [paymentBlocked, setPaymentBlocked] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)

    const {mutate:fetchPrice,data} = useGetTotalPrice()
    const {mutateAsync:payment} = useCreatePayment()
  

    const monthNum = month ? Number(month) : null
    const yearNum = year ? Number(year) : null

    const {data:existingPayment,  refetch: verifyPayment } = useVerifyPayment(yearNum,monthNum,{
        enabled:false
    })
  



        const paymentCaptured = existingPayment?.payment?.some(
        (p) => p.status === "captured"
        ) ?? false

        console.log("paymentCaptured", paymentCaptured)


     const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ]

  const years = ["2024", "2025", "2026", "2027"]

  

  const isCurrentOrPastMonth = () => {
        const now = new Date()

        const currentMonth = now.getMonth() + 1
        const currentYear = now.getFullYear()

        const selectedMonth = Number(month)
        const selectedYear = Number(year)

        if (selectedYear < currentYear) return true

        if (
          selectedYear === currentYear &&
          selectedMonth < currentMonth
        ) {
          return true
        }

        return false
}

  const pollPaymentStatus = async () => {
  let attempts = 0;

  while (attempts < 6) {
    const res = await verifyPayment();

    const isCaptured = res?.data?.payment?.some(
      (p) => p.status === "captured"
    )

    if (isCaptured) {
      setCheckingPayment(false)
      setIsPaying(false)
      toast.success("Payment successful ")
      return;
    }

    attempts++;
    await new Promise((r) => setTimeout(r, 2000))
  }
  
  setCheckingPayment(false)
  setIsPaying(false)
  toast.error("Verification delayed. Please refresh.")
}

  const getAmount=()=>{

    if(!month || !year){
        return toast.error("select required fields")
    }
     setPaymentBlocked(false)
     setCheckingPayment(true)

    const payload={month:Number(month),year:Number(year)}

    fetchPrice(payload,{
        onSuccess:async()=>{
            setShowPay(true)
            const result = await verifyPayment()
            
            
            if (result.error) {

              setPaymentBlocked(true)
            }

            setCheckingPayment(false)

        },

        onError: () => {
          setCheckingPayment(false) 
        }
    })
  }


  const makePayment=async()=>{

    
    try{
         if (!data?.data) {
            console.error("Amount is missing");
            return;
        }
          
         if (!isCurrentOrPastMonth()) {
        return toast.error(
          "Payment is allowed only for current or completed months"
        )
    }

        
    const payload={amount:data.data.monthlyTotal,month:Number(month),year:Number(year)}
    const order = await payment(payload)
     const { key, amount, currency, orderId, notes } = order;

      const options = {
      key,
      amount,
      currency,
      name: "Hostel-Management",
      description: "Payment of rent",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: async (response: RazorpayPaymentResponse) => {
        console.log("Payment success:", response)
        toast.success("Payment processing...")
        pollPaymentStatus()

      },

       modal: {
        ondismiss: () => {
          setIsPaying(false);
        }
      }

    }

    const rzp = new window.Razorpay(options);
    rzp.open();

    }
    catch(err){
        console.log(err);
        
    }


  }


  return (
    <div>

        <Card  className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Select onValueChange={(value)=>{setMonth(value); setShowPay(false);setPaymentBlocked(false)}}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select Month" />
                        </SelectTrigger>
                        <SelectContent>
                        {months.map((m) => (
                            <SelectItem key={m.value} value={m.value}>
                            {m.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value)=>{setYear(value);setShowPay(false)}}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                        {years.map((y) => (
                            <SelectItem key={y} value={y}>
                            {y}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-3 ">
                {
                    !showPay&&(
                        <Button onClick={getAmount}>Get Amount</Button>

                    )
                }

                {
                    data && showPay &&(
                          <div>
                            <p>Mess Amount = {data.data.messPrice}</p>
                            <p>Total Amount = {data.data.monthlyTotal}</p>
                          </div>
                    )
                }
                {
                      checkingPayment  && !paymentCaptured && (
                        <p>Checking payment status...</p>
                      )                         
                }

                 {paymentBlocked && (
                    <p className="text-red-500 text-center">
                      You cannot make payments for months before your joining date.
                    </p>
                  )}


                {
                showPay  && paymentCaptured && (
                    <p className="text-green-600 font-medium">
                    Payment already completed ✅
                    </p>
                )
                }

                {
                showPay  && !paymentCaptured && !paymentBlocked  && !checkingPayment &&(
                    <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={makePayment}
                    >
                    {isPaying?"Processing":"Pay"}
                    </Button>
                )
                }
               
            </CardFooter>
        </Card>
    </div>
  )
}

export default PaymentCard