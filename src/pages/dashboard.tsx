import { useContext, useEffect } from 'react';

import { setupAPIClient } from '../services/api';
import { AuthContext } from './../contexts/AuthContext';
import { api } from './../services/apiClient';
import { withSSRAuth } from './../utils/withSSRAuth';

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('me').then((response) => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [])

  return (
    <h1>Dashboard: {user?.email}</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');

  console.log(response.data)

  return {
    props: {}
  }
});