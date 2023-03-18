import UserDetails from './user-details'
import { Nullable } from './nullable'

export default interface UserQueryDetails {
  user_by_id: Nullable<UserDetails>,
  user_by_email: Nullable<UserDetails>,
  users_by_name: Array<UserDetails>
}
