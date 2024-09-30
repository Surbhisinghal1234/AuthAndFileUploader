import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../components/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import "../App.css"

const db = getFirestore(app);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
      });

     
      localStorage.setItem("loggedInUserId", user.uid);
      setRegisterMessage("Registration successful");
      navigate('/home');

    } catch (error) {
      setRegisterMessage(error.message);
    }
  };

  return (
    
<div class="register-image pt-[5rem]">

    <div className='box max-w-md mx-auto shadow-md rounded-md px-[2rem] text-white py-[2rem]'>
      <h2 className='font-bold mb-6 flex justify-center text-3xl'>Register</h2>
      <form className='flex flex-col gap-6' onSubmit={handleRegister}>
        <input className='mt-1 block w-full px-3 py-2 bg-transparent border border-gray-100 rounded-md shadow-sm focus:outline-none'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input className='mt-1 block w-full px-3 py-2 bg-transparent border border-gray-100 rounded-md shadow-sm focus:outline-none'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input className='mt-1 block w-full px-3 py-2 bg-transparent border border-gray-100 rounded-md shadow-sm focus:outline-none'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button class="btn text-white px-6 py-2 rounded-md flex m-auto"  type="submit">Register</button>
      </form>
      {registerMessage && <p>{registerMessage}</p>}
    </div>
    </div>

  );
};

export default Register;
