import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function KursLernender() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: `https://api.test/kurse_lernende/${id}`, method: 'GET' });
  }, [doRequest, id]);

  const handleDelete = async () => {
    await doRequest({
      url: `https://api.test/kurse_lernende/${id}`,
      method: 'DELETE',
    });
    navigate('/kurs-lernende');
  };

  return (
    <>
      <h1>Kurs-Lernende | Detail</h1>

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

      {!loading && !error && data && (
        <div>
          <h2>Kurs: {data.kursthema}</h2>
          <p>Lernende/r: {data.lernende_vorname} {data.lernende_nachname}</p>
          <p>Rolle: {data.role ?? '–'}</p>

          <div className="actions">
            <Link to={`/kurs-lernender-anpassen/${data.id_kurs_lernende}`}>
              Bearbeiten
            </Link>
            <p>|</p>
            <button className="link" onClick={handleDelete}>
             <span>Löschen</span> 
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default KursLernender;
