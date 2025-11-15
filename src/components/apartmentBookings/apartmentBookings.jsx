import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const ApartmentBookings = () => {
  const { apartmentId } = useParams();
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BEurl = import.meta.env.VITE_BACK_END_SERVER_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchApartmentBookings = async () => {
    try {
      setLoading(true);
      setError('');

      const headers = getAuthHeaders();
      // backend route for apartment bookings
      const res = await fetch(
        `${BEurl}/bookings/apartmentBookings/${apartmentId}`,
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!apartmentId) return;
    fetchApartmentBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartmentId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  const calcNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };
  const calcTotalRevenue = () => {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0);
  };

  if (loading) {
    return (
      <div className='apartment-container'>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='apartment-container'>
        <div>{error}</div>
        <button onClick={fetchApartmentBookings}>
          Retry
        </button>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className='apartment-container'>
        <h2>Apartment Bookings</h2>
        <p>No bookings yet for this apartment.</p>
      </div>
    );
  }

  return (
    <div className="apartment-container">
      <h2>Apartment Bookings</h2>

      <div className="revenue-summary">
        <div className="summary-card">
          <span className="label">Total Bookings</span>
          <span className="value">{bookings.length}</span>
        </div>
        <div className="summary-card">
          <span className="label">Total Revenue</span>
          <span className="value">${calcTotalRevenue()}</span>
        </div>
      </div>

      <div className="bookings-table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Nights</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{formatDate(booking.startDate)}</td>
                <td>{formatDate(booking.endDate)}</td>
                <td>{calcNights(booking.startDate, booking.endDate)}</td>
                <td className="price">${booking.totalPrice}</td>
                <td>
                  <span className="status-badge">Confirmed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApartmentBookings;