import { useState } from "react"
import { useDispatch } from "react-redux";
import { setItemToLocalStorage, getItemFromLocalStorage } from "../helpers/localStorage"
import { authActions } from "../store/authSlice";
import { useHistory } from 'react-router-dom';

const UseLogin = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);

    const sendPostRequest = (reqBody) => {
        const userData = getItemFromLocalStorage('user') || { first_name: '', last_name: '', email: '', role: 0 };
        const tokenToSend = getItemFromLocalStorage('auth-token') || '';
        if (userData && tokenToSend) {
            console.log('a');
            dispatch(authActions.startAuthSession({
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                role: userData.role,
                token: tokenToSend
            },
            ));
        } else {
            fetch(`http://localhost:8040/auth/login`, {
                method: 'POST',
                // mode: 'cors',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.type === 'error') {
                        const errorToSend = data.inner
                        setError(errorToSend)
                        console.log(errorToSend);
                        return;
                    } else {
                        const tokenToSend = data.inner
                        const userData = data.user_details
                        setToken(tokenToSend)
                        const team = getItemFromLocalStorage(`myteam${userData._id}`)
                        if (!team || team.length === 0) {
                            setItemToLocalStorage(`myteam`, [])
                            setItemToLocalStorage(`myteam${userData._id}`, [])
                        }
                        setItemToLocalStorage('isAuth', true)
                        setItemToLocalStorage('auth-token', tokenToSend)
                        setItemToLocalStorage('user', {
                            _id: userData._id,
                            first_name: userData.first_name,
                            last_name: userData.last_name,
                            // role: userData.role,
                            email: userData.email,
                        })
                        dispatch(authActions.startAuthSession({
                            _id: userData._id,
                            first_name: userData.first_name,
                            last_name: userData.last_name,
                            email: userData.email,
                            role: userData.role,
                            token: tokenToSend
                        },
                        ));
                        history.replace('/PokemonList')
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    return { token, error, sendPostRequest };
}

export default UseLogin;