'use client'
import React from 'react'
import { useDataContext } from '../context/fetchData'
import styles from '../styles/Navbar.module.css'
import { IoMoonOutline } from "react-icons/io5";

const Navbar = () => {
    const{light,setLight}=useDataContext()
    const toggleLight=()=>{
        setLight(!light)
      }
  return (
    <div className={light?styles.lightCon:styles.container}>
        <div className={styles.header}>
           <h1>Where in the world?</h1>
           <div className={styles.headerToggle}>
               <button onClick={toggleLight} ><IoMoonOutline style={{ color: light ? 'black' : 'white' }}/></button>
               {light?<p>Dark Mode</p>:<p>Light Mode</p>}
            </div>
        </div>
    </div>
  )
}

export default Navbar