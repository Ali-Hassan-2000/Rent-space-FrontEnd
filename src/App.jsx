import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Footer from './components/Footer/Footer';
import AddApartmentForm from './components/AddApartment/AddApartmentForm';
import ApartmentShow from './components/ApartmentShow/ApartmentShow';
import BookingForm from './components/bookingForm/bookingForm.jsx';
import CityShow from './components/CityShow/CityShow';
import UserBookings from './components/userBookings/userBookings';
import ApartmentBookings from './components/apartmentBookings/apartmentBookings';
import ApartmentList from './components/ApartmentList/ApartmentList';
import UpdateApartmentForm from './components/UpdateApartment/UpdateApartmentForm';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/apartments/new' element={<AddApartmentForm />} />
        <Route path='/apartments/edit/:apartmentId' element={<UpdateApartmentForm />} />
        <Route path='/apartments/:apartmentId' element={<ApartmentShow />} />
        <Route path='/apartments/:apartmentId/bookings' element={<ApartmentBookings />} />
        <Route path="/booking/:apartmentId" element={<BookingForm />} />
        <Route path="/userBookings/:userId" element={<UserBookings />} />
        <Route path="/apartments" element={<ApartmentList />} />
        <Route path='/cities/:city' element={<CityShow />}/>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;