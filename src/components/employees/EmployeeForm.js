import React, { useEffect, useState } from "react"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import LocationRepository from "../../repositories/LocationRepository";
import "./EmployeeForm.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




export default () => {
    const [employee, updateEmployee] = useState({})
    const [locations, defineLocations] = useState([])
    const history = useHistory()

    useEffect(() => {
        LocationRepository.getAll()
            .then((data) => {
                defineLocations(data)
            })


    }, []

    )

    const constructNewEmployee = () => {
        if (employee.locationId === 0) {
            window.alert("Please select a location")
        } else {
            EmployeeRepository.addEmployee({
                name: employee.name,
                email: employee.email,
                employee: true
            })
            .then(employee => {
                EmployeeRepository.assignEmployee({
                    userId: employee.id,
                    locationId: employee.locationId
                })
            })
            .then(() => history.push("/employees"))
        }
    }

    return (
        <>
            <form className="employeeForm">
                <h2 className="employeeForm__title">New Employee</h2>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name</label>
                    <input  onChange={(event) => {
        const copy = {...employee}
        copy.name = event.target.value
        updateEmployee(copy)}}
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Employee name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeEmail">Employee email</label>
                    <input id=".email" onChange={(event) => {
        const copy = {...employee}
        copy.email = event.target.value
        updateEmployee(copy)}}
                        type="text"
        
                        className="form-control"
                        placeholder="Employee email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Assign to location</label>
                    <select id=".location" onChange={(event) => {
        const copy = {...employee}
        copy.locationId = event.target.value
        updateEmployee(copy)}}
                        defaultValue=""
                        name="location"
                        className="form-control"
                    >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            constructNewEmployee()
                        }
                    }
                    className="btn btn-primary"> Save Employee </button>
            </form>
        </>
    )
}
