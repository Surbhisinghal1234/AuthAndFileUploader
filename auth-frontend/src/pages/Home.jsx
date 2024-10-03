import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../components/firebaseConfig";
import "../App.css"
import FileUpload from '../components/fileUpload';
import { FaGithub } from 'react-icons/fa';


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

<div className="flex flex-row justify-between items-center w-full px-10 py-4 bg-gray-800 text-white">
  <h1 className="font-bold text-2xl">Logo</h1>
  <div className="flex flex-row gap-6">
    <h2>User Name: <span className="font-bold">{userData.name || "N/A"}</span></h2>
    <p>User Email: <span className="font-bold">{userData.email || "N/A"}</span></p>
  </div>
  <div className="flex items-center gap-4">
    <button className="bg-red-400 text-white rounded-3xl py-2 px-6" onClick={handleLogout}>
      Logout
    </button>
    <a 
      href="https://github.com/surbhisinghal1234" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white hover:text-gray-400 text-4xl"
    >
      <FaGithub  />
    </a>
  </div>
</div>

    <FileUpload/>
    </>
  );
};

export default Home;
