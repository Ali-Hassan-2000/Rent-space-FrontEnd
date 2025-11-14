import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './ApartmentBookings.css';

const ApartmentBookings = ({ apartmentId }) => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const BEurl = import.meta.env.VITE_BACK_END_SERVER_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };
  useEffect(()=> {
    if (!apartmentId) return;
    fetchApartmentBooking();
  },[apartmentId]);
}
const fetchApartmentBooking = async () => {
    try {
      setIsLoading(true);
      setError('');

      const headers = getAuthHeaders();
      const res = await fetch(
        `${backendUrl}/apartmentBookings/${apartmentId}`,
        { headers }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch bookings');
      }

      setBookings(data);
    } catch (err) {
      console.error('Error fetching apartment bookings:', err);
      setError(err.message || 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };
  if (isLoading) {
    return (
      <div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>{error}</div>
        <button onClick={fetchApartmentBookings}>
          Retry
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div>
        <h2>Apartment Bookings</h2>
        <p>No bookings yet for this apartment.</p>
      </div>
    );
  }
  return(
    <h1></h1>
  )
};