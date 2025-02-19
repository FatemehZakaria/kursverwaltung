import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';
 
function Lehrbetriebe() {
    const { data, error, loading, doRequest } = useApi();
  
    useEffect(() => {
      doRequest({ url: 'https://api.test/lehrbetriebe', method: 'GET' });
    }, [doRequest]);
  
    const handleDelete = async (id) => {
      const res = await doRequest({
        url: `https://api.test/lehrbetriebe/${id}`,
        method: 'DELETE'
      });
      if (res.success) {
        doRequest({ url: 'https://api.test/lehrbetriebe', method: 'GET' });
      }
    };
 
    return (
        <>
            <h1>Lehrbetriebe</h1>
 
            <Link to={`/lehrbetrieb-erstellen`}>Neuen Lehrbetrieb hinzufügen</Link>
 
            {error && Object.keys(error).length > 0 && (
                <div>
                    {Object.entries(error).map(([field, errMsg], index) => (
                        <p key={index}>{`${errMsg}`}</p>
                    ))}
                </div>
            )}
 
            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {!loading && !error && data?.length > 0 && (
                    <>
                        {data.map(({ id_lehrbetrieb, firma, strasse, plz, ort }) => (
                            <div key={id_lehrbetrieb}>
                                <h2><Link to={`/lehrbetriebe/${id_lehrbetrieb}`}>{firma}</Link></h2>
                                <p className='street'>{strasse || 'Keine Strasse vorhanden'}</p>
                                <div className='address'>
                                    <span>{plz || 'Keine PLZ vorhanden'}</span>
                                    <span>&nbsp;</span>
                                    <span>{ort || 'Kein Ort vorhanden'}</span>
                                </div>
                                <div className='actions'>
                                    <Link to={`/lehrbetrieb-anpassen/${id_lehrbetrieb}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <button className='link' onClick={() => handleDelete(id_lehrbetrieb)}><span>Löschen</span></button>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Lehrbetriebe.</p>
                )
            }
        </>
    );
}
 
export default Lehrbetriebe;