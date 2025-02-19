import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

function LernenderErstellen() {
  const navigate = useNavigate();
  const { doRequest, error, loading } = useApi();

  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [fk_land, setFkLand] = useState('');
  const [geschlecht, setGeschlecht] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [telefon, setTelefon] = useState('');
  const [handy, setHandy] = useState('');
  const [emailPrivat, setEmailPrivat] = useState('');

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async function fetchCountries() {
      const res = await doRequest({
        url: 'https://api.test/laender',
        method: 'GET',
      });
      if (res.success) {
        setCountries(res.data);
      }
    })();
  }, [doRequest]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await doRequest({
      url: 'https://api.test/lernende',
      method: 'POST',
      body: {
        vorname,
        nachname,
        strasse,
        plz,
        ort,
        fk_land,
        geschlecht,
        email,
        email_privat: emailPrivat,
        birthdate,
        telefon,
        handy,
      },
    });
    if (result.success) {
      navigate('/lernende');
    }
  };

  return (
    <>
      <h1>Neuen Lernenden hinzufügen</h1>

      {error && Object.keys(error).length > 0 && (
        <div>
          {Object.entries(error).map(([field, errMsg], idx) => (
            <p className="error" key={idx}>{errMsg}</p>
          ))}
        </div>
      )}
      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}

      <form onSubmit={handleCreate}>
        <label>Vorname:</label>
        <input
          type="text"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
          required
        />

        <label>Nachname:</label>
        <input
          type="text"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
          required
        />

        <label>Strasse:</label>
        <input
          type="text"
          value={strasse}
          onChange={(e) => setStrasse(e.target.value)}
          required
        />

        <label>PLZ:</label>
        <input
          type="text"
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
          required
        />

        <label>Ort:</label>
        <input
          type="text"
          value={ort}
          onChange={(e) => setOrt(e.target.value)}
          required
        />

        <label>Land:</label>
        <select
          value={fk_land}
          onChange={(e) => setFkLand(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          {countries.map((c) => (
            <option key={c.id_countries} value={c.id_countries}>
              {c.country}
            </option>
          ))}
        </select>

        <label>Geschlecht:</label>
        <select
          value={geschlecht}
          onChange={(e) => setGeschlecht(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          <option value="M">Männlich</option>
          <option value="F">Weiblich</option>
          <option value="D">Divers</option>
        </select>

        <label>E-Mail (geschäftlich):</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Geburtsdatum:</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />

        <label>Telefon:</label>
        <input
          type="text"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          required
        />

        <label>Handy:</label>
        <input
          type="text"
          value={handy}
          onChange={(e) => setHandy(e.target.value)}
          required
        />

        <label>E-Mail (privat):</label>
        <input
          type="email"
          value={emailPrivat}
          onChange={(e) => setEmailPrivat(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Speichert...' : 'Erstellen'}
        </button>
      </form>
    </>
  );
}

export default LernenderErstellen;
