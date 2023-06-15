import { loginApi } from 'api/calls';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authKeys, roles } from 'utils/constants/localStorageKeys';

const Login = () => {
  const [formData, setFormData] = useState({
    korisnickoIme: '',
    lozinka: '',
  });

  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await loginApi(formData.korisnickoIme, formData.lozinka);

    localStorage.setItem(authKeys.id, res.id);
    const rola = res.korisnickoIme === 'admin' ? roles.admin : roles.user;
    localStorage.setItem(authKeys.rola, rola);
    localStorage.setItem(authKeys.korisnickoIme, res.korisnickoIme);

    alert('Uspesno ste se ulogovali.');
    location.pathname = '/';
  };

  return (
    <div className="auth-page">
      <h3>Login</h3>
      <form onSubmit={onLogin}>
        <div className="field">
          <label>Korisničko Ime:</label>
          <input
            type="text"
            id="korisnicko-ime"
            name="korisnickoIme"
            required
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Lozinka:</label>
          <input
            type="password"
            id="lozinka"
            name="lozinka"
            required
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="actions">
          <button
            type="submit"
            className="login"
          >
            Uloguj se
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
