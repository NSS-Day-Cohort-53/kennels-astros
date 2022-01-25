import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"
import LocationRepository from "../../repositories/LocationRepository";


export default ({ employee }) => {
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver()
    const [locations, setLocation] = useState([])
    const [menuLocations, setMenuLocations] = useState
    useEffect(() => {
        EmployeeRepository.getEmployeeLocations()
        .then((data) => {
            setLocation(data)
        })
    }, [])

    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

    useEffect(() => {
        if (resource?.employeeLocations?.length > 0) {
            markLocation(resource.employeeLocations[1])
        }
    }, [resource])  

    const employeeLocations = locations.filter((location) => location.userId === parseInt(resource.id))
   
    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>

                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for 0 animals
                            </section>
                            <section>
                                this employee works at {employeeLocations.map((employeeLocation) => {
                                    return employeeLocation.location.name
                                }).join(" and ")}
                                <div>
                                <label htmlFor="location">Add location</label>
                                <select id=".location" 
                                    defaultValue=""
                                    name="location"
                                    className="form-control">
                        <option value="0">Select location</option>
                        {locations.map((e) => {
                           return <option key={e.id} value={e.id}>
                                {e.name}
                            </option>


                        })}
                    </select>

                                </div>
                            </section>
                        </>
                        : ""
                }

                {
                    <button className="btn--fireEmployee" onClick={() => {}}>Fire</button>
                }

            </section>

        </article>
    )
}
