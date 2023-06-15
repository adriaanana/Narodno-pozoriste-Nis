const Kontakt = () => {
  return (
    <div className="auth-page">
      <h3>Kontakt</h3>
      <form
        // otvara mejl i moze da posaljemo mejl
        // mailto kljucna rec
        action="mailto:nardonopozoriste@example.com"
        method="post"
      >
        <div className="field">
          <label>Vase Ime:</label>
          <input
            type="text"
            id="korisnicko-ime"
            required
            className="form-control"
          />
        </div>
        <div className="field">
          <label>Poruka:</label>
          <textarea
            id="poruka"
            name="poruka"
            required
            className="form-control"
            style={{ minHeight: '200px' }}
          />
        </div>
        <div className="actions">
          <button
            type="submit"
            className="registracija"
          >
            Posalji {'->'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Kontakt;
