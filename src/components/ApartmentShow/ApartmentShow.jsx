import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as apartmentService from '../../services/apartmentService';

const ApartmentShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [apt, setApt] = useState(null);
     const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('No apartment id provided in route params.');
            setLoading(false);
      return;
        }
      
        fetchApt();
        
        const fetchApt = async () => {
            setLoading(true);
            setError(null)
            try{

                const res = await apartmentService.getApartment(id);
                const data = res?.data ?? res;
        if (!data) {
          throw new Error('Apartment not found (empty response).');
        }
        setApt(data);
            }
            catch (err){
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        };
        fetchApt();
         }, [id]);

    if (loading) return <div>Loading apartment...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apt) return <div>No apartment data.</div>;

    const handleFavorite = () => {
        if (!user) {
            navigate (`/sign-in?next=/apartments${id}`);
            return;
        }
    };

    const handleBookNow = () => {
        if (!user) {
            navigate (`/sign-in?next=/apartments${id}`);
            return
        }
        navigate(`/booking/new?apartmentId=${apartmentId}`);
    };

    return (
        <main>
            <section>
                <h1>{apt.ApartmentName}</h1>
                <button onClick={handleFavorite}>Favorite</button>
            </section>

            <section>
                <h2>Apartment location</h2>
                <p>{apt.ApartmentCity}</p>
            </section>

            <section>
                <h2>Apartment offers</h2>
                <p>{apt.ApartmentOffering}</p>
            </section>

            <aside>
                <div>
                    <label>starting date</label><br />
                    <input
                    type="data"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Apartment Price (per day)</h3>
                    <p>{apt.ApartmentPrice}</p>
                </div>

                <button onClick={handleBookNow}>Book now</button>
            </aside>
        </main>
    );

};

export default ApartmentShow;


