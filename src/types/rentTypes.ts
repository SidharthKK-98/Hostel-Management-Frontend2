
export interface RentResponse {
  message: string;
  data: {
    _id: string;
    rent: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface RentPayload{
    rent:number
}