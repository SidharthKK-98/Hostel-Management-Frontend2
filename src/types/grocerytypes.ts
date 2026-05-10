
export interface AddGroceryParams {
    name:string
    unit:string
    addingStock:number
}

export interface RestoreGroceryParam {
    name:string
    unit:string
    restoringAmount:number
}

export interface TakeGroceryParam {
    groceryId:string
    qty:number
    unit:string

}

export interface UpdateGroceryParam {
    _id:string
    name?:string
    unit?:string
    minStock?:number

}

export interface RemoveGreceryParam {
    _id:string
}

export interface Grocery {
  _id: string
  name: string
  unit: string
  lastAddedStock: number
  currentStock: number
  minStock: number
  predictedOutDate?: string | null
  createdAt: string
  updatedAt: string
}

export interface GroceryResponse {
    message:string
    data:Grocery
}

export interface GetGroceryResponse {
    message:string
    data:Grocery[]

}