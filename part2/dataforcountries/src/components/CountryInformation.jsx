import Country from "./Country"
import FilterResults from "./FilterResults"

const CountryInformation = ({countries}) => {
    if(countries.length > 10){
        return(
            <p> Too many matches, specify another filter</p>
        )

    }
    else if(countries.length === 1){
        return (<div>
            <Country country={countries[0]}/>
        </div>)
    }
    else{
        return (<div>
            {countries.map(country => <FilterResults key={country.name.common} country={country} />)}
        </div>)
    }

}

export default CountryInformation