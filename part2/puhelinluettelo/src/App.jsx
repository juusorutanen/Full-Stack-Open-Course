import { useState, useEffect } from "react";
import personService from "./services/persons";

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">{message}</div>
  )
}

const ErrorNotication = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">{message}</div>
  )
}

const Persons = ({ persons, filterText, deletePerson }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button type="submit" onClick={() => deletePerson(person.id)}>
            Delete
          </button>
        </p>
      ))}
    </>
  );
};

const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  addUser,
  newName,
  newNumber,
}) => {
  return (
    <>
      <form>
        <h3>Add a new person</h3>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addUser}>
            Add
          </button>
        </div>
      </form>
    </>
  );
};

const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <>
      <div>
        Filter shown with:
        <input type="text" value={filterText} onChange={handleFilterChange} />
      </div>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const addUser = (event) => {
    event.preventDefault();

    const userExist = persons.find((person) => person.name === newName);

    if(userExist && window.confirm(`${newName.charAt(0).toUpperCase() + newName.slice(1)} is already added to the phonebook. Replace the old number with a new one?`)) {
      const updatedPersons = persons.map((person) =>
      person.name === newName ? { ...person, number: newNumber } : person
    );

    personService.update(userExist.id, { ...userExist, number: newNumber })
      .then((data) => {
        setPersons(updatedPersons);
        setNewName("");
        setNewNumber(""); 
        setSuccessMessage(`Updated ${userExist.name}'s number successfully`)
      })
    }
   else if (!userExist) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setSuccessMessage(`Added ${data.name}`)
      });
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } 
  };

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deleteId(id);
      setPersons(persons.filter((persons) => persons.id !== id));
      setSuccessMessage(`Deleted ${person.name} successfully`)
    }
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterText={filterText}
        deletePerson={deletePerson}
      />
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addUser={addUser}
      />
    </div>
  );
};

export default App;
