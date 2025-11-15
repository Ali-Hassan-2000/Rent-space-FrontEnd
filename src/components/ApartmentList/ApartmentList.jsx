import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { index as getApartments } from '../../services/apartmentService';

const ApartmentList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();    

  
useEffect(() => {
    (async () => {
        try {
            const data = await getApartments();
            setItems(Array.isArray(data) ? data : []);
        } catch (_) {
            setError('Failed to load apartments.');
        } finally {
            setLoading(false);
        }
    })();
}, []);

const open = (id) => navigate(`/apartments/${id}`);

if (loading) return <main>Loading...</main>;
if (error) return <main>{error}</main>;
if (items.length === 0) return <main>No apartments available</main>;

return (
        <main>
            <h1>All Apartments</h1>
            <ul>
                {items.map((a) => (
                    <li key={a._id}>
                        <button onClick={() => open(a._id)}>
                            {a.ApartmentName} - {a.ApartmentCity} - ${a.ApartmentPrice} - {a.ApartmentRating || 'N/A'}
                        </button>
                    </li>
                ))}
            </ul>
            </main>
);
};
export default ApartmentList;


