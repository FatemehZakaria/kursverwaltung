import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function KursErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [kursnummer, setKursnummer] = useState('');
  const [kursthema, setKursthema] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [fk_dozent, setFkDozent] = useState('');
  const [startdatum, setStartdatum] = useState('');
  const [enddatum, setEnddatum] = useState('');
  const [dauer, setDauer] = useState('');
  const [dozenten, setDozenten] = useState([]);

  // **Dozenten für Dropdown laden**
  useEffect(() => {
    (async function fetchDozenten() {
      const res = await doRequest({ url: 'https://api.test/dozenten', method: 'GET' });
      if (res.success) {
        setDozenten(res.data);
      }
    })();
  }, [doRequest]);

  const handleCreate = async () => {
    const result = await doRequest({
      url: 'https://api.test/kurse',
      method: 'POST',
      body: {
        kursnummer,
        kursthema,
        inhalt,
        fk_dozent,
        startdatum,
        enddatum,
        dauer
      },
    });

    if (result.success) {
      navigate('/kurse');
    } else {
      console.error('Fehler beim Erstellen:', result.error);
    }
  };

  return (
    <div>
      <h1>Neuen Kurs hinzufügen</h1>
      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <label>Kursnummer:</label>
        <input type="text" value={kursnummer} onChange={(e) => setKursnummer(e.target.value)} required />

        <label>Kursthema:</label>
        <input type="text" value={kursthema} onChange={(e) => setKursthema(e.target.value)} required />

        <label>Inhalt:</label>
        <textarea value={inhalt} onChange={(e) => setInhalt(e.target.value)} required />

        <label>Dozent:</label>
        <select value={fk_dozent} onChange={(e) => setFkDozent(e.target.value)} required>
          <option value="">Bitte wählen</option>
          {dozenten.map((dozent) => (
            <option key={dozent.id_dozent} value={dozent.id_dozent}>
              {dozent.vorname} {dozent.nachname}
            </option>
          ))}
        </select>

        <label>Startdatum:</label>
        <input type="date" value={startdatum} onChange={(e) => setStartdatum(e.target.value)} required />

        <label>Enddatum:</label>
        <input type="date" value={enddatum} onChange={(e) => setEnddatum(e.target.value)} required />

        <label>Dauer (Tage):</label>
        <input type="number" value={dauer} onChange={(e) => setDauer(e.target.value)} required />

        <button type="submit" disabled={loading}>Erstellen</button>
      </form>
    </div>
  );
}

export default KursErstellen;
