"use client"

import { useState } from 'react';
import styleLogin from '../css/login.module.css';
import { useRouter } from 'next/navigation';  // Use 'next/navigation' instead of 'next/router'
import { storeData, removeData } from '../../../utlis/localstorage';

export default function Login() {
    const [getName, setName] = useState('');
    const [getUser, setUser] = useState('');


    const router = useRouter();  // Initialize the router

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const check = async () => {
        try {
            console.log("Going in try");
            const response = await fetch('/api/login', {   // Ensure API URL starts with /api
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: getUser,
                    name: getName,
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
            }

        } catch (error) {
            alert("Invalid username or password. Try Again");
            console.error('Error in details:', error);
        }
    };

    const handleButtonClick = async (e) => {
        await check();
    };

    return (
        <div className={styleLogin.Login}>
            <input type='text' onChange={handleUserChange} placeholder='User Id' />
            <input type='text' onChange={handleNameChange} placeholder='Name' />
            <button onClick={handleButtonClick}>
                Log In
            </button>
        </div>
    );
}
