import Predstava from 'components/Predstava';
import styled from 'styled-components';
import pxToRem from 'utils/helpers/pxToRem';
import RepertoarImage from 'assets/RepertoarImg.jpg';
import PageHeader from 'components/PageHeader';
import { useEffect, useState } from 'react';
import { getRepertoarApi } from 'api/calls';

const Repertoar = () => {
  const [repertoar, setRepertoar] = useState([]);

  const changeRepertoar = async () => {
    const res = await getRepertoarApi();
    console.log(res);
    setRepertoar(res);
  };

  useEffect(() => {
    changeRepertoar();
  }, []);

  return (
    <div>
      <PageHeader>
        {/* <hr /> */}
        <span className="content">Repertoar</span>
        {/* <hr /> */}
      </PageHeader>

      <Body>
        {repertoar.length > 0 &&
          repertoar.map((predstava) => {
            return (
              <Predstava
                key={predstava.naziv}
                id={predstava.id}
                naziv={predstava.naziv}
                zanr={predstava.zanr}
                datum={predstava.datum}
                slika={predstava.slika}
              />
            );
          })}
      </Body>
    </div>
  );
};

const Body = styled.div`
  padding: ${pxToRem(40)};
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default Repertoar;
