import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LandAnpassen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, doRequest } = useApi();

  const [country, setCountry] = useState('');

  useEffect(() => {
    (async function fetchLand() {
      const res = await doRequest({
        url: `https://api.test/laender/${id}`, 
        method: 'GET',
      });

      if (res.success) {
        setCountry(res.data.country ?? '');
      }
    })();
  }, [doRequest, id]);

  const handleUpdate = async () => {
    const res = await doRequest({
      url: `https://api.test/laender/${id}`, 
      method: 'PUT',
      body: {
        country
      },
    });

    if (res.success) {
      navigate('/laender');
    }
  };

  return (
    <div>
      <h1>Land bearbeiten</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className="error" key={index}>{`${errMsg}`}</p>
          ))}
        </div>
      )}

      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <label>Land:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          Speichern
        </button>
      </form>
    </div>
  );
}

export default LandAnpassen;
