import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { userContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const ApartmentShow = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [apt, setApt] = useState(null);
    const [startDate, setStartDtae] = useState('');

    useEffect(() => {
        fetch(`${API}/apartments/$[id]`)
        .then((res) => res.json())
        .then((data) => setApt(data));
    }, [id]);

    if (!apt) return <main>Loading...</main>;

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
        navigate(`/booking-form/${id}`);
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


