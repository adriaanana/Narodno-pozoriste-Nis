import Login from 'pages/Auth/Login';
import Registracija from 'pages/Auth/Registracija';
import Home from 'pages/Home';
import Kontakt from 'pages/Kontakt';
import ListaPozorista from 'pages/ListaPredstava';
import NovaPredstava from 'pages/NovaPredstava';
import OPozoristu from 'pages/OPozoristu';
import Predstava from 'pages/Predstava';
import Profil from 'pages/Profil';
import Repertoar from 'pages/Repertoar';
import Rezervacija from 'pages/Rezervacija';
// All routes need to have: a "path" and "component" property !
// Also can have a property "name" which are optional.
// Can have subRoutes
const routes = {
  home: {
    path: '/',
    component: Home,
    name: 'Home',
    // Can have same keys as main route (path , component, name, icon and so on)
    // subRoutes: {},
  },
  repertoar: {
    path: '/repertoar',
    component: Repertoar,
    name: 'Repertoar',
    // Can have same keys as main route (path , component, name, icon and so on)
    // subRoutes: {},
    subRoutes: {
      rezervacija: {
        path: '/repertoar/rezervacija',
        component: Rezervacija,
        name: 'Rezervacija',
      },
    },
  },
  listaPredstava: {
    path: '/lista-predstava',
    component: ListaPozorista,
    name: 'Repertoar',
    // Can have same keys as main route (path , component, name, icon and so on)
    // subRoutes: {},
  },
  oPozoristu: {
    path: '/o-pozoristu',
    component: OPozoristu,
    name: 'Repertoar',
    // Can have same keys as main route (path , component, name, icon and so on)
    // subRoutes: {},
  },
  kontakt: {
    path: '/kontakt',
    component: Kontakt,
    name: 'Repertoar',
    // Can have same keys as main route (path , component, name, icon and so on)
    // subRoutes: {},
  },
  profile: {
    path: '/profil',
    component: Profil,
    name: 'Profil',
  },
  novaPredstava: {
    path: '/nova-predstava',
    component: NovaPredstava,
    name: 'Nova Predstava',
  },
  predstava: {
    path: '/predstava',
    component: Predstava,
    name: 'Predstava',
  },

  // Auth Pages
  logIn: {
    path: '/auth/login',
    component: Login,
    name: 'LogIn',
    notInMainMenu: true,
  },
  // Auth Pages
  registracija: {
    path: '/auth/registracija',
    component: Registracija,
    name: 'LogIn',
    notInMainMenu: true,
  },
};

export default routes;

// Find specific route by pathname - can using when we have subitems
export const findRoute = (pathname) => {
  let route = null;
  route = getRoutesAsArray().find((route) => route.path === pathname);

  return route || null;
};

// Transform routes object to an array for mapping ans similar function using on array
export const getRoutesAsArray = () => {
  const routesArr = [];

  Object.keys(routes).map((key) => {
    const route = routes[key];
    routesArr.push(route);

    if (route.subRoutes) {
      Object.keys(route.subRoutes).map((subKey) => {
        routesArr.push(route.subRoutes[subKey]);
      });
    }
  });

  return routesArr;
};
