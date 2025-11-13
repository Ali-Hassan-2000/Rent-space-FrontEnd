import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const CityShow = () => {
    const {city} = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    

    useEffect(() => { 
        fetch(`${API}/apartments?city=${encodeURIComponent(city)}`)
        .then(r => r.json())
        .then(d => {setItems(Array.isArray(d) ? d : []); setLoading(false); })
        .catch(() => setLoading(false));
    }, [city]);

    if (loading) return <main>Loading...</main>;

    return (
        <main>
            <h1>{city}</h1>
            {items.length === 0 ? ( 
                <p>No apartments found</p>
            ) : (
                <ul>
                    {items.map(a => (
                        <li key={a._id}>
                            <link to={`/apartments/${a._id}`}>
                            {a.ApartmentName} - {a.ApartmentCity} - {a.ApartmentPrice}
                            </link>
                        </li>
                    ))}
                </ul>
                )}
        </main>
    );
};


export default CityShow;

