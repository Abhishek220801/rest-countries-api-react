import React from 'react'
import '../CountriesShimmer.css'

export default function CountriesListShimmer() {

    const mapped = Array.from({length: 12}).map((el)=>{
        return <div key={el} className="country-card shimmer-card"></div>
    })
    console.log(mapped)

  return (
    <div className='countries-container'>
      {Array.from({length: 10}).map((el)=>{
        return (
        <div key={crypto.randomUUID()} className="country-card shimmer-card">
          <div className="flag-container"></div>
          <div className="card-text">
            <h3 className="card-title"></h3>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      )
      })}
    </div>
  )
}
