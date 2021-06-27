import { useContext } from 'react';
import { AuthContext } from './../contexts/AuthContext';

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }


  if (roles?.length > 0) {
    // check is the user has any of these roles
    const hasRoles = roles.some(role => {
      return user.roles.includes(role);
    });

    if (!hasRoles) {
      return false;
    }
  }

  return true;

}