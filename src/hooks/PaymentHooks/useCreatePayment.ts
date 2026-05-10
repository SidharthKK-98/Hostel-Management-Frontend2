
import { useMutation } from "@tanstack/react-query";
import type { PaymentOrder, PaymentParams, } from "@/types/paymentTypes";
import { createPayment } from "@/apis/PaymentAPIs";

export const useCreatePayment = () => {
  return useMutation<PaymentOrder, Error, PaymentParams>({
    mutationFn: createPayment,

    onSuccess: (data) => {
      console.log("Payment order created:", data);
    },

    onError: (error) => {
      console.error("Payment creation failed:", error.message);
    },
  });
};