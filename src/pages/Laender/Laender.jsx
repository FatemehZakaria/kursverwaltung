import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/lehrbetriebe.css';
 
function Laender() {
    const { data, error, loading, doRequest } = useApi();
 
    useEffect(() => {
        doRequest({ url: 'https://api.test/laender', method: 'GET' });
    }, [doRequest]);
 
    const handleDelete = async (id) => {
        const result = await doRequest({ url: `https://api.test/laender/${id}`, method: 'DELETE' });
        if (result.success) {
            doRequest({ url: 'https://api.test/laender', method: 'GET' });
        } else {
            console.error('Deletion failed:', result.error);
        }
    };
 
    return (
        <>
            <h1>Länder</h1>
 
            <Link to={`/land-erstellen`}>Neues Land hinzufügen</Link>
 
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
            {!loading && !error && data?.length > 0 &&
                (
                    <>
                        {data.map(({ id_countries, country }) => (
                            <div key={id_countries}>
                                <h2><Link to={`/laender/${id_countries}`}>{country}</Link></h2>
                                <div className='actions'>
                                    <Link to={`/land-anpassen/${id_countries}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <button className='link' onClick={() => handleDelete(id_countries)}><span>Löschen</span></button>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Länder.</p>
                )
            }
        </>
    );
}
 
export default Laender;