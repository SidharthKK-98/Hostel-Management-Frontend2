import {type PaymentOrder, type PaymentParams ,type PaymentResponse} from "@/types/paymentTypes";
import commonAPI from "./commonAPI";

export const createPayment=(payload:PaymentParams)=>{

    return commonAPI<PaymentOrder>("POST","payment/create",payload)
}

export const getVerifyPayment=(year: number, month: number)=>{
    return commonAPI<PaymentResponse>("GET",`payment/verify/${year}/${month}`)
}