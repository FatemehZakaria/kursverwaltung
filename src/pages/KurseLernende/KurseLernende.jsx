import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function KurseLernende() {
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: 'https://api.test/kurse_lernende', method: 'GET' });
  }, [doRequest]);

  const handleDelete = async (id) => {
    await doRequest({
      url: `https://api.test/kurse_lernende/${id}`,
      method: 'DELETE',
    });
    doRequest({ url: 'https://api.test/kurse_lernende', method: 'GET' });
  };

  const grouped = data
    ? Object.values(
        data.reduce((acc, curr) => {
          if (!acc[curr.kursthema]) {
            acc[curr.kursthema] = {
              kursthema: curr.kursthema,
              learners: [],
            };
          }
          acc[curr.kursthema].learners.push(curr);
          return acc;
        }, {})
      )
    : [];

  return (
    <>
      <h1>Kurse-Lernende</h1>
      <Link to="/kurs-lernender-erstellen">Neuen Kurs-Lernende erstellen</Link>

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

      {!loading && !error && grouped.length > 0 && (
        grouped.map((group) => {
          const firstId = group.learners[0].id_kurs_lernende;
          return (
            <div key={group.kursthema}>
              <h2>
                <Link to={`/kurse-lernende/${firstId}`}>
                  Kurs: {group.kursthema}
                </Link>
              </h2>
              <ul>
                {group.learners.map((kl) => (
                  <li key={kl.id_kurs_lernende}>
                    {kl.lernende_vorname} {kl.lernende_nachname} 
                    {kl.role ? ` (Rolle: ${kl.role})` : ''}
                    <div className="actions">
                      <Link to={`/kurs-lernender-anpassen/${kl.id_kurs_lernende}`}>
                        Bearbeiten
                      </Link>
                      <span> | </span>
                      <button
                        className="link"
                        onClick={() => handleDelete(kl.id_kurs_lernende)}
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

      {/* If no data */}
      {!loading && !error && (!data || data.length === 0) && (
        <p>Keine Einträge vorhanden.</p>
      )}
    </>
  );
}

export default KurseLernende;
