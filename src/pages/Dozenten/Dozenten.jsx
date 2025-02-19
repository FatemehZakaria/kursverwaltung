import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';


function Dozenten() {
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: 'https://api.test/dozenten', method: 'GET' });
  }, [doRequest]);

  const handleDelete = async (id) => {
    await doRequest({ url: `https://api.test/dozenten/${id}`, method: 'DELETE' });
    doRequest({ url: 'https://api.test/dozenten', method: 'GET' }); // Aktualisieren
  };

  return (
    <>
      <h1>Dozenten</h1>
      <Link to="/dozent-erstellen">Neuen Dozenten hinzufügen</Link>

      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      {!loading && !error && data?.length > 0 && (
        data.map((dozent) => (
          <div key={dozent.id_dozent}>
            <h2>
              <Link to={`/dozenten/${dozent.id_dozent}`}>
                {dozent.vorname} {dozent.nachname}
              </Link>
            </h2>
            <p>{dozent.email ?? 'Keine E-Mail'}</p>
            <div className="actions">
              <Link to={`/dozent-anpassen/${dozent.id_dozent}`}>Bearbeiten</Link>
              <p>|</p>
              <button className="link" onClick={() => handleDelete(dozent.id_dozent)}>
                <span>Löschen</span>
              </button>
            </div>
          </div>
        ))
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <p>Keine Dozenten vorhanden.</p>
      )}
    </>
  );
}

export default Dozenten;
