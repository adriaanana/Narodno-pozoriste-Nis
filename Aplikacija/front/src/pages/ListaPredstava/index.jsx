import routes from 'Routes';
import { getListaPredstavaApi } from 'api/calls';
import MiniPredstava from 'components/MiniPredstava';
import PageHeader from 'components/PageHeader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import isAdmin from 'utils/helpers/isAdmin';
import pxToRem from 'utils/helpers/pxToRem';

const ListaPozorista = () => {
  const [predstave, setPredstave] = useState([]);

  const navigate = useNavigate();

  const changePredstave = async () => {
    const res = await getListaPredstavaApi();
    setPredstave(res);
  };

  useEffect(() => {
    changePredstave();
  }, []);

  return (
    <div>
      <PageHeader>Predstave</PageHeader>
      {isAdmin() && (
        <div className="d-flex  p2  flex-column">
          <hr />

          <button
            className="btn btn-success "
            onClick={() => navigate(routes.novaPredstava.path)}
            style={{
              width: pxToRem(300),
              marginLeft: 'auto',
              marginRight: '20px',
            }}
          >
            + Dodaj novu predstavu
          </button>
          <hr />
        </div>
      )}
      <Body className="mt-5">
        {predstave.length > 0 &&
          predstave.map((predstava) => {
            return (
              <MiniPredstava
                key={predstava.id}
                naziv={predstava.naziv}
                slika={predstava.slika}
                zanr={predstava.zanr}
                id={predstava.id}
              />
            );
          })}
      </Body>
    </div>
  );
};

const Body = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export default ListaPozorista;
