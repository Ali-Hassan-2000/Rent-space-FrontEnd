import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const CityShow = () => {
    const {city} = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    

    useEffect(() => { 
        fetch(`apartments`)
        .then(r => r.json())
        .then((d) => {
            const filtered = Array.isArray(d)
            ? d.filter(
            (apt) =>
                apt.ApartmentCity &&
            apt.ApartmentCity.toLowerCase() === city.toLowerCase()
        )
        : [];
        setItems(filtered);
        setLoading(false);
        })

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
                            <button onClick={() => navigate(`/apartments/${a._id}`)}>
                            {a.ApartmentName} - {a.ApartmentCity} - {a.ApartmentPrice}
                            </button>
                        </li>
                    ))}
                </ul>
                )}
        </main>
    );
};


export default CityShow;

