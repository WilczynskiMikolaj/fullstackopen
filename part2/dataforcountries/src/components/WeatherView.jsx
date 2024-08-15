const WeatherView = ({weather}) =>
{
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return(
        <div>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={iconUrl} />
        <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default WeatherView