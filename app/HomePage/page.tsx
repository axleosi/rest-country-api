'use client'
import React from 'react'
import { useDataContext } from '../context/fetchData'
import { useRouter } from 'next/navigation';
import Searchbar from '../components/Searchbar'
import styles from '../styles/HomePge.module.css'

const HomePage = () => {
    const {data,light,error,loading}=useDataContext()
    const router=useRouter()

    const handleCountryClick = (countryName: string) => {
      const encode=encodeURIComponent(countryName)
      router.push(`/HomePage/${encode}`);
    };
  return (
    <div className={styles.container}>
        <Searchbar/>
        <div className={light?styles.smallContainerL:styles.smallContainer} >
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data.map((country, index) => (
                <div key={index} className={light?styles.sConL:styles.sCon}  onClick={() => handleCountryClick(country.name.common)}>
                    <img src={country.flags.png} alt={country.flags.alt} className={styles.img}/>
                    <div className={styles.text}>
                      <h3>{country.name.common}</h3>
                      <p><span>Population:</span> {country.population}</p>
                      <p><span>Region:</span> {country.region}</p>
                      <p><span>Capital:</span> {country.capital}</p>
                    </div>
                </div>
          ))}

        </div>
        
    </div>
  )
}

export default HomePage