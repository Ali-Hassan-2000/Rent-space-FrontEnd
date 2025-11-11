import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { index as getApartments } from '../services/apartmentService';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // Fetch apartments from backend
  useEffect(() => {
    
    const fetchApartments = async () => {
        try {
        const data = await getApartments();
        setApartments(data);
        } catch (err) {
        console.error(err);
        }
    };

    fetchApartments();
  }, []);

  
  const handleCityClick = (city) => {
    navigate(`/city/${city}`);
  };

  
  const getTopRatedApartments = (city) => {
    return apartments
      .filter(a => a.ApartmentCity === city)
      .sort((a, b) => b.ApartmentRating - a.ApartmentRating)
      .slice(0, 5);
  };

  return (
    <>
      <main>
        {cities.map((city) => {
          const cityApts = getTopRatedApartments(city);
          if (cityApts.length === 0) return null;

          return (
            <section key={city}>
              <h2 onClick={() => handleCityClick(city)}> {city} </h2>

              <div>
                {cityApts.map((apt) => (
                  <div key={apt._id}>
                    <img
                      src={apt.ApartmentImg?.[0]?.url || '/placeholder.jpg'}
                      alt={apt.ApartmentName}
                    />

                    <div>
                      <h3>{apt.ApartmentName}</h3>
                      <p>${apt.ApartmentPrice} / night</p>
                      <p>⭐ {apt.ApartmentRating || 'N/A'}</p>
                      <p> ❤️ {apt.FavoriteCount || 0} favorites </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
};

export default Home;