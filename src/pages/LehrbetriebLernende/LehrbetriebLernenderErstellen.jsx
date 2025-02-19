import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LehrbetriebLernenderErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [fk_lehrbetrieb, setFkLehrbetrieb] = useState('');
  const [fk_lernende, setFkLernende] = useState('');
  const [start, setStart] = useState('');
  const [ende, setEnde] = useState('');
  const [beruf, setBeruf] = useState('');

  const [lehrbetriebe, setLehrbetriebe] = useState([]);
  const [lernende, setLernende] = useState([]);

  useEffect(() => {
    (async function fetchLehrbetriebe() {
      const res = await doRequest({
        url: 'https://api.test/lehrbetriebe',
        method: 'GET',
      });
      if (res.success) {
        setLehrbetriebe(res.data);
      }
    })();

    (async function fetchLernende() {
      const res = await doRequest({
        url: 'https://api.test/lernende',
        method: 'GET',
      });
      if (res.success) {
        setLernende(res.data);
      }
    })();
  }, [doRequest]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await doRequest({
      url: 'https://api.test/lehrbetrieb_lernende',
      method: 'POST',
      body: {
        fk_lehrbetrieb,
        fk_lernende,
        start,
        ende,
        beruf,
      },
    });

    if (result.success) {
      navigate('/lehrbetrieb-lernende');
    }
  };

  return (
    <>
      <h1>Neuen Lehrbetrieb-Lernende Eintrag erstellen</h1>

      {loading && <div className="spinner"><div></div></div>}
      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, msg], i) => (
            <p className='error' key={i}>{msg}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleCreate}>
        <label>Lehrbetrieb:</label>
        <select
          value={fk_lehrbetrieb}
          onChange={(e) => setFkLehrbetrieb(e.target.value)}
          required
        >
          <option value="">-- bitte wählen --</option>
          {lehrbetriebe.map((lb) => (
            <option key={lb.id_lehrbetrieb} value={lb.id_lehrbetrieb}>
              {lb.firma}
            </option>
          ))}
        </select>

        <label>Lernende(r):</label>
        <select
          value={fk_lernende}
          onChange={(e) => setFkLernende(e.target.value)}
          required
        >
          <option value="">-- bitte wählen --</option>
          {lernende.map((ler) => (
            <option key={ler.id_lernende} value={ler.id_lernende}>
              {ler.vorname} {ler.nachname}
            </option>
          ))}
        </select>

        <label>Beruf:</label>
        <input
          type="text"
          value={beruf}
          onChange={(e) => setBeruf(e.target.value)}
        />

        <label>Startdatum:</label>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />

        <label>Enddatum:</label>
        <input
          type="date"
          value={ende}
          onChange={(e) => setEnde(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Speichert...' : 'Erstellen'}
        </button>
      </form>
    </>
  );
}

export default LehrbetriebLernenderErstellen;
