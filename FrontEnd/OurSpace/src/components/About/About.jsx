import React from 'react'
import "./about.css";

const About = () => {
    return (
        <div>
            <div className="modal fade modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content bg-dark">
                    <div className="bg-secondary d-flex justify-content-center text-white m-2 p-2" id="ModalLabel">
                        HOLA
                            
                    </div>
                    
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