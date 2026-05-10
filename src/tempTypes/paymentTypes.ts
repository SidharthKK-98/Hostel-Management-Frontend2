export interface PaymentParams {
    amount:number
    month:number
    year:number
}

export interface PaymentOrder {
  key: string
  userId: string
  amount: number
  currency: string
  status: string
  orderId: string
  receipt: string

  notes: {
    firstName: string
    lastName: string
  };

  month: number
  year: number

  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
}

export interface Payment  {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  orderId: string;
  receipt: string;
  month: number;
  year: number;
  notes: {
    firstName: string;
    lastName: string;
  };
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

export interface PaymentResponse  {
  success: boolean;
  payment: Payment[];
}