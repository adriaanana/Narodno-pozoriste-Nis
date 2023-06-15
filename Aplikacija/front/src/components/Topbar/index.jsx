import routes from 'Routes';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'assets/Logo.jpg';
import { authKeys } from 'utils/constants/localStorageKeys';
import isAdmin from 'utils/helpers/isAdmin';

const Topbar = () => {
  const isLoged = localStorage.getItem(authKeys.id) || false;

  return (
    <Wrapper className="navbar navbar-expand navbar-light bg-light">
      <div className="container d-flex ">
        <NavLink
          aria-current="false"
          to={'/'}
          className="navbar-brand text-center "
        >
          <img
            width={190}
            height={80}
            src={Logo}
          />
        </NavLink>

        <div
          className=""
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink
                className="nav-link"
                to={routes.home.path}
              >
                Pocetna
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={routes.repertoar.path}
              >
                Repertoar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={routes.listaPredstava.path}
              >
                Lista predstava
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={routes.oPozoristu.path}
              >
                O pozoristu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={routes.kontakt.path}
              >
                Kontakt
              </NavLink>
            </li>

            {!isLoged && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={routes.logIn.path}
                  >
                    | Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={routes.registracija.path}
                  >
                    | Registracija
                  </NavLink>
                </li>
              </>
            )}

            {isLoged && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={routes.profile.path}
                  >
                    | {isAdmin() ? 'Admin panel' : 'Profil'}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <div
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      localStorage.clear();
                      location.pathname = routes.logIn.path;
                    }}
                  >
                    | Logout
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .navbar-brand {
    border-bottom: none !important;
  }

  [aria-current] {
    border-bottom: 2px solid brown;
    .logo {
      border-bottom: none;
    }
  }
`;

export default Topbar;
