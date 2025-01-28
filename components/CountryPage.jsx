import React, { useEffect, useState } from 'react'
import '../CountryPage.css'
import { Link, useParams } from 'react-router-dom';

export default function CountryPage() {
    const [countryData, setCountryData] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const params = useParams();
    const countryName = params.country;



    useEffect(()=>{
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
         .then((res)=>res.json())
         .then(([data])=>{
          setCountryData({
            name: data.name.common,
            nativeName: data.name.nativeName ? Object.values(data.name.nativeName)[0]?.common : data.name.common,
            population: data.population,
            region: data.region,
            subregion: data.subregion,
            capital: data.capital,
            tld: data.tld.join(', '),
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
            })).then((borders)=>{
              console.log(borders)
              setCountryData((prev)=>({...prev, borders}))
            }) 
          })
        .catch((err)=>{
          setNotFound(true)
          console.log(err)
        })
      }, [countryName])

    if(notFound){
      return <div>Country Not Found...</div>
    }

  return (
    countryData === null? 'Loading...' : (
    <main>
      <div className="country-details-container">
        <span className="back-button" style={{cursor:'pointer'}} onClick={()=>history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flagImg} alt={countryData.flagAlt} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p><b>Native Name: </b><span className="native-name">{countryData?.nativeName}</span></p>
              <p><b>Population: </b><span className="population">{countryData.population.toLocaleString("en-IN")}</span></p>
              <p><b>Region: </b><span className="region">{countryData.region}</span></p>
              <p><b>Sub Region: </b><span className="sub-region">{countryData.subregion}</span></p>
              <p><b>Capital: </b><span className="capital">{countryData.capital}</span></p>
              <p>
                <b>Top Level Domain: </b><span className="top-level-domain">{countryData.tld}</span>
              </p>
              <p><b>Currencies: </b><span className="currencies">{countryData.currencies}</span></p>
              <p><b>Languages: </b><span className="languages">{countryData.languages}</span></p>
            </div>
            {countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
            {
              countryData.borders.map((border)=> <Link key={crypto.randomUUID()} to={`/${border}`}>{border}</Link>)
            }
            </div>}
          </div>
        </div>
      </div>
    </main>
  ))
}
