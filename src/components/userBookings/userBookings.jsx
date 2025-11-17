import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
const BEurl = import.meta.env.VITE_BACK_END_SERVER_URL;
const UserBookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!user) return;
    fetchUserBookings();
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      setErr('');

      
      const res = await fetch(`${BEurl}/apartments`);
      if (!res.ok) throw new Error('Failed to fetch apartments');
      const apartments = await res.json();
      const customerBookings = [];
      apartments.forEach((apt) => {
        if (apt.BookingCalendar && Array.isArray(apt.BookingCalendar)) {
          apt.BookingCalendar.forEach((booking) => {
            if (String(booking.userId) === String(user.id)) {
              customerBookings.push({
                bookingId: booking._id,
                apartmentId: apt._id,
                apartmentName: apt.ApartmentName,
                apartmentImg: apt.ApartmentImg?.[0]?.url || null,
                apartmentPrice: apt.ApartmentPrice,
                startDate: booking.startDate,
                endDate: booking.endDate,
                totalPrice: booking.totalPrice,
              });
            }
          });
        }
      });

      setBookings(customerBookings);
    } catch (err) {
      console.error(err);
      setErr(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };
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
    if (!user) {
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
                <span className="value">{calcNights(booking.startDate, booking.endDate)}</span>
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
export default UserBookings;