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
  handleSelectChange:(e: React.ChangeEvent<HTMLSelectElement>) => void
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
    const [selectedRegion, setSelectedRegion] = useState('');

    const fetchCountries = async (region: string) => {
    setLoading(true);
    try {
      const endpoint = region !=="" ? `https://restcountries.com/v3.1/region/${region}` : 'https://restcountries.com/v3.1/all';
      const response = await fetch(endpoint);
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

  useEffect(() => {
    fetchCountries(selectedRegion);
  }, [selectedRegion]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);
  };

  
    return (
        <DataContext.Provider value={{ data,handleSelectChange, value,setValue,light,setLight, error, loading }}>
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
