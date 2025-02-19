import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

const Lehrbetrieb = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        doRequest({ url: `https://api.test/lehrbetriebe/${id}` });
    }, [doRequest, id]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/lehrbetriebe/${id}`, method: 'DELETE' });
        navigate('/lehrbetriebe');
    };

    return (
        <>
            <h1>Lehrbetrieb | Detailansicht</h1>

            {error && Object.keys(error).length > 0 && (
                <div>
                    {Object.entries(error).map(([field, errMsg], index) => (
                        <p key={index}>{`${field}: ${errMsg}`}</p>
                    ))}
                </div>
            )}

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {!loading && !error && data && (
                <div key={data.id_lehrbetrieb}>
                    <h2>{data.firma}</h2>
                    <p className='street'>{data.strasse || 'Keine Strasse vorhanden'}</p>
                    <div className='address'>
                        <span>{data.plz || 'Keine PLZ vorhanden'}</span>
                        <span>&nbsp;</span>
                        <span>{data.ort || 'Kein Ort vorhanden'}</span>
                    </div>
                    <div className='actions'>
                        <Link to={`/lehrbetrieb-anpassen/${data.id_lehrbetrieb}`}>Bearbeiten</Link>
                        <p>|</p>
                        <button className='link' onClick={() => handleDelete(data.id_lehrbetrieb)}><span>Löschen</span></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Lehrbetrieb;