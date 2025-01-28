import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'

export default function CountriesList({query}) {
  const [countriesData, setCountriesData] = useState([])
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all')
      .then((res)=>res.json())
      .then((data)=>{
        setCountriesData(data)
      })
  },[])
  
  return (
    <div className='countries-container'>
      {
        countriesData.filter((country)=>country.name.common.toLowerCase().includes(query)).map((country)=>{
          return <CountryCard 
            name={country.name.common} 
            population={country.population}
            region={country.region}
            flag={country.flags.svg}
            capital={country.capital?.[0]}
            key={crypto.randomUUID()}
          />
        })
      }
    </div>
  )
}
