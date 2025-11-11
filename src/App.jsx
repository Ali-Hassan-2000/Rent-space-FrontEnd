import { Routes, Route, Navigate } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
          <Route path='/' element={<Home/>}/>
            {/*
                        <Route path='/products' element={<h1>Producs</h1>}/>
            <Route path='/favs' element={<h1>Favs</h1>}/>
            <Route path='/profile' element={<h1>{user.username}</h1>}/>
            <Route path='/orders' element={<h1>ORDERS</h1>}/>

            */}
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        
        <Route path= '*' element={<Navigate to = '/' replace />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;