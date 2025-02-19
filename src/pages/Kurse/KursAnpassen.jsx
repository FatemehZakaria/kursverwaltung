import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function KursAnpassen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, doRequest } = useApi();

  // Felder aus tbl_kurse
  const [kursnummer, setKursnummer] = useState('');
  const [kursthema, setKursthema] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [fk_dozent, setFkDozent] = useState('');
  const [startdatum, setStartdatum] = useState('');
  const [enddatum, setEnddatum] = useState('');
  const [dauer, setDauer] = useState('');

  // Zusätzliche Liste z.B. für Dozenten
  const [dozenten, setDozenten] = useState([]);

  // Beim Laden: vorhandener Kurs + Dozenten laden
  useEffect(() => {
    // 1) Kursdetails
    (async function fetchKurs() {
      const res = await doRequest({
        url: `https://api.test/kurse/${id}`, // Endpunkt anpassen
        method: 'GET',
      });
      if (res.success) {
        setKursnummer(res.data.kursnummer ?? '');
        setKursthema(res.data.kursthema ?? '');
        setInhalt(res.data.inhalt ?? '');
        setFkDozent(res.data.fk_dozent ?? '');
        setStartdatum(res.data.startdatum ?? '');
        setEnddatum(res.data.enddatum ?? '');
        setDauer(res.data.dauer ?? '');
      }
    })();

    // 2) Dozenten-Liste
    (async function fetchDozenten() {
      const res = await doRequest({
        url: 'https://api.test/dozenten',
        method: 'GET',
      });
      if (res.success) {
        setDozenten(res.data);
      }
    })();
  }, [doRequest, id]);

  const handleUpdate = async () => {
    const res = await doRequest({
      url: `https://api.test/kurse/${id}`, 
      method: 'PUT',
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

    if (res.success) {
      navigate('/kurse');
    }
  };

  return (
    <div>
      <h1>Kurs bearbeiten</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className='error' key={index}>{`${errMsg}`}</p>
          ))}
        </div>
      )}

      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <label>Kursnummer:</label>
        <input
          type="text"
          value={kursnummer}
          onChange={(e) => setKursnummer(e.target.value)}
          required
        />

        <label>Kursthema:</label>
        <input
          type="text"
          value={kursthema}
          onChange={(e) => setKursthema(e.target.value)}
          required
        />

        <label>Inhalt:</label>
        <textarea
          value={inhalt}
          onChange={(e) => setInhalt(e.target.value)}
          required
        />

        <label>Dozent:</label>
        <select
          value={fk_dozent}
          onChange={(e) => setFkDozent(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          {dozenten.map((dozent) => (
            <option key={dozent.id_dozent} value={dozent.id_dozent}>
              {dozent.vorname} {dozent.nachname}
            </option>
          ))}
        </select>

        <label>Startdatum:</label>
        <input
          type="date"
          value={startdatum}
          onChange={(e) => setStartdatum(e.target.value)}
          required
        />

        <label>Enddatum:</label>
        <input
          type="date"
          value={enddatum}
          onChange={(e) => setEnddatum(e.target.value)}
          required
        />

        <label>Dauer (Tage):</label>
        <input
          type="number"
          value={dauer}
          onChange={(e) => setDauer(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          Speichern
        </button>
      </form>
    </div>
  );
}

export default KursAnpassen;
