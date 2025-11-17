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

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const res = await fetch(`${BEurl}/bookings/userBookings/${user._id}`, {
      headers
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch bookings');

    setBookings(data); // backend already sends correct structure

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
    <div className="booking-table-container">
      <h2>Your Bookings</h2>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Apartment</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.apartmentName}</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{b.totalPrice} BD</td>
                <td>{b.status || "Confirmed"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
  

}
export default UserBookings;