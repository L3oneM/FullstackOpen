import React from 'react'
import Weather from './Weather'

const Countries = ({data, filterName, setFilterName}) => {

  const showCountries = data.filter(country => 
    country.name.toLowerCase().includes(filterName.toLowerCase()))
  
  const rows = () => {
    return(
      showCountries.map(country =>
        <p key={country.callingCodes}>{country.name}  <button key={country.callingCodes} onClick={() => setFilterName(country.name)} >show</button>
        </p>
      )
    )
  }

  const oneCountryDisplay = (country) => {
    console.log(country)
    return(
      <div>
        <h1>{country.name}</h1>
        <p></p>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((lan, i) => <li key={i}>{lan.name}</li>)}
        </ul>
        <p><img src={country.flag} alt="Flag" heigth={150} width={150}/></p>
        <Weather country={country}/>
      </div>
    )
  }

  console.log(showCountries, 'showcountries')
  return (
    <div>
      {(showCountries.length >= 10) ? <div>Too many matches, specify another filter</div> :
    ((showCountries.length < 10) && (showCountries.length > 1))  ? <div>{rows()}</div> : (showCountries.length === 1) ? <div>{oneCountryDisplay(showCountries[0])}</div>
    : <div>Nothing Found</div>}
    </div>
  )
}

export default Countries