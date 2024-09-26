'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";


export default function Home() {
  const [data,setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data').then(response => response.json()).then(data => setData(data))
  }, []);

  return (
    <div>
      <h1>Linking Next with Flask</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
    
 
  );
}
