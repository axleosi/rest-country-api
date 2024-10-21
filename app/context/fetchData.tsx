'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';

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

interface DataContextType {
  data: Country[];
  error: Error | null;
  loading: boolean;
  light:boolean;
  setLight:React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue:React.Dispatch<React.SetStateAction<string>>
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider:React.FC<DataProviderProps> = ({ children }) => {
    const [data, setData] = useState<Country[]>([]); 
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const [light, setLight]=useState(true)
    const [value, setValue]=useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
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
    }, []);

    return (
        <DataContext.Provider value={{ data, value,setValue,light,setLight, error, loading }}>
            {loading ? <div>Loading...</div> : children}
        </DataContext.Provider>
    );
};

export const useDataContext=()=>{
  const final=useContext(DataContext)
  if(!final){
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return final
}
