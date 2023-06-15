import api from 'api';
import { authKeys } from 'utils/constants/localStorageKeys';
import isAdmin from 'utils/helpers/isAdmin';

const prefix = '/auth';

const idAplikacije = 1;

export const registracijaApi = async (ime, prezime, korisnickoIme, lozinka) => {
  const route = `/Korisnik/RegistrujSe/${ime}/${prezime}/${korisnickoIme}/${lozinka}/${idAplikacije}`;

  const res = await api.post(route);

  return res.data;
};

export const loginApi = async (korisnickoIme, lozinka) => {
  const route = `/Korisnik/UlogujSe/${korisnickoIme}/${lozinka}`;

  const res = await api.get(route);

  return res.data;
};

export const getRepertoarApi = async () => {
  const route = `/Predstava/Repertoar`;

  const res = await api.get(route);

  return res.data;
};

export const getSedistaApi = async (id) => {
  const route = `/Predstava/ListaSedista/${id}`;

  const res = await api.get(route);

  return res.data;
};

export const getListaPredstavaApi = async () => {
  const route = `/Predstava/ListaPredstava`;

  const res = await api.get(route);

  return res.data;
};

export const getKorisnikApi = async (id) => {
  const route = `/Korisnik/PreuzmiKorisnika${id}`;

  const res = await api.get(route);

  return res.data;
};

export const getRezervacijeApi = async () => {
  const route = `/Rezervacija/PreuzmiRezervacije`;

  const res = await api.get(route);

  console.log({ data: res.data });

  const id = localStorage.getItem(authKeys.id);

  // TODO: Ispravi isAdmin
  return isAdmin()
    ? res.data
    : res.data.filter((item) => {
        return Number(item.korisnikID) === Number(id);
      });
};

export const otkaziRezervacijuApi = async (id) => {
  const route = `/Rezervacija/IzbrisatiRezervaciju/${id}`;
  const res = await api.delete(route);

  console.log(res);
  return res;
};

export const promenaLozinkeApi = async (korisnickoIme, lozinka) => {
  const route = `/Korisnik/AzuriranjeNaloga/${korisnickoIme}/${lozinka}`;
  const res = await api.put(route);
  return res.data;
};

export const dodatiRezervacijuApi = async (
  idSedista,
  idPredstave,
  idKorisnika
) => {
  const route = `/Rezervacija/DodatiRezervaciju/${idSedista}/${idPredstave}/${idKorisnika}`;
  const res = await api.post(route);

  return res.data;
};

export const dodatiPredstavuApi = async (formData) => {
  const route = `/Predstava/DodatiPredstavu`;
  const res = await api.post(route, formData);
  console.log({ res });

  return res.data;
};

export const getPredstavaApi = async (id) => {
  const route = `/Predstava/OPredstavi${id}`;
  const res = await api.get(route);

  return res.data;
};

export const obrisiRezervacijuApi = async (id) => {
  const route = `/Predstava/IzbrisatiPredstavu/${id}`;
  const res = await api.delete(route);
  console.log({ res });

  return res.data;
};
