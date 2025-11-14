import { useEffect, useState } from "react";
import { useContext } from "react";

const [bookings,setBookings] = useState([])
const [loading,setLoading] = useState(false)
const [err,setErr] = useState('')

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };
useEffect()