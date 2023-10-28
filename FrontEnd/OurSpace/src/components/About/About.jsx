import React from 'react'
import "./about.css";

const About = () => {
    return (
        <div>
            <div className="modal fade modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content bg-dark">
                
                    <div className="d-flex justify-content-between text-white" id="ModalLabel">

                            
                    </div>
                    
                <div className="modal-body ">
                    <div className="d-flex justify-content-center card-text" id="Modaldes">

                    </div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button id="btn_navwin" type="button" className="btn-dark nav-link active">WIN</button>
                        </li>
                        <li className="nav-item">
                            <button id="btn_navcat" type="button" className="btn-dark nav-link">CAT-WIN</button>
                            
                        </li>
                        <li className="nav-item">
                            <button id="btn_navtam" type="button" className="btn-dark nav-link">TAM-WIN</button>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center">
                    <div id="myDivtex" className="d-flex justify-content-center hidden">

                        <table className="table table-dark table-striped text-white">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Combate</th>
                                </tr>
                            </thead>
                            <tbody id='myttex' className="text-white">

                            </tbody>
                            
                        </table>
                        
                    </div>

                    <div id="myDiv" className="text-white hidden">

                    </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between text-white" id="Modalfoot">

                </div>
            </div>
        </div>
    </div>

        </div>
    )
}

export default About