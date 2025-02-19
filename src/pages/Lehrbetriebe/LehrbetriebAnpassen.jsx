import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LehrbetriebAnpassen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, doRequest } = useApi();

  const [firma, setFirma] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');

  useEffect(() => {
    (async function fetchLehrbetrieb() {
      const res = await doRequest({
        url: `https://api.test/lehrbetriebe/${id}`, 
        method: 'GET',
      });

      if (res.success) {
        setFirma(res.data.firma ?? '');
        setStrasse(res.data.strasse ?? '');
        setPlz(res.data.plz ?? '');
        setOrt(res.data.ort ?? '');
      }
    })();
  }, [doRequest, id]);

  const handleUpdate = async () => {
    const res = await doRequest({
      url: `https://api.test/lehrbetriebe/${id}`, 
      method: 'PUT',
      body: {
        firma,
        strasse,
        plz,
        ort
      },
    });

    if (res.success) {
      navigate('/lehrbetriebe');
    }
  };

  return (
    <div>
      <h1>Lehrbetrieb bearbeiten</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className="error" key={index}>{`${errMsg}`}</p>
          ))}
        </div>
      )}

      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
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
          Speichern
        </button>
      </form>
    </div>
  );
}

export default LehrbetriebAnpassen;
