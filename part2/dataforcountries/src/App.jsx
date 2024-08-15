import { useEffect, useState } from "react"
import axios from "axios"
import CountryInformation from "./components/CountryInformation"

const App = () => {
  const [filterCountry, setFilterCountry] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    console.log("fetching")
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => setFilterCountry(event.target.value)
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  return (
    <div>
      <input value={filterCountry} onChange={handleFilterChange} />
      <CountryInformation countries={filteredCountries}/>
    </div>
  )
}

export default App
