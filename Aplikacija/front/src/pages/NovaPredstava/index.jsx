import { dodatiPredstavuApi } from 'api/calls';
import PageHeader from 'components/PageHeader';
import { useState } from 'react';
import pxToRem from 'utils/helpers/pxToRem';

const NovaPredstava = () => {
  const [formData, setFormData] = useState({});

  const onInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ formData });
    await dodatiPredstavuApi(formData);
    alert('Predstava: ' + formData.naziv + ' Uspesno dodata.');

    return setFormData({
      naziv: '',
      datum: '',
      slika: '',
      opis: '',
      zanr: '',
      reditelj: '',
      cena: '',
    });
  };

  return (
    <div>
      <PageHeader> Dodavanje predstave</PageHeader>

      <form
        method="post"
        style={{
          maxWidth: '400px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>Naziv:</label>
          <input
            value={formData.naziv}
            type="text"
            required
            className="form-control"
            name="naziv"
            onChange={onInput}
          />
        </div>

        <div className="field">
          <label>Datum:</label>
          <input
            value={formData.datum}
            type="date"
            required
            className="form-control"
            name="datum"
            onChange={onInput}
          />
        </div>

        <div className="field">
          <label>Slika:</label>
          <input
            value={formData.slika}
            type="text"
            required
            className="form-control"
            name="slika"
            onChange={onInput}
          />
        </div>

        <div className="field">
          <label>Opis:</label>
          <textarea
            value={formData.opis}
            type="text"
            required
            className="form-control"
            name="opis"
            onChange={onInput}
          />
        </div>

        <div className="field">
          <label>Zanr:</label>
          <input
            value={formData.zanr}
            type="text"
            required
            className="form-control"
            name="zanr"
            onChange={onInput}
          />
        </div>

        <div className="field">
          <label>Reditelj:</label>
          <input
            value={formData.reditelj}
            type="text"
            required
            className="form-control"
            name="reditelj"
            onChange={onInput}
          />
        </div>

        <div className="field">
          <label>Cena(RSD):</label>
          <input
            value={formData.cena}
            type="text"
            required
            className="form-control"
            name="cena"
            onChange={onInput}
          />
        </div>

        <div className="actions">
          <button
            type="submit"
            className="btn btn-success  w-100"
            style={{
              marginLeft: 'auto',
              marginRight: '20px',
              marginTop: '10px',
            }}
          >
            + Dodaj novu predstavu
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaPredstava;
