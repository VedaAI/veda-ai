
import { useEffect, useState } from 'react';

import styleLogin from '../css/login.module.css'


export default function Login(){

    const [getName , setName] = useState('');
    const [getEmail , setEmail ] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }









    const handleButtonClick = async (e) => {
        

    }


    return(
        <div className={styleLogin.Login}>

            <input type='text' onChange={handleNameChange} placeholder='User Id'/>
            <input type='email' onChange={handleEmailChange} placeholder='Email Id'/>

            <button onClick={handleButtonClick}>
                Log In
            </button>


        

            



        </div>
    )

}
