import { useState, useCallback } from "react"
import { useHistory } from 'react-router-dom';
import UseLogin from "./UseLogin";

const UseRegister = () => {
    const { sendPostRequest } = UseLogin()
    const history = useHistory()
    const [error, setError] = useState(null);

    const sendRegPostRequest = useCallback((reqBody) => {
        fetch(`http://localhost:8040/auth/register`, {
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
                    sendPostRequest({ email: reqBody.email, password: reqBody.password })
                    history.replace('/home')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [history])
    return { error, sendRegPostRequest };
}

export default UseRegister;