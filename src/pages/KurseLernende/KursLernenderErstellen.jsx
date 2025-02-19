import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function KursLernenderErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [fk_kurs, setFkKurs] = useState('');
  const [fk_lernende, setFkLernende] = useState('');
  const [role, setRole] = useState('');

  const [kurse, setKurse] = useState([]);
  const [lernende, setLernende] = useState([]);

  useEffect(() => {
    (async function fetchKurse() {
      const res = await doRequest({
        url: 'https://api.test/kurse',
        method: 'GET',
      });
      if (res.success) {
        setKurse(res.data);
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

  // 2) POST new record
  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await doRequest({
      url: 'https://api.test/kurse_lernende',
      method: 'POST',
      body: {
        fk_kurs,
        fk_lernende,
        role
      },
    });

    if (result.success) {
      // Return to the list
      navigate('/kurse-lernende');
    }
  };

  return (
    <>
      <h1>Neuen Kurs-Lernende Eintrag erstellen</h1>

      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}
      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, msg], i) => (
            <p className="error" key={i}>
              {msg}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleCreate}>
        <label>Kurs:</label>
        <select
          value={fk_kurs}
          onChange={(e) => setFkKurs(e.target.value)}
          required
        >
          <option value="">-- bitte wählen --</option>
          {kurse.map((k) => (
            <option key={k.id_kurs} value={k.id_kurs}>
              {k.kursthema}
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
          {lernende.map((l) => (
            <option key={l.id_lernende} value={l.id_lernende}>
              {l.vorname} {l.nachname}
            </option>
          ))}
        </select>

        <label>Rolle:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Speichert...' : 'Erstellen'}
        </button>
      </form>
    </>
  );
}

export default KursLernenderErstellen;
