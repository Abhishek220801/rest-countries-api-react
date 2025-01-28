import React, { useEffect, useState } from 'react'
import '../CountryPage.css'
import { useParams } from 'react-router-dom';

export default function CountryPage() {
    const [countryData, setCountryData] = useState(null)
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
          })
       })}, [])

//        const flagImage = document.querySelector('.country-details img')
// const countryNameH1 = document.querySelector('.country-details h1')
// const nativeName = document.querySelector('.native-name')
// const population = document.querySelector('.population')
// const region = document.querySelector('.region')
// const subRegion = document.querySelector('.sub-region')
// const capital = document.querySelector('.capital')
// const topLevelDomain = document.querySelector('.top-level-domain')
// const currencies = document.querySelector('.currencies')
// const languages = document.querySelector('.languages')
// const borderCountries = document.querySelector('.border-countries')


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
            <div className="border-countries"><b>Border Countries: </b>&nbsp;</div>
          </div>
        </div>
      </div>
    </main>
  ))
}
