import routes from 'Routes';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authKeys } from 'utils/constants/localStorageKeys';
import parseDate from 'utils/helpers/parseDate';
import pxToRem from 'utils/helpers/pxToRem';

const Predstava = ({ id, naziv, datum, slika, zanr }) => {
  const navigate = useNavigate();
  const [date, time] = parseDate(datum);
  const korisnikId = localStorage.getItem(authKeys.id);

  return (
    <Wrapper>
      <Vreme>
        <div>{date}</div>
        <hr />
        <div>{time}h</div>
      </Vreme>
      <Naziv
        onClick={() => {
          navigate(routes.predstava.path + `?id=${id}`);
        }}
      >
        {naziv}
      </Naziv>
      <Zanr>{zanr}</Zanr>
      <Slika url={slika}></Slika>
      {korisnikId && (
        <Rezervacija>
          <button
            onClick={() => {
              navigate(
                routes.repertoar.subRoutes.rezervacija.path +
                  `?id=${id}&date=${date}&time=${time}&zanr=${zanr}&naziv=${naziv}`
              );
            }}
            className="selectable"
          >
            Rezervisi
          </button>
        </Rezervacija>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid #834f3b;
  /* padding-top: 40px; */
  /* padding-bottom: 40px; */
  display: flex;
  height: ${pxToRem(240)};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #834f3b23;
`;

const Vreme = styled.div`
  flex: 0.5;
  border: 1px solid #8e7154;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 800;
  font-size: ${pxToRem(24)};
  color: #93887f;
  hr {
    border: 2px solid #8e7154;
  }
`;
const Naziv = styled.div`
  flex: 2;
  font-size: ${pxToRem(24)};
  font-weight: 800;
  text-align: center;
  color: gray;

  cursor: pointer;

  :hover {
    text-decoration: underline;
    color: brown;
  }
`;
const Zanr = styled.div`
  font-size: ${pxToRem(18)};
  font-weight: 600;
  text-align: center;
  color: gray;
`;
const Slika = styled.div`
  flex: 0.5;
  height: 100%;
  margin-left: ${pxToRem(50)};
  text-align: center;
  background-color: #8080803a;

  background: ${(props) => `url(${props.url})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Rezervacija = styled.div`
  padding: 10px;

  button {
    border: none;
    outline: none;
    border-radius: 9px;
    padding: 10px;
    background-color: #93887f;
    color: white;
  }
`;

export default Predstava;
