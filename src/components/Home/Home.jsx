import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // Fetch apartments from backend
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/apartments`);
        const data = await res.json();
        setApartments(data);

        // Group apartments by city
        const cityGroups = [...new Set(data.map(a => a.ApartmentCity))];
        setCities(cityGroups);
      } catch (err) {
        console.log('Error fetching apartments:', err);
      }
    };
    fetchApartments();
  }, []);

  // Function to navigate to city page
  const handleCityClick = (city) => {
    navigate(`/city/${city}`);
  };

  // Get top 4-5 apartments by rating per city
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