'use client'
import { useDataContext } from '@/app/context/fetchData'
import Link from 'next/link';
import React, { useState,useEffect } from 'react'
import styles from './Country.module.css'

interface Country {
    name: {
        common: string;
        official: string;
        nativeName:{
          [language:string]:{
            official:string;
            common:string;
          }
        }
    };
    cca3:string;
    fifa:string;
    flags: {
              png: string;
              svg: string;
              alt: string;
          }
    currencies:{
      SHP:{
        name:string;
        symbol:string
      }
    }
    capital: string[];
    tld:string[];
    population: number;
    region: string;
    borders:string[];
    continents:string[];
    subregion:string;
  }
  

const Country = ({params}:{params:{country:string}}) => {
  const{value, light}=useDataContext()
  const [data, setData]=useState<Country[]>([]);
  const [loading, setLoading]=useState(true)
  const [error, setError]=useState<Error | null>(null)
  const encode=decodeURIComponent(params.country)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${encode}?fullText=true`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newData = await response.json();
            setData(newData);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [encode, value]);


  return (
    <div className={light ? styles.containerL : styles.container}>
      <div className={styles.sCon}>
        <Link href='/HomePage' className={light? styles.backL:styles.back}>Back</Link>
        <div className={styles.main}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data.map((datas)=>(
            <div key={datas.cca3} className={styles.bigCon}>
              <img src={datas.flags.png}/>
              <div className={styles.conR}>
                <h1>{datas.name.common}</h1>
                <div className={styles.textCon}>
                  <div>
                    <p><span>Native Name:</span> {datas.name.nativeName.eng?.official || datas.name.nativeName.fra?.official || 'N/A'}</p>
                    <p><span>Population:</span> {datas.population}</p>
                    <p><span>Region:</span> {datas.region}</p>
                    <p><span>Sub Region:</span> {datas.subregion}</p>
                    <p><span>Capital:</span> {datas.capital}</p>
                  </div>
                  <div>
                    <p><span>Top Level Domain:</span> {datas.tld}</p>
                    <p><span>Currencies:</span> {datas.currencies.SHP?.name}</p>
                    <p><span>Language:</span> </p>
                  </div>
                </div>
                <div className={styles.border}>
                  <p><span>Border Countries:</span></p>
                  <div className={styles.borderI}>
                  {datas.borders && datas.borders.length > 0 ? (
                    datas.borders.map((border)=>(
                      
                      <p key={border} className={light? styles.borderTL: styles.borderT}>{border}</p>
                      
                    ))
                  ) : (
                  <p>No border country</p>
                  )}
                  </div>
                </div>
              </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Country