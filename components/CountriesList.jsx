import React, { useEffect, useState } from 'react'
// import countriesData from '../countriesData'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const countriesPerPage = 27;

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)
      })
  }, [])

  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) ||
      country.region.toLowerCase().includes(query.toLowerCase())
  )

    // Calculate the countries to display on the current page
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = filteredCountries.slice(
      indexOfFirstCountry,
      indexOfLastCountry
    )
  
    // Calculate total pages
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage)
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (!countriesData.length) {
    return <CountriesListShimmer />
  }

  return (
    <>
      <div className="countries-container">
        {currentCountries.map((country) => (
          <CountryCard
            key={crypto.randomUUID()}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0]}
            data={country}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}