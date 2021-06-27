import { useContext, useEffect } from 'react';

import { setupAPIClient } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
import { Can } from './../components/Can';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('me').then((response) => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sair</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
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