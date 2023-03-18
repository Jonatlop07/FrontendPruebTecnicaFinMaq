import UserPhoneDetails from './user-phone-details'

export default interface UserDetails {
  id: string
  name: string
  email: string
  phones: Array<UserPhoneDetails>
}
