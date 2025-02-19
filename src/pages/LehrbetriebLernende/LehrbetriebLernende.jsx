import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LehrbetriebLernende() {
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: 'https://api.test/lehrbetrieb_lernende', method: 'GET' });
  }, [doRequest]);

  const handleDelete = async (id) => {
    await doRequest({
      url: `https://api.test/lehrbetrieb_lernende/${id}`,
      method: 'DELETE',
    });
    doRequest({ url: 'https://api.test/lehrbetrieb_lernende', method: 'GET' });
  };

  const grouped = data
    ? Object.values(
        data.reduce((acc, curr) => {
          if (!acc[curr.firma]) {
            acc[curr.firma] = {
              firma: curr.firma,
              learners: [],
            };
          }
          acc[curr.firma].learners.push(curr);
          return acc;
        }, {})
      )
    : [];

  return (
    <>
      <h1>Lehrbetrieb-Lernende</h1>
      <Link to="/lehrbetrieb-lernender-erstellen">Neuen Eintrag hinzufügen</Link>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, msg], i) => (
            <p className="error" key={i}>
              {msg}
            </p>
          ))}
        </div>
      )}
      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}

      {!loading && !error && grouped.length > 0 && (
        grouped.map((group) => {
          const firstId = group.learners[0].id_lehrbetrieb_lernende;
          return (
            <div key={group.firma}>
              <h2>
                <Link to={`/lehrbetrieb-lernende/${firstId}`}>
                  Firma: {group.firma}
                </Link>
              </h2>

              <ul>
                {group.learners.map((lb) => (
                  <li key={lb.id_lehrbetrieb_lernende}>
                    {lb.vorname} {lb.nachname} ({lb.start} - {lb.ende})
                    <div className="actions">
                      <Link to={`/lehrbetrieb-lernender-anpassen/${lb.id_lehrbetrieb_lernende}`}>
                        Bearbeiten
                      </Link>
                      <span> | </span>
                      <button
                        className="link"
                        onClick={() => handleDelete(lb.id_lehrbetrieb_lernende)}
                      >
                        <span>Löschen</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <p>Keine Einträge vorhanden.</p>
      )}
    </>
  );
}

export default LehrbetriebLernende;
