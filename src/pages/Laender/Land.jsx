// src/pages/Laender/Land.jsx
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function Land() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();

  useEffect(() => {
    doRequest({ url: `https://api.test/laender/${id}`, method: 'GET' });
  }, [doRequest, id]);

  const handleDelete = async () => {
    await doRequest({ url: `https://api.test/laender/${id}`, method: 'DELETE' });
    navigate('/laender');
  };

  return (
    <>
      <h1>Land | Detailansicht</h1>
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
          <h2>{data.country}</h2>
          <div className="actions">
            <Link to={`/land-anpassen/${data.id_countries}`}>Bearbeiten</Link>
            <p>|</p>
            <button onClick={handleDelete} className="link">
              <span>Löschen</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Land;
