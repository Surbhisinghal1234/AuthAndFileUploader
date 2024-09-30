import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../components/firebaseConfig";
import "../App.css"
import FileUpload from '../components/fileUpload';

const db = getFirestore(app);

const Home = () => {
  const [userData, setUserData] = useState({});
  const auth = getAuth();

  

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    console.log("User ID: ", loggedInUserId); 
    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document"); 
        }
      }).catch((error) => {
        console.error("Error", error);
      });
    } else {
      console.log("No logged in user ID found");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth).then(() => {
      window.location.href = "/"; 
    });
  };

  return (
    <>

    <div className="home rounded-md flex flex-col justify-center items-center w-[25rem] m-auto gap-[2rem] mt-[5rem] py-[2rem]">
      <h1 className='font-bold text-3xl'>Home Page</h1>
      <div className=' flex flex-col gap-2'>
        <h2>User Name: <span className='font-bold'>{userData.name || "N/A"}</span></h2>
        <p>User Email: <span className='font-bold'>{userData.email || "N/A"}</span></p>
      </div>
      <button className='bg-red-400 text-white rounded-3xl py-1 px-4 ' onClick={handleLogout}>Logout</button>
    </div>
    <FileUpload/>
    </>
  );
};

export default Home;
