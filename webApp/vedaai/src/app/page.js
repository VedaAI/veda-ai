'use client'

import Image from "next/image";
// import styles from "./page.module.css";
import { useEffect, useState } from "react";
import styles from "./css/home.module.css"


import { useRouter } from 'next/navigation';  // Use 'next/navigation' instead of 'next/router'
import { storeData, removeData } from '../../utlis/localstorage';





export default function Home() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/data').then(response => response.json()).then(data => setData(data))
  // }, []);

  // return (
  //   <div>
  //     <h1>Linking Next with Flask</h1>
  //     {data ? <p>{data.message}</p> : <p>Loading...</p>}
  //   </div>

  // );


  const [getName, setName] = useState('');
  const [getUser, setUser] = useState('');
  const [getNumber, setNumber] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getPassword, setPassword] = useState('');
  const [getAddress, setAddress] = useState('');
  const [isActiveLogin , setIsActiveLogin] = useState(false);
  const [isActiveCreate , setIsActiveCreate] = useState(true);




 


  const router = useRouter();  // Initialize the router

  const handleNameChange = (event) => {
      setName(event.target.value);
  };

  const handleUserChange = (event) => {
      setUser(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = async (event) => {
    const encoded = await hashPassword(event.target.value);
    console.log(encoded);
    setPassword(encoded);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCPasswordChange = (event) => {

  };






  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }





  const checkCreate = async () => {
    try {
      console.log("Going in");
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          // username: getUser,
          name: getName,
          email: getEmail,
          number: getNumber,
          address: getAddress,
          password: getPassword,  
        }),
      });
  
      const data = await response.json();
      
      if (response.ok) {  // Check if response status is OK (200)
        alert("Account Created" + data.message);
        // router.push('./');
        window.location.reload();


      } else {
        console.log("Account Not Created");
        router.push('./');  // Redirect if account not created
        handleButtonToggle();  // Additional function if needed
      }
    } catch (error) {  // Add error as argument to catch block
      alert("Error Occurred");
      console.error('Error in details:', error);  // Log the actual error details
    }
  };
  



  const checkLogin = async () => {
      try {
          // console.log("Going in try");
          const response = await fetch('/api/login', {   // Ensure API URL starts with /api
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: getUser,
                  password: getPassword,
              }),
          });

          const data = await response.json(); // Parse the response JSON

          if (response.ok) {  // Check if response status is OK (200)
              console.log("Storing data in local storage");
              removeData(data.message);
              storeData(data.message, data.data);
              
              


              if (data.message === "user") {
                  
                  
                  router.push('./chat');  // Redirect user to chat page
              } else if (data.message === "admin") {
                  router.push('./');  // Redirect admin to the main page
              } else {
                  alert(data.message);  // Show error message
              }
          } else {
              alert(data.message || "Invalid username or name. Try Again");
              router.push('./');
          }

      } 
      catch (error) {
          alert("Invalid username or password. Try Again");
          console.error('Error in details:', error);
          // router.push('./');
      }
  };

  const handleButtonClickLogin = async (e) => {
      await checkLogin();

  };

  const handleButtonClickCreate = async (e) => {
    await checkCreate();

};



  const handleButtonToggle = async (e) =>{
   
    // alert("done")
    setIsActiveLogin(!isActiveLogin);
    setIsActiveCreate(!isActiveCreate);

  };



  return (
    <div className={styles.whole}>
      <div className={styles.nav}>
        <div><img src="../../logo_white.png"></img></div>
        <div className={styles.navcontent}>
          <li><a href="#">About</a></li>
          <li><a href="#">Link for Git</a></li>
          <li><a href="#">Link for wireframe</a></li>

        </div>


        {/* <li><a href="#about">About</a></li> */}

      </div>
      <div className={styles.center}>






        <div className={styles.home}>

          <div className={styles.content}>
            <div className={styles.name}>
              <h1>
                Veda AI
              </h1>
              <h5>By Red Flag</h5>

              <br></br>
              <h3>
                A Medical Chat Bot for your Better Tomorrow!
              </h3>

            </div>

          </div>



        </div>


        <div className={isActiveCreate ? `${styles.createSection} ${styles.none}` : styles.createSection}>

          {/* <div className={styles.createSectionGrid}> */}
          
          {/*}
          <input className={styles.createSectionInput} type='text' onChange={handleUserChange} placeholder='User Id' /> */}

          <input className={styles.createSectionInput} type='text' onChange={handleNameChange} placeholder='Name' />

          <input className={styles.createSectionInput} type='number' onChange={handleNumberChange} placeholder='Phone Number' />
          <input className={styles.createSectionInput} type='email' onChange={handleEmailChange} placeholder='Email' />
          <input className={styles.createSectionInput} type='text' onChange={handleAddressChange} placeholder='Address' />

          <input className={styles.createSectionInput} type='text' onChange={handlePasswordChange} placeholder='Password' />
          <input className={styles.createSectionInput} type='text' placeholder='Confirm Password' />

          {/* </div> */}
          
          <button className={styles.createSectionButton} onClick={handleButtonClickCreate}>
                Create Account
          </button>
          <button className={styles.loginButton} onClick={handleButtonToggle}>
                Log In Now
          </button>


        </div>




        <div className={isActiveLogin ? `${styles.loginSection} ${styles.none}` : styles.loginSection }>

          <input className={styles.loginSectionInput} type='text' onChange={handleUserChange} placeholder='User Id' />
          <input className={styles.createSectionInput} type='text' onChange={handlePasswordChange} placeholder='Password' />


          <button className={styles.loginSectionButton} onClick={handleButtonClickLogin}>
                Log In
          </button>
          <button className={styles.createButton} onClick={handleButtonToggle}>
                Create Account
          </button>


        </div>



        {/* <div className={styles.logimport}>
          <Login2 />

        </div> */}


      </div>


      <div className={styles.footer}>
        <h3>
          All rights reserved @RedFlag
        </h3>


      </div>



    </div>

  )

}
