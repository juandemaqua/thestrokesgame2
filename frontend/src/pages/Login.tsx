// Login.js or Login.tsx

import  { useState, FormEvent } from 'react';
import { BACKEND_BASE_PATH } from '../constants/Navigation'; // Make sure this path is correct

const login = (username: string, password: string): Promise<any> => {
    return fetch(`${BACKEND_BASE_PATH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(async (res) => {
        const jsonRes = await res.json();
        if (res.ok) {
            // Store user ID and token in local storage
            localStorage.setItem('userId', jsonRes.userId); // Ensure that 'userId' is being sent by your backend
            localStorage.setItem('token', jsonRes.token); // Ensure that 'token' is being sent by your backend
            console.log("Login successful", jsonRes);
            return jsonRes;
        } else {
            throw new Error(jsonRes.error || 'Unknown login error');
        }
    })
    .catch((err) => {
        console.error("Login failed", err);
        throw err;
    });
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await login(username, password);
            // Redirect user or do something with the login data
            console.log('User logged in with ID:', localStorage.getItem('userId'));
            // Redirect or update UI here
        } catch (error) {
            // setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
