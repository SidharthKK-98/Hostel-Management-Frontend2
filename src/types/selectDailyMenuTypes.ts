
export interface OrderSelection {
    [menuId:string] : number
}

export interface Food {
  _id: string
  name: string
  price: number
  image?: string
}


export interface MealEntry{
    foodId:string | Food
    portion:number
}

export interface SelectedMealItem {
    _id:string
    foodId:Food
    portion:number
}

export interface DailyMenuSelectPayload {

    date:string
    morning:MealEntry[]
    noon:MealEntry[]
    night:MealEntry[]

}

export interface DailyMenuSelection {
    _id: string;            
  userId: string;         
  date: string;           
  morning: SelectedMealItem[];
  noon: SelectedMealItem[];
  night: SelectedMealItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FoodSelectionResponse {
    message:string
    data:DailyMenuSelection[]
}

export interface MenuHistoryCardProps  {
  item: DailyMenuSelection
}

export interface PopulatedMealItem {
  _id: string
  foodId: Food     
  portion: number
}

export interface PopulatedDailyMenuSelection {
  _id: string
  userId: string
  date: string
  morning: PopulatedMealItem[]
  noon: PopulatedMealItem[]
  night: PopulatedMealItem[]
  totalPrice: number
  createdAt: string
  updatedAt: string
  __v: number
}



export interface GetTotalPricePayload {
  year:number
  month:number
}

export interface GetTotalPriceResponse {
  message:string
  data:{
    messPrice:number
    monthlyTotal:number
  }
}

export interface DailyMenuData {

  _id:string
  totalPortion:number
  foodId:string
  name:string
  price:number

}

export interface DailyMenuDataResponse {
  message:string
  data:DailyMenuData[]
}

export interface DailyMenuDataProps {
    DailyMenuPortion?: DailyMenuDataResponse

}