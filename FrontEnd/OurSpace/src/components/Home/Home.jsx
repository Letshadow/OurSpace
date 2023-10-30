import React from 'react'
import "./home.css"
export const Home = () => {
    return (
    <div>
        <label className="d-none form-label" htmlFor="customFile">Default file input example</label>
        <input type="file" className="d-none form-control" id="customFile" />
        <div id="LObject" className="row row-cols-1 row-cols-md-5 g-4 m-1">
        <hr/>
        </div>

    </div>
    )
}
export default Home
