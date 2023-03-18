import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import UserQuery from '../types/user-query'
import UserQueryDetails from '../types/user-query-details'
import UserQueryResults from '../components/user-query-results'
import { ApiResponse, UserQueryResponse } from '../types/user-query-response'
import axios from 'axios'
import Loading from '../components/loading'
import ErrorFallback from '../components/error-boundary'
import { Button, TextField } from '@mui/material'
import NavBar from '../components/app-bar'

export default function Home() {
  const [filter_params, setFilterParams] = useState<UserQuery>({
    id: '',
    email: '',
    name: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [users_details, setUsersDetails] = useState<UserQueryDetails>({
    user_by_id: null,
    user_by_email: null,
    users_by_name: []
  });
  const isValidEmail = () => {
    const regExp: RegExp = /^([_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,}))?$/
    return regExp.test(filter_params.email)
  }
  const [error, setError] = useState<string>(null);
  const queryUserRequest = () => {
    return axios.get(
      'http://localhost:8090/api/v1/user',
      {
        params: {
          id: filter_params.id,
          email: filter_params.email,
          name: filter_params.name,
        }
      }
    );
  }

  useEffect(() => {
    if (!submitting) {
      setSubmitting(false)
      return
    }
    if (!isValidEmail()) {
      setError(`A ingresar un correo procure que tenga el formato válido.`)
      setSubmitting(false)
      return
    }
    queryUserRequest()
      .then((response) => {
        const { user_by_id, user_by_email, users_by_name }: UserQueryResponse = response.data
        setUsersDetails((_) => ({
          user_by_id,
          user_by_email,
          users_by_name
        }))
      })
      .catch((error) => {
        const api_response: ApiResponse = error.response.data.api_response;
        setError(`Error: ${api_response.message} (${api_response.httpStatusCode}-${api_response.httpStatus})`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }, [submitting])

  const updateFilterParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prev_state: UserQuery) => {
      const attribute_name = e.target.name
      return {
        ...prev_state,
        [attribute_name]: e.target.value
      }
    })
  }

  return (
    <>
      <Head>
        <title>FinMaq Prueba Técnica</title>
        <meta name="description" content="Cliente web para la prueba técnica de FinMaq" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar/>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 style={{ margin: '2rem 0' }}>Consulta de Usuarios</h1>
          <div>
            <div>
              <TextField
                id="standard-helperText"
                label="Identificador"
                value={filter_params.id}
                name={'id'}
                type={'text'}
                onChange={updateFilterParam}
                helperText="Id en formato UUID"
                variant="standard"
                style={{ margin: '1rem 0' }}
              />
            </div>
            <div>
              <TextField
                id="standard-helperText"
                label="Correo electrónico"
                value={filter_params.email}
                name={'email'}
                type={'email'}
                helperText="Ejemplo: test_email1@test.com"
                variant="standard"
                onChange={updateFilterParam}
                style={{ margin: '1rem 0' }}
                pattern="/^([_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,}))?$/"
              />
            </div>
            <div>
              <TextField
                id="standard-helperText"
                label="Nombre"
                value={filter_params.name}
                name={'name'}
                type={'text'}
                helperText=""
                variant="standard"
                onChange={updateFilterParam}
                style={{ margin: '1rem 0' }}
              />
            </div>
            <div style={{margin: '2rem 0'}}>
              <Button variant="contained" onClick={() => setSubmitting(true)}>Enviar</Button>
            </div>
          </div>
          {submitting ? <Loading/> : <UserQueryResults query_results={users_details}/>}
          {error && <ErrorFallback error={error} resetErrorBoundary={() => {setError(null)}}/>}
        </div>
        <footer style={{ textAlign: 'center', backgroundColor: '#0e142f', width: '100%', padding: '2rem', margin: '0' }}>
          <strong>Número de celular: </strong>(+57) 304 614 4361<br/><br/>
          <strong>Correo electrónico: </strong> jonatlop@gmail.com - jolopezca@unal.edu.co
          <br/>
          <br/>
          <div>
            <a
              className={styles.social_link}
              href="https://github.com/Jonatlop07"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a> - <a
              className={styles.social_link}
              href="https://www.linkedin.com/in/jonathan-lópez-castellanos-9208441a2"
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
          </div>
          <br/>
          Contenido bajo Licencia de Dominio Público (CC0) | © 2023 Jonathan López Castellanos. Todos los derechos reservados.
        </footer>
      </main>
    </>
  )
}
