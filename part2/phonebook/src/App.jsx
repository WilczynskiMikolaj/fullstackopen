import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ text: '', notificationType: '' })

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const find = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if (find) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        const personToUpdate = persons.find(person => person.name === newName)
        phonebookService
          .updatePerson(personToUpdate.id, newPerson)
          .then(returnedPerson => { setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson)) })
          .catch(error => {
            console.log(error)
            const noti = {
              text: `Information of ${newPerson.name} has already been removed from server`,
              notificationType: 'error'
            }
            setNotification(noti)
            setTimeout(() => { setNotification({text: '', notificationType: ''}) }, 5000)
            setPersons(persons.filter(p => p.name !== newPerson.name))
          })
        const noti = {
          text: `${newPerson.name} number was changed`,
          notificationType: 'notification'
        }
        setNotification(noti)
        setTimeout(() => { setNotification({text: '', notificationType: ''}) }, 5000)
      }
      setNewName('')
      setNewNumber('')
    }
    else {

      phonebookService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      const noti = {
        text: `Added ${newPerson.name}`,
        notificationType: 'notification'
      }
      setNotification(noti)
      setTimeout(() => { setNotification({text: '', notificationType: ''}) }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDeleteClick = (id) => {
    const confirm = window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)
    if (confirm) {
      phonebookService
        .deletePerson(id)
        .then(deletedPerson => setPersons(persons.filter(person => deletedPerson.id !== person.id)))
    }
  }
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.text} notificationType={notification.notificationType} />
      <Filter filter={filter} onChangeFunc={handleFilterChange} />
      <h3>Add a new name</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredNames} handleDelete={handleDeleteClick} />
    </div>
  )
}

export default App