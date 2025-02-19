import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function Lernende() {
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: 'https://api.test/lernende', method: 'GET' });
  }, [doRequest]);

  const handleDelete = async (id) => {
    await doRequest({
      url: `https://api.test/lernende/${id}`,
      method: 'DELETE',
    });
    doRequest({ url: 'https://api.test/lernende', method: 'GET' });
  };

  return (
    <>
      <h1>Lernende</h1>
      <Link to="/lernender-erstellen">Neuen Lernenden hinzufügen</Link>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className="error" key={index}>{errMsg}</p>
          ))}
        </div>
      )}
      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}

      {!loading && !error && data?.length > 0 && (
        data.map((ler) => (
          <div key={ler.id_lernende}>
            <h2>
              <Link to={`/lernende/${ler.id_lernende}`}>
                {ler.vorname} {ler.nachname}
              </Link>
            </h2>
            <p>{ler.email ?? 'Keine E-Mail'}</p>
            <div className="actions">
              <Link to={`/lernender-anpassen/${ler.id_lernende}`}>Bearbeiten</Link>
              <p>|</p>
              <button className="link" onClick={() => handleDelete(ler.id_lernende)}>
                <span>Löschen</span>
              </button>
            </div>
          </div>
        ))
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <p>Keine Lernenden vorhanden.</p>
      )}
    </>
  );
}

export default Lernende;
