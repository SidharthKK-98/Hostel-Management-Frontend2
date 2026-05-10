
export interface Comment {
  _id: string
  user: string
  rating: number
  comment: string
  image: string | null
  publicId: string | null
  isEdited: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface AddCommentResponse {
  message: string
  data: Comment
}

export interface AddCommentPayload {
    rating:number
    comment:string
    image?:File
}

export interface GetComment {
  _id: string

  user: {
    _id: string
    firstName: string
    lastName: string
    photoUrl:string
  }

  rating: number
  comment: string

  image: string | null
  publicId: string | null

  isEdited: boolean

  createdAt: string
  updatedAt: string

  __v: number
}

export interface GetCommentsResponse {
  message: string
  data: GetComment[]
}

export interface EditCommentsPayload {
  commentId: string
  rating?: number
  comment?: string
  file?: File | null
}