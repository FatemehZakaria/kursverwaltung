import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function KursLernenderAnpassen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, doRequest } = useApi();

  const [fkKurs, setFkKurs] = useState('');
  const [fkLernende, setFkLernende] = useState('');
  const [role, setRole] = useState('');

  const [kurse, setKurse] = useState([]);
  const [lernende, setLernende] = useState([]);

  useEffect(() => {
    (async function fetchRecordAndLists() {
      const res = await doRequest({
        url: `https://api.test/kurse_lernende/${id}`,
        method: 'GET',
      });
      if (res.success && res.data) {
        setFkKurs(res.data.fk_kurs ?? '');
        setFkLernende(res.data.fk_lernende ?? '');
        setRole(res.data.role ?? '');
      }

      const resKurse = await doRequest({
        url: 'https://api.test/kurse', 
        method: 'GET',
      });
      if (resKurse.success) {
        setKurse(resKurse.data);
      }

      const resLernende = await doRequest({
        url: 'https://api.test/lernende', 
        method: 'GET',
      });
      if (resLernende.success) {
        setLernende(resLernende.data);
      }
    })();
  }, [doRequest, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await doRequest({
      url: `https://api.test/kurse_lernende/${id}`,
      method: 'PUT',
      body: {
        fk_kurs: fkKurs,
        fk_lernende: fkLernende,
        role
      },
    });

    if (res.success) {
      navigate(`/kurse-lernende/${id}`);
    }
  };

  return (
    <>
      <h1>Kurs-Lernende bearbeiten</h1>

      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], idx) => (
            <p className="error" key={idx}>
              {errMsg}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleUpdate}>
        <label>Kurs:</label>
        <select
          value={fkKurs}
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
          value={fkLernende}
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

        <button type="submit" disabled={loading}>Speichern</button>
      </form>
    </>
  );
}

export default KursLernenderAnpassen;
