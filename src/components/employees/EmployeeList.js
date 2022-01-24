import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



export default () => {
    const [emps, setEmployees] = useState([])
    const history = useHistory()
    useEffect(
        () => {
            EmployeeRepository.getAll()
            .then ((data) => {
                setEmployees(data)
            })
        }, []
    )

    return (
        <>
            <button type="submit"
                   onClick={() => {
                       history.push("/employees/create")
                   }}
                    
                    className="btn btn-primary"> Add New Employee </button>
            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} />)
                }
            </div>
        </>
    )
}
