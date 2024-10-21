'use client'
import { useDataContext } from '@/app/context/fetchData'
import Link from 'next/link';
import React, { useState,useEffect } from 'react'

interface Country {
    name: {
        common: string;
        official: string;
        nativeName:{
          eng:{
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
  const{value}=useDataContext()
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
}, [value]);


  return (
    <div>
        <Link href='/HomePage'>Back</Link>
        <div>
          {data.map((datas)=>(
            <div>
              <img src={datas.flags.png}/>
              <div>
                <h1>{datas.name.common}</h1>
                <div></div>
                <div>
                  <p>Border Countries</p>
                  {datas.borders && datas.borders.length > 0 ? (
                    datas.borders.map((border)=>{
                      console.log(border)
                      const bro=data.find((country)=>{
                        console.log('checking:', country.cca3)
                        return country.cca3=== border;
                      });
                      return(
                        <li>{bro? bro.name.common: 'unknown country'}</li>
                      )
                    })
                  ) : (
                  <p>No border country</p>
                  )}
                  
                </div>
              </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Country