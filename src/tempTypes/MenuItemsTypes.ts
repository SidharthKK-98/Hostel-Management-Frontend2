
export interface AddFoodItemsParams {
    name:string,
    price:number,
    foodImg:File
}

export interface FoodItem {
  _id: string
  name: string
  image: string
  publicId: string
  price: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface SaveFoodItemResponse  {
  message: string
  data: FoodItem
}

export interface FoodMenuResponse {
  message:string
  foodMenu:FoodItem[]
}

export interface UpdateFoodItemsParams {
  id: string
  name?: string
  price?: number | null
  foodImg?: File | null
}

export interface FoodItemCardProps  {
  foodItem: FoodItem
  setUpdatingFoodId:React.Dispatch<React.SetStateAction<string | null>>
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AddFoodItemCardProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
  setUpdatingFoodId:React.Dispatch<React.SetStateAction<boolean>>
  isUpdating: boolean
  updatingFoodId: string | null
}