import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DateRange } from 'react-date-range';
import { UserContext } from '../../contexts/UserContext';


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

 
const backendUrl = import.meta.env.VITE_BACK_END_SERVER_URL;

  // Fetch booked dates on component mount
  useEffect(() => {
    fetchBookedDates();
  }, [apartmentId]);

  const fetchBookedDates = async () => {
    try {
      setLoadingBookedDates(true);
      const res = await fetch(
        `${backendUrl}/apartments/apartment/${apartmentId}/bookedDates`
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

      const res = await fetch(`${backendUrl}/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      navigate(`/user-bookings/${user.id}`);
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
    <h1>ff</h1>
  );
};

export default BookingForm;