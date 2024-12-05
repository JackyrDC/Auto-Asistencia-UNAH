import {useEffect, useState} from 'react';
import {AuthServices} from '../services/auth.service';

const UserHome = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        AuthServices.getUser().then((res) => {
            setUser(res.data);
        });
    }, []);
    return(
    <h2>{user}</h2>
    )
}

export default UserHome;