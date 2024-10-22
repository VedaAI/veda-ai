"use client"

import stylesNav from '../css/nav.module.css'
import { storeData , removeData, getData } from "../../../utlis/localstorage";

import { useState , useEffect } from 'react';
import Link from 'next/link';


export default function Nav(){

    const [getUserData , setUserData ] = useState(null);

    useEffect(() => {
        console.log(getData("user"));
        const userData  = getData("user");
        setUserData(userData[0]);
        // console.log("anrn")
        // console.log(getUserData)
     
        
        
    },[]);
    useEffect(() => {
        if (getUserData) {
            console.log("Updated user data in state:", getUserData);
        }
    }, [getUserData]); 



    
    
    
    console.log("loacal ")


    return(
        <div className = {stylesNav.flex}>
            <div className={stylesNav.top}>
                {/* <img src="" alt="logo"></img> */}
                <h1>VEDA AI </h1>
            </div>
            <br></br>
            <br></br>
            <div className={stylesNav.centereText}>


            <div className={stylesNav.box} >
                {/* Safely accessing the user data */}
                <h2>{getUserData ? getUserData.uname || 'Unknown User' : 'Loading...'}</h2>
                    <br />
                    <h3>{getUserData ? getUserData.email || 'No Email Provided' : 'Loading...'}</h3>
                </div>
            <div className={stylesNav.history}>
                <h5>history

                </h5>
            </div>


            </div>
            <div className={stylesNav.bottom}>
                <Link href="./"> <h4> LOGOUT </h4></Link>
            </div>
        </div>
    )


}