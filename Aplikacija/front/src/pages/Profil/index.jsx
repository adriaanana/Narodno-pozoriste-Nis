import {
  getKorisnikApi,
  getRezervacijeApi,
  otkaziRezervacijuApi,
  promenaLozinkeApi,
} from 'api/calls';
import PageHeader from 'components/PageHeader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { authKeys } from 'utils/constants/localStorageKeys';
import isAdmin from 'utils/helpers/isAdmin';
import pxToRem from 'utils/helpers/pxToRem';

const Profil = () => {
  const id = localStorage.getItem(authKeys.id) || null;
  const korisnickoIme = localStorage.getItem(authKeys.korisnickoIme);
  const [name, setName] = useState('');
  const [prezime, setPrezime] = useState('');
  const [password, setPassword] = useState('');

  const [showPassInput, setShowPassInput] = useState(false);

  const [rezervacije, setRezervacije] = useState([]);

  const changeRezervacije = async () => {
    const res = await getRezervacijeApi();
    console.log({ rezervacijice: res });
    setRezervacije(res);
  };

  const onDeleteReservation = async (rezervacijeId) => {
    await otkaziRezervacijuApi(rezervacijeId);
    alert('Uspesno ste otkazali rezervaciju.');
    changeRezervacije();
  };

  const changeKorisnik = async () => {
    const res = await getKorisnikApi(id);
    console.log({ res });

    setName(res.ime);
    setPrezime(res.prezime);
  };

  const onPromenaLozinke = async () => {
    console.log({ password });
    await promenaLozinkeApi(korisnickoIme, password);
    alert('Uspesno ste promenili lozinku!');
  };

  useEffect(() => {
    changeKorisnik();
    changeRezervacije();
  }, []);

  return (
    <div>
      <PageHeader> {isAdmin() ? 'Admin Panel' : ' Moj profil'}</PageHeader>
      <Body>
        {!isAdmin() && (
          <table className="table table-striped ">
            <tbody className="p4">
              <tr className="p4">
                <td className="text-bold">Ime</td>
                <td className="">{name}</td>
              </tr>
              <tr>
                <td className="text-bold">Prezime</td>
                <td className="">{prezime}</td>
              </tr>
              <tr>
                <td className="text-bold">Lozinka</td>
                <td className=" gap-4 auth-form">
                  <div className="d-flex gap-2">
                    <input
                      type="password"
                      placeholder="Unesite novu lozinku"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <button
                      className="
                   selectable
                  "
                      onClick={() => {
                        onPromenaLozinke();
                      }}
                    >
                      Promeni lozinku
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <div>
          <h3 className="text-center">
            {isAdmin() && 'Sve '}
            Rezervacije
          </h3>
          <hr />

          {rezervacije.length === 0 && <div>Nemate nijednu rezervaciju</div>}

          {rezervacije.map((rezervacija) => {
            return (
              <Reservation
                isVisible={true}
                key={rezervacija.id}
              >
                <h2> {rezervacija.predstavaNaziv}</h2>
                <p className="text-muted">{rezervacija.datum}</p>

                <SeatInfp>
                  <div>
                    Broj reda: <b> {rezervacija.sediste[0].broj} </b>
                  </div>
                  <div>
                    broj sedista: <b>{rezervacija.sediste[0].red}</b>
                  </div>
                </SeatInfp>

                {!isAdmin() && (
                  <Actions>
                    <button
                      className="decline selectable"
                      onClick={() =>
                        onDeleteReservation(rezervacija.rezervacijeId)
                      }
                    >
                      Otkazi
                    </button>
                  </Actions>
                )}
                {isAdmin() && (
                  <div className="mt-4 ">
                    Rezervacija na ime:{' '}
                    <b className="text-success">
                      {rezervacija.korisnikIme} {rezervacija.korisnikPrezime}{' '}
                      {rezervacija.korisnikUsername}
                    </b>
                  </div>
                )}
              </Reservation>
            );
          })}
        </div>
      </Body>
    </div>
  );
};

const Body = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  input {
    height: ${pxToRem(35)};
    border-radius: 8px;
    outline: none;
    border: none;
    padding: 10px;
  }

  button {
    background-color: #8e7154;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: ${pxToRem(14)};
  }

  .text-bold {
    font-weight: 700;
  }
`;

const Reservation = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  background-color: #80808028;
  margin-top: 20px;
  width: 100%;
  max-width: ${pxToRem(800)};
  padding: 20px;
  /* visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')}; */
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  min-width: ${pxToRem(800)};

  color: black;
`;

const Actions = styled.div`
  display: flex;
  gap: 20px;

  button {
    width: ${pxToRem(400)};
    height: 40px;
    border: none;
    border-radius: 8px;

    &.decline {
      background-color: #cc0000;
      color: white;
    }

    &.confirm {
      background-color: #8e7154;
      color: white;
    }
  }
`;

const SeatInfp = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

export default Profil;
