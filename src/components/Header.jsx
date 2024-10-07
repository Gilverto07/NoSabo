import React from "react"
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/">No Sabo</Link>
                <div className="d-flex ms-auto">
                    <input
                    className="form-control me-2"
                    id="search-bar"
                    name="query"
                    type="text"
                    placeholder="Search"
                    />
                    <button type="submit" className="btn btn-secondary"><FaSearch/></button>
                </div>
                </div>
            </nav>
        </header>

    )
}
{/* <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary btn-sm" type="submit" id="button-addon1">Search</button>
                    </div>
                    <input type="text" name="query" className="" placeholder="Search"/>
                </div> */}