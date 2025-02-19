import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LandErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [country, setCountry] = useState('');

  const handleCreate = async () => {
    const res = await doRequest({
      url: 'https://api.test/laender',  
      method: 'POST',
      body: { country },
    });

    if (res.success) {
      navigate('/laender');
    }
  };

  return (
    <div>
      <h1>Neues Land erstellen</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], index) => (
            <p className='error' key={index}>{`${errMsg}`}</p>
          ))}
        </div>
      )}

      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <label>Land:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          Erstellen
        </button>
      </form>
    </div>
  );
}

export default LandErstellen;
