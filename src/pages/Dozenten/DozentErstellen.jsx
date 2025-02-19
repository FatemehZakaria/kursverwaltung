import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function DozentErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [fk_land, setFkLand] = useState('');
  const [geschlecht, setGeschlecht] = useState('');
  const [telefon, setTelefon] = useState('');
  const [handy, setHandy] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [countries, setCountries] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    (async function fetchCountries() {
      const res = await doRequest({ url: 'https://api.test/laender', method: 'GET' });
      if (res.success) {
        setCountries(res.data);
      }
    })();
  }, [doRequest]);

  const handleCreate = async () => {
    if (isSubmitting || loading) return; 
    setIsSubmitting(true);
    setSuccessMessage('');

    const result = await doRequest({
      url: 'https://api.test/dozenten',
      method: 'POST',
      body: {
        vorname,
        nachname,
        strasse,
        plz,
        ort,
        fk_land,
        geschlecht,
        telefon,
        handy,
        email,
        birthdate,
      },
    });

    if (result.success) {
      navigate('/dozenten'); 
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>Neuen Dozenten hinzufügen</h1>

      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <label>Vorname:</label>
        <input type="text" value={vorname} onChange={(e) => setVorname(e.target.value)} required />

        <label>Nachname:</label>
        <input type="text" value={nachname} onChange={(e) => setNachname(e.target.value)} required />

        <label>Strasse:</label>
        <input type="text" value={strasse} onChange={(e) => setStrasse(e.target.value)} required />

        <label>PLZ:</label>
        <input type="text" value={plz} onChange={(e) => setPlz(e.target.value)} required />

        <label>Ort:</label>
        <input type="text" value={ort} onChange={(e) => setOrt(e.target.value)} required />

        <label>Land:</label>
        <select value={fk_land} onChange={(e) => setFkLand(e.target.value)} required>
          <option value="">Bitte wählen</option>
          {countries.map((country) => (
            <option key={country.id_countries} value={country.id_countries}>
              {country.country}
            </option>
          ))}
        </select>

        <label>Geschlecht:</label>
        <select value={geschlecht} onChange={(e) => setGeschlecht(e.target.value)} required>
          <option value="">Bitte wählen</option>
          <option value="M">Männlich</option>
          <option value="F">Weiblich</option>
          <option value="D">Divers</option>
        </select>

        <label>Telefon:</label>
        <input type="text" value={telefon} onChange={(e) => setTelefon(e.target.value)} />

        <label>Handy:</label>
        <input type="text" value={handy} onChange={(e) => setHandy(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Geburtsdatum:</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />

        <button type="submit" disabled={loading || isSubmitting}>
          {loading || isSubmitting ? 'Speichert...' : 'Erstellen'}
        </button>
      </form>
    </>
  );
}

export default DozentErstellen;
