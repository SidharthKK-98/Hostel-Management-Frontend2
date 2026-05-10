import type { FoodItem } from "./MenuItemsTypes"

export interface DatePickerProps {
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export interface SelectedMenu  {
  morning: FoodItem[]
  noon: FoodItem[]
  night: FoodItem[]
}

export interface DailyMenuProps {
  date:string
  morning:string[]
  noon:string[]
  night:string[]
}


export interface AddDailyMenuResponse {
  message:string
  data:DailyMenuProps
}
export type MealType = "morning" | "noon" | "night"

export interface DailyMenuItemCardProps {
  item:FoodItem
  selectedMeals:{
    morning:boolean
    noon:boolean
    night:boolean
  }
  onChange:(meal:MealType,value:boolean)=>void
}

export interface AddDailyMenuTempCardProps {
    selectedDate:Date
    selectedMenu:SelectedMenu
    onSuccessAdd: ()=>void


}

export interface GetDailyMenuResponse {
   _id: string
  date: string            
  morning: FoodItem[]
  noon: FoodItem[]
  night: FoodItem[]
  isLocked: boolean
  expiresAt: string       
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DailyMenu  {
  message: string
  data: GetDailyMenuResponse[]
} 

export interface DailyMenuCardProps  {
  menu: GetDailyMenuResponse
}

export interface DailyTotalFoodSelection {
  id:string
  totalPortion:number
  foodId:string
  name:string
  price:number
}

export interface SelectedFoodResponse {
  message:string
  data:DailyTotalFoodSelection[]
}

