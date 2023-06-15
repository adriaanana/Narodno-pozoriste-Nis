import { dodatiRezervacijuApi, getSedistaApi } from 'api/calls';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { authKeys } from 'utils/constants/localStorageKeys';
import parseDate from 'utils/helpers/parseDate';
import pxToRem from 'utils/helpers/pxToRem';
import Levo from 'assets/sedista/Levo.jpg';
import Desno from 'assets/sedista/Desno.jpg';
import Sredina from 'assets/sedista/Sredina.jpg';

const { default: PageHeader } = require('components/PageHeader');

const Rezervacija = () => {
  var currentURL = window.location.href;
  // Create a URL object
  var urlObject = new URL(currentURL);
  // Extract the value of the 'id' parameter

  // stvari uzete iz URL-a
  var id = urlObject.searchParams.get('id');

  var date = urlObject.searchParams.get('date');

  var time = urlObject.searchParams.get('time');

  var zanr = urlObject.searchParams.get('zanr');

  var naziv = urlObject.searchParams.get('naziv');

  const [slikaSedista, setSlikaSedista] = useState(null);

  // Sva sedista
  const [sedista, setSedista] = useState([]);

  const changeSedista = async () => {
    const res = await getSedistaApi(id);
    setSedista(res);
  };

  useEffect(() => {
    changeSedista();
  }, []);

  const [selected, setSelected] = useState(-1);

  const [selectedSediste, setSelectedSediste] = useState(-1);

  const onSelectItem = (e, zauzeto, sedisteId) => {
    if (zauzeto) {
      return;
    }

    console.log(e.target.id);
    const selectedItem = e.target.id;
    // console.log({ selectedItem });

    // Ovde se deselektuje
    if (!selectedItem) {
      setSelectedSediste(-1);
      return setSelected(-1);
    }

    // Ovde se deselektuje
    if (selectedItem === selected) {
      setSelectedSediste(-1);

      return setSelected(-1);
    }

    // Ovde se selektuje
    setSelectedSediste(sedisteId);
    setSelected(selectedItem);
  };

  const onPrikazi = (e) => {
    e.stopPropagation();
    const id = Number(e.target.id);

    const levaSedista = [1, 8, 15, 22, 29, 38, 43];

    const desnaSedista = [7, 14, 21, 28, 35, 42, 49];

    if (levaSedista.includes(id)) {
      return setSlikaSedista(Levo);
    }

    if (desnaSedista.includes(id)) {
      return setSlikaSedista(Desno);
    }

    return setSlikaSedista(Sredina);


  };

  const onRezervisi = async () => {
    const idSedista = selectedSediste;
    const idPredstave = id;
    const idKorisnika = localStorage.getItem(authKeys.id);

    await dodatiRezervacijuApi(idSedista, idPredstave, idKorisnika);
    changeSedista();
    setSelected(-1);
    setSelectedSediste(-1);
  };

  let i = 0;
  return (
    <>
      {slikaSedista && (
        <PrikazSlike onClick={() => setSlikaSedista(null)}>
          <img src={slikaSedista} />
        </PrikazSlike>
      )}
      <PageHeader>
        {/* <hr /> */}
        <span className="content">Rezervacija karata</span>
        {/* <hr /> */}
      </PageHeader>
      <Info>
        <div>{naziv}</div>{' '}
        <div>
          {date} / {time}h
        </div>
        <div> Zanr: {zanr}</div>
      </Info>

      <Seats className="container">
        {sedista.map((sediste) => {
          i = i + 1;
          return (
            <div
              key={sediste.id}
              className={`item ${sediste?.zauzeto === true ? 'zauzeto' : ''} ${selected == i ? 'active' : ''
                }`}
              onClick={(e) => onSelectItem(e, sediste.zauzeto, sediste.id)}
              style={{ cursor: `${sediste.zauzeto ? 'auto' : 'pointer'}` }}
              id={i}
            >
              {i}
              <button
                id={i}
                onClick={(e) => onPrikazi(e)}
              >
                Prikazi
              </button>
            </div>
          );
        })}
      </Seats>

      <ConfirmReservaton isVisible={selected > -1}>
        <h2>Informacije o sedistu</h2>

        <SeatInfp>
          <div>
            broj sedista: <b>{selected}</b>
          </div>
        </SeatInfp>

        <Actions>
          <button
            className="decline selectable"
            onClick={(e) => onSelectItem(e)}
          >
            Otkazi
          </button>

          <button
            onClick={() => onRezervisi()}
            className="confirm selectable"
          >
            Potvrdi
          </button>
        </Actions>
      </ConfirmReservaton>
    </>
  );
};

const Info = styled.div`
  font-size: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 50px;
  color: #834f3b;
  font-weight: 700;
  margin-bottom: 20px;
  padding: 20px;
`;

const Seats = styled.div`
  margin-top: 10px;
  &.container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px; // Adjust the gap value for desired spacing
    width: 500px; // Adjust the width as needed
  }

  .item {
    height: 50px; // Adjust the height as needed
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background-color: gray;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: white;

    border-top-left-radius: 14px;
    border-top-right-radius: 14px;

    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    border: 2px solid #8e7154;

    :hover {
      background-color: #93887f;
    }

    button {
      display: none;
      border: none;
      outline: none;
      font-size: 10px;
      background-color: #93887f;
      color: white;
      border-radius: 8px;
      font-weight: 700;
    }

    &.active {
      background-color: #8e7154;
      user-select: none;

      button {
        display: flex;
        background-color: #93887f;
      }
    }
  }

  .zauzeto {
    background-color: red !important;
  }
`;

const Seat = styled.div`
  display: flex;
  flex-basis: calc(100% / 7); /* Set the width for each item */
  margin-top: 10px;
  width: 50px;
  height: 50px;
  background-color: gray;
`;

const ConfirmReservaton = styled.div`
  border-radius: 20px;
  /* display: flex; */
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
`;

const SeatInfp = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

const Actions = styled.div`
  display: flex;
  gap: 20px;

  button {
    width: ${pxToRem(200)};
    height: 40px;
    border: none;
    border-radius: 8px;

    &.decline {
      background-color: #36363677;
      color: white;
    }

    &.confirm {
      background-color: #834f3b;
      color: white;
    }
  }
`;

const PrikazSlike = styled.div`
  position: fixed;
  background-color: #000000b9;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */

  img {
    width: 800px;
    height: 600px;
  }
`;

export default Rezervacija;
