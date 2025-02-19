import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function Kurs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();
  const [dozent, setDozent] = useState(null);

  useEffect(() => {
    (async function fetchKurs() {
      const res = await doRequest({ url: `https://api.test/kurse/${id}`, method: 'GET' });
      if (res.success) {
        console.log(data);
      }
    })();
  }, [doRequest, id]);

  const handleDelete = async () => {
    await doRequest({ url: `https://api.test/kurse/${id}`, method: 'DELETE' });
    navigate('/kurse');
  };

  return (
    <>
      <h1>Kurs | Detailansicht</h1>
      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      {!loading && !error && data && (
        <div key={data.id_kurs}>
          <h2>{data.kursnummer} - {data.kursthema}</h2>
          <p>Inhalt: {data.inhalt}</p>
          <p>Startdatum: {data.startdatum} | Enddatum: {data.enddatum}</p>
          <p>Dauer: {data.dauer} Tage</p>
          
          <p>Dozent: {data.dozent_vorname && data.dozent_nachname ? `${data.dozent_vorname} ${data.dozent_nachname}` : 'Kein Dozent zugewiesen'}</p>

          <div className="actions">
            <Link to={`/kurs-anpassen/${data.id_kurs}`}>Bearbeiten</Link>
            <p>|</p>
            <button className="link" onClick={handleDelete}><span>Löschen</span></button>
          </div>
        </div>
      )}
    </>
  );
}

export default Kurs;
