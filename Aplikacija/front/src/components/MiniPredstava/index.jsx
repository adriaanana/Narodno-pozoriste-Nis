import routes from 'Routes';
import { obrisiRezervacijuApi } from 'api/calls';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import isAdmin from 'utils/helpers/isAdmin';
import pxToRem from 'utils/helpers/pxToRem';

const MiniPredstava = ({ naziv, slika, zanr, id }) => {
  const navigate = useNavigate();

  const onDelete = async (e, id) => {
    console.log(id);
    e.preventDefault();
    const res = await obrisiRezervacijuApi(id);
    location.reload();
  };

  return (
    <>
      <Wrapper>
        <Naziv>{naziv}</Naziv>
        <hr />
        <Slika
          onClick={() => {
            navigate(routes.predstava.path + `?id=${id}`);
          }}
        >
          <img src={slika} />
        </Slika>
        <div>{zanr}</div>
        <hr />
        {isAdmin() && <button
          onClick={(e) => onDelete(e, id)}
          className="btn btn-danger btn-sm m-2 w-50"
        >
          Obrisi
        </button>}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: ${pxToRem(300)};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #00000011;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  hr {
    width: 40%;
    border: 3px solid #341306 !important;
    padding: 0px;
    margin: 5px;
  }
`;
const Naziv = styled.div`
  background-color: #8e7154;
  color: white;
  font-size: ${pxToRem(25)};
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slika = styled.div`
  width: 100%;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
  }
`;
export default MiniPredstava;
