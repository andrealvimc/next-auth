
type User = {
  permissions: string[];
  roles: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({ user, permissions, roles }: ValidateUserPermissionsParams) {


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