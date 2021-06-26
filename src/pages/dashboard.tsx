import { error } from 'console';
import { useContext, useEffect } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { api } from './../services/api';

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