// Import the useContext hook
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

   const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
    navigate('/');
  };

  return (
    <nav>
      
      <Link to="/"> 
        <img src='https://res.cloudinary.com/dnmdmz7qo/image/upload/v1763392104/collection-of-simple-house-logo-designs-isolated-png_vno8iu.webp'
             alt='Home'/>
      </Link>

      <ul>
        {!user ? (
            <li> <Link to="/sign-in"> Log In </Link> </li>
        ) : (
          <>
            <li> <span>Hi, {user.username}</span> </li>

            {user.role === 'Customer' && (
              <>
                <li> <Link to="/"> Home </Link> </li>
                <li> <Link to={`/userBookings/${user._id}`}> My Bookings </Link> </li>
              </>
            )}

            {user.role === 'Owner' && (
              <>
              <li> <Link to="/"> Home </Link></li>
                <li> <Link to="/apartments/new"> Add Apartment </Link> </li>
                <li> <Link to="/apartments"> Apartment List </Link> </li>
              </>
            )}

            <li> <button onClick={handleSignOut}> Sign Out </button> </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;