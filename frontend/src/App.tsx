import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { NewUserForm } from './lib/components/newUserForm';

interface IUser {
  id: string;
  name: string;
}

export const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

function App() {

  const { data, loading } = useQuery<{ users: IUser[]}>(GET_USER);

  if ( loading) {
    return <p>Carregando...</p>
  }
  
  return (
    <>
      <ul>
        { data?.users.map( user  => <li key={user.id}>{user.name}</li> ) }
      </ul>
      <NewUserForm />
    </>

  )
}

export default App
