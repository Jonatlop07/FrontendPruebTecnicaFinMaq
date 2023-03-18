import UserDetails from './user-details'

export interface ApiResponse {
  success: boolean
  httpStatus: string
  httpStatusCode: number
  message: string
}

export interface UserQueryResponse {
  api_response: ApiResponse
  user_by_id: UserDetails
  user_by_email: UserDetails
  users_by_name: Array<UserDetails>
}
