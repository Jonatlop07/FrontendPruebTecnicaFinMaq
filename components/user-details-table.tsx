import React from 'react'
import UserDetails from '../types/user-details'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const UserDetailsTable: React.FC<{ title: string, users: Array<UserDetails> }> = ({ title, users }) => {
  return (
    <>
      <h2>{title}</h2>
      <TableContainer sx={{ minWidth: 650, bgcolor: '#121212', margin: '2rem 0' }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#000', '&:last-child td, &:last-child th': { color: '#fff', borderColor: '#000' } } }>
              <TableCell>Identificador</TableCell>
              <TableCell align="right">Correo electrónico</TableCell>
              <TableCell align="right">Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(
              ({ id, email, name }, key) =>
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0, color: '#fff', borderColor: '#000' } }}
                >
                  <TableCell>{id}</TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">{name}</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserDetailsTable
