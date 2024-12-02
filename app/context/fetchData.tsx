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
  tld: string[];
  population: number;
  region: string;
  borders: string[];
  continents: string[];
  subregion: string;
}

interface DataContextType {
  data: Country[];
  error: Error | null;
  loading: boolean;
  light: boolean;
  setLight: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Country[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [light, setLight] = useState(true);
  const [value, setValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Function to fetch countries data based on the region
  const fetchCountries = async (region: string) => {
    setLoading(true);
    try {
      const endpoint = region !== '' ? `https://restcountries.com/v3.1/region/${region}` : 'https://restcountries.com/v3.1/all';
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

  // Fetch countries whenever selectedRegion changes
  useEffect(() => {
    fetchCountries(selectedRegion);
  }, [selectedRegion]);  // This ensures that data is re-fetched when `selectedRegion` changes

  useEffect(() => {
    fetchCountries('');
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);  // This triggers the fetchCountries call due to the effect above
  };

  return (
    <DataContext.Provider value={{ data, handleSelectChange, value, setValue, light, setLight, error, loading }}>
      {loading ? <div>Loading...</div> : children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
