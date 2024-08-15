import Person from "./Person"

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.name} number={person.number} name={person.name} handleDelete={() => handleDelete(person.id)} />)}
        </div>
    )
}

export default Persons