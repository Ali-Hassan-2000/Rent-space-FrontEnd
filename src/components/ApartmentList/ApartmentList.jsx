import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { index as getApartments } from '../../services/apartmentService';

const ApartmentList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();    
}


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

