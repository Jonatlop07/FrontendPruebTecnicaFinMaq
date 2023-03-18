import React from 'react'
import UserDetailsTable from './user-details-table'
import UserQueryDetails from '../types/user-query-details'

const UserQueryResults: React.FC<{ query_results: UserQueryDetails }> = ({ query_results }) => {
  const { user_by_id, user_by_email, users_by_name } = query_results
  const renderUserDetailsById = () => {
    if (user_by_id) {
      return <UserDetailsTable title={'Resultados por ID'} users={[user_by_id]}/>
    }
  }
  const renderUserDetailsByEmail = () => {
    if (user_by_email) {
      return <UserDetailsTable title={'Resultados por correo:'} users={[user_by_email]}/>
    }
  }

  const renderUserDetailsByName = () => {
    if (users_by_name && users_by_name.length > 0) {
      return <UserDetailsTable title={'Resultados por nombre:'} users={users_by_name}/>
    }
  }
  return (
    <section>
      {renderUserDetailsById()}
      {renderUserDetailsByEmail()}
      {renderUserDetailsByName()}
    </section>
  )
}

export default UserQueryResults
