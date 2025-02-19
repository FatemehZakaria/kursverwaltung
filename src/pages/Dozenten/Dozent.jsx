import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function Dozent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: `https://api.test/dozenten/${id}`, method: 'GET' });
  }, [doRequest, id]);

  const handleDelete = async () => {
    const res = await doRequest({
      url: `https://api.test/dozenten/${id}`,
      method: 'DELETE',
    });
    if (res.success) {
      navigate('/dozenten');
    }
  };

  return (
    <>
      <h1>Dozent | Detail</h1>
      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      {!loading && !error && data && (
        <div>
          <h2>{data.vorname} {data.nachname}</h2>
          <p>Email: {data.email}</p>
          <p>Telefon: {data.telefon}</p>
          <p>Handy: {data.handy}</p>
          <p>Geburtsdatum: {data.birthdate}</p>
          <p>Geschlecht: {data.geschlecht}</p>
          <p>Ort: {data.ort}</p>
          <p>PLZ: {data.plz}</p>
          <p>Land: {data.country_name}</p>

          <div className="actions">
            <Link to={`/dozent-anpassen/${data.id_dozent}`}>Bearbeiten</Link>
            <p>|</p>
            <button className="link" onClick={handleDelete}><span>Löschen</span></button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dozent;
