import React from 'react'
import { FaSearch } from "react-icons/fa";
import styles from '../styles/Searchbar.module.css'
import { useDataContext } from '../context/fetchData';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const{light,value,setValue,handleSelectChange}=useDataContext()
  const router=useRouter()

  const handleCountryClick = (e: React.KeyboardEvent,countryName: string) => {

    if(e.key==='Enter'){
      setValue('');
      e.preventDefault();
      router.push(`/HomePage/${countryName}`);
    }
  };
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  }
  return (
    <div className={light?styles.lightCon:styles.container}>
        <div className={styles.searchCon}>
            <div className={light?styles.searchL:styles.search}>
               <FaSearch />
               <input type='text' placeholder='Search for a country..' onKeyDown={(e)=>{handleCountryClick(e,value)}} value={value} className={light?styles.inputL:styles.input} onChange={handleChange}/>
            </div>
            <div className={styles.selectC}>
                <select className={light?styles.selectL:styles.select} onChange={handleSelectChange}>
                    <option value=""disabled selected>Filter by Region</option>
                    <option value="" >All</option>
                    <option value="Africa" >Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default Searchbar