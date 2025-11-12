import { Routes, Route, Navigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Footer from './components/Footer/Footer';
import AddApartmentForm from './components/AddApartment/AddApartmnetForm';

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
        
        <Route path= '*' element={<Navigate to = '/' replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;