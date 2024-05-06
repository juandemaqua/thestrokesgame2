// CreateAccount.tsx
import React, { useRef } from 'react';
import { BACKEND_BASE_PATH } from '../constants/Navigation'; // Ensure correct path


const createAccount = (username: string, email: string, password: string): Promise<any> => {
  return fetch(`${BACKEND_BASE_PATH}/create-account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  .then(async (res) => {
    const jsonRes = await res.json();
    console.log("Account creation response:", jsonRes); // Log response
    return jsonRes;
  })
  .catch((err) => {
    console.log("Error during account creation:", err); // Log error
  });
};

const CreateAccount = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission refresh

    const username = usernameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    await createAccount(username, email, password); // Call function to create an account
  };

  return (
    <body className='body'>
      <div>
        <h1>What The Strokes?</h1>
          <div className='account-div'>
            <form onSubmit={handleSubmit}>
              <div className='input-div'>
                <input type="text" ref={usernameRef} placeholder='Username'/>
              </div>

              <div className='input-div'>
                <input type="email" ref={emailRef} placeholder='Email'/>
              </div>

              <div className='input-div'>
                <input type="password" ref={passwordRef} placeholder='Password'/>
              </div>

              <button type="submit">Create Account</button>
            </form>
          </div>
      </div>
    </body>
  );
};

export default CreateAccount;
