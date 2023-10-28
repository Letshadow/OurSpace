import React from 'react';
import "./header.css";

const Header = () => {
  return (
    <div>
        
        <nav className="navbar navbar-expand-lg "  data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">OurSpace</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

                    <div className="d-flex">

                        <li className="nav-item">
                            <button id="btn_all" className="btn btn-secondary btn-lg mx-2" type="button">
                                ALL
                            </button>
                        </li>
                                            
                        <li className="nav-item dropdown">
                            <button className="btn btn-primary btn-lg dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Tema
                            </button>
                            <ul className="dropdown-menu" id="Nav_TEM">

                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="btn btn-info btn-lg dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Habilidad
                            </button>
                            <ul className="dropdown-menu" id="Nav_HAB">

                            </ul>
                        </li>
                    </div>
                    <div className="nav-item">
                        <textarea disabled id="NAV_SEA" className="navbar-brand" rows="2" ></textarea>
                    </div>
                </ul>

                <form className="d-flex" id="searchform">
                    <input id="searching" className="form-control me-2" type="text" placeholder="Search User" aria-label="Search"/>
                    <button className="btn btn-outline-warning btn-lg" type="submit">Search </button>
                    <button className="btn btn-outline-success btn-lg mx-2" type="button">LogIn</button>
                </form>
            </div>
        </div>
    </nav>
        
    </div>
  )
}

export default Header