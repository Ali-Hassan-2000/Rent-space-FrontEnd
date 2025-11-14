import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
const userBookings = ({userId}) => {
  const [bookings,setBookings] = useState([])
const [loading,setLoading] = useState(false)
const [err,setErr] = useState('')
const BEurl = import.meta.env.VITE_BACK_END_SERVER_URL
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };
useEffect(() => {
    if (!user) return;
    fetchUserBookings() 
},[userId])
const fetchUserBookings = async () => {
  try{
    setLoading(true)
    setErr('')
    const headers = getAuthHeaders();
    const res = await fetch(`${BEurl}/userBookings/${userId}`,
      {headers,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch bookings');
      }
      setBookings(data)
  }
  catch (err) {
    console.log(err);
  } finally {
    setLoading(false)
  }
}
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
    if (!user || !userId) {
    return (
      <main className="user-bookings-container">
        <p>Please sign in to view your bookings.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="user-bookings-container">
        <p>Loading your bookings...</p>
      </main>
    );
  }

  if (err) {
    return (
      <main className="user-bookings-container">
        <div className="error-message">{err}</div>
        <button onClick={fetchUserBookings} className="retry-button">
          Retry
        </button>
      </main>
    );
  }

  if (bookings.length === 0) {
    return (
      <main className="user-bookings-container">
        <h1>My Bookings</h1>
        <p className="no-bookings">You haven't made any bookings yet.</p>
      </main>
    );
  }

  return (
    <main className="user-bookings-container">
      <h1>My Bookings</h1>
      <div className="bookings-grid">
        {bookings.map((booking, idx) => (
          <div key={idx} className="booking-card">
            <div className="booking-header">
              <h2>{booking.apartmentName || 'Apartment'}</h2>
            </div>

            <div className="booking-details">
              <div className="detail-row">
                <span className="label">Check-in</span>
                <span className="value">{formatDate(booking.startDate)}</span>
              </div>

              <div className="detail-row">
                <span className="label">Check-out</span>
                <span className="value">{formatDate(booking.endDate)}</span>
              </div>

              <div className="detail-row">
                <span className="label">Nights</span>
                <span className="value">{calculateNights(booking.startDate, booking.endDate)}</span>
              </div>

              <div className="detail-row">
                <span className="label">Total Price</span>
                <span className="value price">${booking.totalPrice}</span>
              </div>
            </div>

            <div className="booking-footer">
              <span className="booking-status">Confirmed</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
  

}
export default userBookings;