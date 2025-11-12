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

 

  return (
    <h1>ff</h1>
  );
};

export default BookingForm;
