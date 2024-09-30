import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import "../App.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      localStorage.setItem("loggedInUserId", user.uid); 
  
      navigate('/home');
    } catch (error) {
      setLoginMessage(error.message); 
    }
  };
  

  return (
<div class="login-image pt-[5rem]">

    <div className="box max-w-md mx-auto shadow-md rounded-md px-[2rem] text-white py-[2rem]">
      <h2 className='font-bold mb-6 flex justify-center text-3xl'>Login Form</h2>
      <form className='flex flex-col gap-6' onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input class="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-100 rounded-md shadow-sm focus:outline-none " type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input class="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-100 rounded-md shadow-sm focus:outline-none " type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button class="btn text-white px-6 py-2 rounded-md flex m-auto" type="submit">Login</button>
        {loginMessage && <p className="error-message">{loginMessage}</p>}
      </form>
      <p  class="mt-4 text-red-500">
        Don't have an account? <Link to="/register">Register here</Link> 
      </p>
    </div>
    </div>

  );
};

export default Login;
