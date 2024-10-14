'use client'
import React from 'react'
import { useDataContext } from '../context/fetchData'

const Navbar = () => {
    const{light,setLight}=useDataContext()
    const toggleLight=()=>{
        setLight(!light)
      }
  return (
    <div>
        <div className="header">
        <h1>Where in the world?</h1>
        <div className="header-toggle">
          <button onClick={toggleLight} className="toggle"></button>
          {light?<p>Light Mode</p>:<p>Dark Mode</p>}
        </div>
      </div>
    </div>
  )
}

export default Navbar