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
  const calcTotalRevenue = () => {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0);
  };
  

}
