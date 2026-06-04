export interface Notification  {
  _id: string;
  message: string;
  itemId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotificationsResponse  {
  message: string;
  data: Notification[];
}



export interface DeleteNotificationResponse {
  message: string;
  data: Notification;
}