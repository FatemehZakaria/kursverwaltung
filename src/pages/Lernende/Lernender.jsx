import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function Lernender() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: `https://api.test/lernende/${id}`, method: 'GET' });
  }, [doRequest, id]);

  const handleDelete = async () => {
    const res = await doRequest({
      url: `https://api.test/lernende/${id}`,
      method: 'DELETE',
    });
    if (res.success) {
      navigate('/lernende');
    }
  };

  return (
    <>
      <h1>Lernender | Detail</h1>

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
          <h2>{data.vorname} {data.nachname}</h2>
          <p>Strasse: {data.strasse}</p>
          <p>PLZ: {data.plz}</p>
          <p>Ort: {data.ort}</p>
          <p>Land: {data.country_name}</p>
          <p>Geschlecht: {data.geschlecht}</p>
          <p>Telefon: {data.telefon}</p>
          <p>Handy: {data.handy}</p>
          <p>Email (geschäftlich): {data.email}</p>
          <p>Email (privat): {data.email_privat}</p>
          <p>Geburtsdatum: {data.birthdate}</p>

          <div className="actions">
            <Link to={`/lernender-anpassen/${data.id_lernende}`}>Bearbeiten</Link>
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

export default Lernender;
