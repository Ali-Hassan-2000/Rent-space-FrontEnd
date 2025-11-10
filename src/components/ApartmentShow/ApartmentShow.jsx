import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { userContext } from 'react';
import { UserContext, userContext } from '../../contexts/UserContext';

const API = 'http://localhost:3000';

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
        

}


