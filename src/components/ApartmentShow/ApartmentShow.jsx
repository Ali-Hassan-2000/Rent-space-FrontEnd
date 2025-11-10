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
        (async() => {
            try {
                const res = await fetch (`${API}/apartments/${id}`);
                const data = await res.json();
                setApt(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [id]);
    
}


