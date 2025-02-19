import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function DozentAnpassen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, doRequest } = useApi();

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
    (async function fetchDozent() {
      const res = await doRequest({ url: `https://api.test/dozenten/${id}`, method: 'GET' });
      if (res.success) {
        setVorname(res.data.vorname || '');
        setNachname(res.data.nachname || '');
        setStrasse(res.data.strasse || '');
        setPlz(res.data.plz || '');
        setOrt(res.data.ort || '');
        setFkLand(res.data.fk_land || '');
        setGeschlecht(res.data.geschlecht || '');
        setTelefon(res.data.telefon || '');
        setHandy(res.data.handy || '');
        setEmail(res.data.email || '');
        setBirthdate(res.data.birthdate ? res.data.birthdate.substring(0, 10) : '');
      }
    })();
  }, [doRequest, id]);

  useEffect(() => {
    (async function fetchCountries() {
      const res = await doRequest({ url: 'https://api.test/laender', method: 'GET' });
      if (res.success) {
        setCountries(res.data);
      }
    })();
  }, [doRequest]);

  const handleUpdate = async () => {
    if (isSubmitting || loading) return;
    setIsSubmitting(true);
    setSuccessMessage('');

    const result = await doRequest({
      url: `https://api.test/dozenten/${id}`,
      method: 'PUT',
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
      navigate(`/dozenten/${id}`);
    } 
  };

  return (
    <>
      <h1>Dozent bearbeiten</h1>

      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
      {error && Object.keys(error).length > 0 && (
          <div>
              {Object.entries(error).map(([field, errMsg], index) => (
                  <p className='error' key={index}>{`${errMsg}`}</p>
              ))}
          </div>
      )}
      {loading && <div className="spinner"><div></div></div>}

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
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
          {loading || isSubmitting ? 'Speichert...' : 'Speichern'}
        </button>
      </form>
    </>
  );
}

export default DozentAnpassen;
