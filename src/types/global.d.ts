import type { RazorpayOptions } from "./paymentTypes";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export {};