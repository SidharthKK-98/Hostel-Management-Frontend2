export interface ComplaintPayload {
    category:string
    subject:string 
}

export type ComplaintStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" 

export type ComplaintCategory =
  | "MAINTENANCE"
  | "FOOD"
  | "ROOM"
  | "OTHER"

export interface UpdatedBy {
  _id:string
  firstName:string
}

export interface ComplaintTimelineEntry {
  _id: string;
  status: ComplaintStatus;
  message: string;
  updatedBy: UpdatedBy;      
  updatedAt: string;   
}

export interface Complaint {
  _id: string;
  createdBy: string;     
  category: ComplaintCategory;
  subject: string;
  status: ComplaintStatus;
  timeline: ComplaintTimelineEntry[];
  createdAt: string;      
  updatedAt: string;      
  __v: number;
}

export interface PostComplaintResponse {

    message:string
    data:Complaint

}

export interface RoomInfo {
  _id: string;
  roomNumber: number;
}

export interface ComplaintUser {
  _id:string
  firstName:string
  lastName:string
  emailId:string
  roomId:RoomInfo
}

export interface GetComplaint {
  _id: string;
  createdBy: ComplaintUser;   
  category: ComplaintCategory;
  subject: string;
  status: ComplaintStatus;
  timeline: ComplaintTimelineEntry[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetComplaintsResponse {
  message: string;
  data: GetComplaint[];
}

