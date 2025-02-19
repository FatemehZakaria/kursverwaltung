import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LehrbetriebErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [firma, setFirma] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');

  const handleCreate = async () => {
    const res = await doRequest({
      url: 'https://api.test/lehrbetriebe', 
      method: 'POST',
      body: {
        firma,
        strasse,
        plz,
        ort,
      },
    });

    if (res.success) {
      navigate('/lehrbetriebe');
    }
  };

  return (
    <div>
      <h1>Neuen Lehrbetrieb hinzufügen</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className="error" key={index}>{`${errMsg}`}</p>
          ))}
        </div>
      )}

      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <label>Firma:</label>
        <input
          type="text"
          value={firma}
          onChange={(e) => setFirma(e.target.value)}
          required
        />

        <label>Strasse:</label>
        <input
          type="text"
          value={strasse}
          onChange={(e) => setStrasse(e.target.value)}
          required
        />

        <label>PLZ:</label>
        <input
          type="text"
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
          required
        />

        <label>Ort:</label>
        <input
          type="text"
          value={ort}
          onChange={(e) => setOrt(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          Erstellen
        </button>
      </form>
    </div>
  );
}

export default LehrbetriebErstellen;
