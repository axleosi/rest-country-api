'use client'
import React from 'react'
import { useDataContext } from '../context/fetchData'

const HomePage = () => {
    const {data,error,loading}=useDataContext()
  return (
    <div>
        {data.map((country, index) => (
                <div key={index}>
                    <h3>{country.name.common}</h3>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <img src={country.flags.png} alt={country.flags.alt}/>
                </div>
            ))}
    </div>
  )
}

export default HomePage