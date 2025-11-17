import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router';
import { index as getApartments } from '../../services/apartmentService';
import { destroy } from "../../services/apartmentService";

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

  const handleDelete = async (apartmentId) => {
    if (!window.confirm("Are you sure you want to delete this apartment?")) return;

    try {
      await destroy(apartmentId);
      window.location.reload(); // refresh so list updates
    } catch (err) {
      alert(err.message);
    }
  };
    
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

                        <div>
              
                            <Link to={`/apartments/edit/${ap._id}`}>
                                <button>Edit</button>
                            </Link>

                            <button onClick={() => handleDelete(ap._id)}>
                                Delete
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
            </main>
);
};
export default ApartmentList;