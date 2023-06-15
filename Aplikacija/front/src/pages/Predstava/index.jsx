import { getPredstavaApi } from 'api/calls';
import PageHeader from 'components/PageHeader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from 'utils/helpers/pxToRem';

const Predstava = () => {
  var currentURL = window.location.href;
  // Create a URL object
  var urlObject = new URL(currentURL);
  // Extract the value of the 'id' parameter
  var id = urlObject.searchParams.get('id');

  const [predstava, setPredstava] = useState({});

  const changePredstava = async () => {
    const res = await getPredstavaApi(id);
    setPredstava(res);
  };

  useEffect(() => {
    changePredstava();
  }, [id]);

  return (
    <div>
      <PageHeader>{predstava.naziv}</PageHeader>
      <Body className="mt-5">
        <div className="text">{predstava.opis}</div>
        <img src={predstava.slika}></img>
      </Body>
    </div>
  );
};

const Body = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
  gap: 10px;

  .text {
    min-width: 70%;
  }

  img {
    max-width: 30%;
    width: ${pxToRem(600)};
    height: ${pxToRem(600)};
    margin-bottom: 20px;
    border-left: 4px solid;

    border-color: #6f3939;
    padding: 20px;
  }
`;

export default Predstava;
