import React, { useState, useContext, useEffect } from "react"
import "./AnimalForm.css"
import AnimalRepository from "../../repositories/AnimalRepository";
import LocationRepository from "../../repositories/LocationRepository";
import { useHistory } from "react-router-dom"


export default (props) => {
    const [animalName, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [animals, setAnimals] = useState([])
    const [locations, setLocations] = useState([])
    const [locationId, setLocationId] = useState(0)
    const [saveEnabled, setEnabled] = useState(false)
    const history = useHistory()

    useEffect(
        () => {
            LocationRepository.getAll()
            .then ((data) => {
                setLocations(data)
            })
        }, []
    )

    const constructNewAnimal = evt => {
        evt.preventDefault()

        if (locationId === null) {
            window.alert("Please select a location")
        } else {
            const animal = {
                name: animalName,
                breed: breed,
                locationId: parseInt(locationId)
            }

            AnimalRepository.addAnimal(animal)
                .then(() => setEnabled(true))
                .then(() => history.push("/animals"))
        }
    }

    return (
        <form className="animalForm">
            <h2>Admit Animal to a Kennel</h2>
            <div className="form-group">
                <label htmlFor="animalName">Animal name</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    id="animalName"
                    placeholder="Animal name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={e => setBreed(e.target.value)}
                    id="breed"
                    placeholder="Breed"
                />
            </div>
            <div className="form-group">
                <label htmlFor="location">Make appointment for location</label>
                <select
                    defaultValue=""
                    name="location"
                    id="locationId"
                    className="form-control"
                    onChange={e => setLocationId(e.target.value)}
                >
                    <option value="">Select a Location</option>
                    {locations.map(e => (
                        <option key={e.id} id={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit"
                onClick={constructNewAnimal}
                disabled={saveEnabled}
                className="btn btn-primary"> Submit </button>
        </form>
    )
}
