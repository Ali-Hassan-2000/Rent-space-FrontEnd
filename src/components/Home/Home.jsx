import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { index as getApartments } from '../../services/apartmentService';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getApartments();
        setApartments(data);

        const uniqueCities = [...new Set(data.map(a => a.ApartmentCity))];
        setCities(uniqueCities);
      } catch (err) {
        console.error('Error fetching apartments:', err);
        setError('Failed to load apartments.');
      } finally {
        setLoading(false);
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
      .sort((a, b) => (b.ApartmentRating || 0) - (a.ApartmentRating || 0))
      .slice(0, 5);
  };

  if (loading) return <p>Loading apartments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      {cities.length === 0 && <p>No apartments found.</p>}

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
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />

                  <div>
                    <h3>{apt.ApartmentName}</h3>
                    <p>${apt.ApartmentPrice} / night</p>
                    <p>⭐ {apt.ApartmentRating || 'N/A'}</p>
                    <p>❤️ {apt.FavoriteCount || 0} favorites</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Home;