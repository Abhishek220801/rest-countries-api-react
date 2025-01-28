import React, { useEffect, useState } from 'react'
import '../CountryPage.css'
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom';

export default function CountryPage() {
    const [isDark] = useOutletContext()
    const params = useParams();
    const {state} = useLocation()
    const countryName = params.country;
    const [countryData, setCountryData] = useState(null)
    const [notFound, setNotFound] = useState(false)
    console.log(countryData)

    function updateCountryData(data){
      setCountryData({
        name: data.name?.common,
        nativeName: data.name.nativeName ? Object.values(data.name.nativeName)[0]?.common : data.name.common,
        population: data.population,
        region: data.region,
        subregion: data.subregion ? data.subregion.common : data.region,
        capital: data.capital ? data.capital : 'N/A',
        tld: data.tld,
        flagImg: data.flags.svg,
        flagAlt: data.flags.alt,
        currencies: data.currencies ? Object.values(data.currencies).map(currency => currency.name).join(', ') : 'N/A',
        languages: data.languages ? Object.values(data.languages).join(', ') : 'N/A',
        borders: []
      })

      if(!data.borders){
        data.borders = []
      }
      Promise.all(data.borders.map((border)=>{
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res)=>res.json())
          .then(([borderCountry]) => borderCountry.name.common)
        })
      ).then((borders)=>{
          setTimeout(()=>setCountryData((prev)=>({...prev, borders}))) 
        }) 
    }

    useEffect(()=>{
      if(state){
        updateCountryData(state);
        return;
      }

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
         .then((res)=>res.json())
         .then(([data])=>{
            updateCountryData(data);
          })
        .catch((err)=>{
          console.log(err)
          setNotFound(true)
        })
      }, [countryName])

    if(notFound){
      return <div>Country Not Found...</div>
    }

  return countryData === null ? (
    'Loading...'
   ) : (
    <main className={`${isDark?'dark':''}`}>
      <div className="country-details-container">
        <span className="back-button" style={{cursor:'pointer'}} onClick={()=>history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flagImg} alt={countryData.flagAlt} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData?.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>Population: {countryData.population.toLocaleString("en-IN")}</b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border)=> (<Link
                  Link key={crypto.randomUUID()} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </main>
  )
}
