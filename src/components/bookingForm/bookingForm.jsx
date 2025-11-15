import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { UserContext } from '../../contexts/UserContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './bookingForm.css';

const BookingForm = ({ apartmentId, apartmentPrice }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: 'selection',
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingBookedDates, setLoadingBookedDates] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

 
const BEurl = import.meta.env.VITE_BACK_END_SERVER_URL;

  // Fetch booked dates on component mount
  useEffect(() => {
    fetchBookedDates();
  }, [apartmentId]);

  const fetchBookedDates = async () => {
    try {
      setLoadingBookedDates(true);
      const res = await fetch(
        `${BEurl}/apartment/${apartmentId}/bookedDates`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch booked dates');
      }
    } catch (err) {
      console.error('Error fetching booked dates:', err);
    } finally {
      setLoadingBookedDates(false);
    }
  };

  // Calculate total price based on date range
  const calculateTotalPrice = (start, end) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, days) * apartmentPrice;
  };

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
    const price = calculateTotalPrice(item.selection.startDate, item.selection.endDate);
    setTotalPrice(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!user) {
      setError('Please sign in to book');
      setIsLoading(false);
      return;
    }

    const bookingData = {
      apartmentId,
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
    };

    try {
      const headers = getAuthHeaders();

      const res = await fetch(`${BEurl}/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      navigate(`/bookings`);
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingBookedDates) {
    return <div className="booking-form-container">Loading available dates...</div>;
  }

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Book This Apartment</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <label htmlFor="dates">Select Dates</label>
          <DateRange
            ranges={dateRange}
            onChange={handleDateChange}
            minDate={new Date()}
            rangeColors={['#3b82f6']}
            className="date-range-picker"
          />
        </div>

        <div className="price-summary">
          <div className="price-row">
            <span>Price per night</span>
            <span>${apartmentPrice}</span>
          </div>
          <div className="price-row">
            <span>Number of nights</span>
            <span>
              {Math.ceil(
                (dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </span>
          </div>
          <div className="price-total">
            <span>Total Price</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;