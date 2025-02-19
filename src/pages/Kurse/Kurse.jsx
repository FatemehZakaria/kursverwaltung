import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function Kurse() {
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: 'https://api.test/kurse', method: 'GET' });
  }, [doRequest]);

  const handleDelete = async (id) => {
    await doRequest({ url: `https://api.test/kurse/${id}`, method: 'DELETE' });
    doRequest({ url: 'https://api.test/kurse', method: 'GET' });
  };

  return (
    <>
      <h1>Kurse</h1>
      <Link to="/kurs-erstellen">Neuen Kurs hinzufügen</Link>

      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      {!loading && !error && data?.length > 0 && (
        data.map((kurs) => (
          <div key={kurs.id_kurs}>
            <h2>
              <Link to={`/kurse/${kurs.id_kurs}`}>
                {kurs.kursnummer} - {kurs.kursthema}
              </Link>
            </h2>
            <p>Dauer: {kurs.dauer} Tage</p>
            <div className="actions">
              <Link to={`/kurs-anpassen/${kurs.id_kurs}`}>Bearbeiten</Link>
              <p>|</p>
              <button className="link" onClick={() => handleDelete(kurs.id_kurs)}>
                <span>Löschen</span>
              </button>
            </div>
          </div>
        ))
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <p>Keine Kurse vorhanden.</p>
      )}
    </>
  );
}

export default Kurse;
