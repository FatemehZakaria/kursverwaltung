import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LehrbetriebLernendeAnpassen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, doRequest } = useApi();

  const [fkLehrbetrieb, setFkLehrbetrieb] = useState('');
  const [fkLernende, setFkLernende] = useState('');
  const [start, setStart] = useState('');
  const [ende, setEnde] = useState('');
  const [beruf, setBeruf] = useState('');

  const [lehrbetriebe, setLehrbetriebe] = useState([]);
  const [lernende, setLernende] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      const res = await doRequest({
        url: `https://api.test/lehrbetrieb_lernende/${id}`,
        method: 'GET'
      });
      if (res.success && res.data) {
        const d = res.data;
        setFkLehrbetrieb(d.fk_lehrbetrieb ?? '');
        setFkLernende(d.fk_lernende ?? '');
        setStart(d.start ? d.start.substring(0, 10) : '');
        setEnde(d.ende ? d.ende.substring(0, 10) : '');
        setBeruf(d.beruf ?? '');
      }

      const resBetriebe = await doRequest({
        url: 'https://api.test/lehrbetriebe',
        method: 'GET'
      });
      if (resBetriebe.success) {
        setLehrbetriebe(resBetriebe.data);
      }

      const resLernende = await doRequest({
        url: 'https://api.test/lernende',
        method: 'GET'
      });
      if (resLernende.success) {
        setLernende(resLernende.data);
      }
    })();
  }, [doRequest, id]);

  const handleUpdate = async () => {
    const res = await doRequest({
      url: `https://api.test/lehrbetrieb_lernende/${id}`,
      method: 'PUT',
      body: {
        fk_lehrbetrieb: fkLehrbetrieb,
        fk_lernende: fkLernende,
        start,
        ende,
        beruf
      }
    });
    if (res.success) {
      navigate('/lehrbetrieb-lernende');
    }
  };

  return (
    <div>
      <h1>Lehrbetrieb-Lernende bearbeiten</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], idx) => (
            <p className="error" key={idx}>
              {errMsg}
            </p>
          ))}
        </div>
      )}

      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <label>Lehrbetrieb:</label>
        <select
          value={fkLehrbetrieb}
          onChange={(e) => setFkLehrbetrieb(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          {lehrbetriebe.map((b) => (
            <option key={b.id_lehrbetrieb} value={b.id_lehrbetrieb}>
              {b.firma}
            </option>
          ))}
        </select>

        <label>Lernende(r):</label>
        <select
          value={fkLernende}
          onChange={(e) => setFkLernende(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          {lernende.map((l) => (
            <option key={l.id_lernende} value={l.id_lernende}>
              {l.vorname} {l.nachname}
            </option>
          ))}
        </select>

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
          required
        />

        <label>Beruf:</label>
        <input
          type="text"
          value={beruf}
          onChange={(e) => setBeruf(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>Speichern</button>
      </form>
    </div>
  );
}

export default LehrbetriebLernendeAnpassen;
