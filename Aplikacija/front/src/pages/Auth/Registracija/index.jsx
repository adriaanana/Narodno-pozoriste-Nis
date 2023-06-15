import routes from 'Routes';
import { registracijaApi } from 'api/calls';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authKeys, roles } from 'utils/constants/localStorageKeys';

const Registracija = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    korisnickoIme: '',
    lozinka: '',
  });

  const navigate = useNavigate();

  const onRegistracija = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await registracijaApi(
      formData.ime,
      formData.prezime,
      formData.korisnickoIme,
      formData.lozinka
    );

    localStorage.setItem(authKeys.id, res.id);
    const rola = res.korisnickoIme === 'admin' ? roles.admin : roles.user;
    localStorage.setItem(authKeys.rola, rola);
    localStorage.setItem(authKeys.korisnickoIme, res.korisnickoIme);

    alert('Usepsno ste se registrovali na sajtu.');
    // Redirekcija korisnika na homepage posle uspesnog registrovanja
    location.pathname = routes.home.path;
  };

  return (
    <div className="auth-page">
      <h3>Registracija</h3>
      <form onSubmit={(e) => onRegistracija(e)}>
        <div className="field">
          <label>Ime:</label>
          <input
            type="text"
            id="ime"
            name="ime"
            required
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="field ">
          <label>Prezime:</label>
          <input
            type="text"
            id="prezime"
            name="prezime"
            required
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
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
            className="registracija "
          // onClick={() => onRegistracija}
          >
            Registruj se
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registracija;
