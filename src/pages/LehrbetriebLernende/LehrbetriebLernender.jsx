import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LehrbetriebLernender() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: `https://api.test/lehrbetrieb_lernende/${id}`, method: 'GET' });
  }, [doRequest, id]);

  const handleDelete = async () => {
    await doRequest({ url: `https://api.test/lehrbetrieb_lernende/${id}`, method: 'DELETE' });
    navigate('/lehrbetrieb-lernende');
  };

  return (
    <>
      <h1>Lehrbetrieb-Lernende | Detail</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className="error" key={index}>
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

      {!loading && !error && data && (
        <div>
          <h2>Firma: {data.firma}</h2>
          <p>Lernende/r: {data.vorname} {data.nachname}</p>
          <p>Beruf: {data.beruf ?? '–'}</p>
          <p>Von: {data.start} | Bis: {data.ende}</p>

          <div className="actions">
            <Link to={`/lehrbetrieb-lernender-anpassen/${data.id_lehrbetrieb_lernende}`}>
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

export default LehrbetriebLernender;
