import axios from "axios"
import { useEffect, useState } from "react"
import WeatherView from "./WeatherView"

const Country = ({country}) => {
    const [weather, SetWeather] = useState(null)
    const apiKey = import.meta.env.VITE_API_KEY;
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`)
        .then(response => {
            console.log(response.data)
            SetWeather(response.data)
        })
    }, [country, apiKey])

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h3>Weather in {country.capital[0]}</h3>
            {weather && <WeatherView weather={weather} />}
        </div>
    )
}

export default Country