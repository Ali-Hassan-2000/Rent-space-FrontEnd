import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as apartmentService from '../../services/apartmentService';

const ApartmentShow = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [apt, setApt] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!apartmentId) {
            setError('No apartment id provided in route params.');
            setLoading(false);
            return;
        }

        const fetchApt = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await apartmentService.getApartment(apartmentId);
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
    }, [apartmentId]);

    if (loading) return <div>Loading apartment...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!apt) return <div>No apartment data.</div>;

    const handleFavorite = () => {
        if (!user) {
            navigate(`/sign-in?next=/apartments/${apartmentId}`);
            return;
        }
    };

    const handleBookNow = () => {
        if (!user) {
            navigate(`/sign-in?next=/apartments/${apartmentId}`);
            return;
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
                    <label>starting date</label>
                    <br />
                    <input
                        type="date"
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


