import React from 'react'
import "./about.css";

const About = () => {
    return (
        <div>
            <div className="modal fade modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content bg-dark">
                    <div id="LObject" className="row row-cols-1 row-cols-md-5 g-4 m-1">
                        <hr/>
                    </div>

                    <div className="bg-secondary d-flex justify-content-center text-white m-2 p-2" id="ModalLabel">
                        HOLA
                            
                    </div>
                    <label className="d-none form-label" htmlFor="customFile">
                        Default file input example
                    </label>
                    <input type="file" className="d-none form-control" id="customFile" />
                    
                <div className="modal-body">
                    <div className=" bg-primary m-2 p-2 d-flex justify-content-center card-text" id="Modaldes">
                        HOLA
                    </div>
                </div>
                <div className="bg-success m-2 p-2 d-flex justify-content-around text-white" id="Modalfoot">
                    ADIOS
                </div>
            </div>
        </div>
    </div>

        </div>
    )
}

export default About