import { useState } from "react"
import Country from "./Country"

const FilterResults = ({ country}) => {
    const [show, setShow] = useState(false)
    
    const handleShowClick = () => setShow(!show)
    return (
        <div>
            {country.name.common} <button onClick={handleShowClick}>show</button>
            {show === true && <Country country={country}/>}
        </div>
    )
}
export default FilterResults