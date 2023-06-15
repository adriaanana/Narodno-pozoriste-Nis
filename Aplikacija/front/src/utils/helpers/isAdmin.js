import { authKeys, roles } from 'utils/constants/localStorageKeys';

const isAdmin = () => {
  const rola = localStorage.getItem(authKeys.rola) || null;

  return rola === roles.admin ? true : false;
};

export default isAdmin;
