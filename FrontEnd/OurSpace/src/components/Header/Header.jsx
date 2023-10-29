import React from 'react'
import "./header.css";
import axios from 'axios'
import Filterbutton from "./Filterbutton"

function Header() {

    const colorg = [
        "White",
        "Tan",
        "Turquoise",
        "GreenYellow",
        "yellow",
        "Plum",
        "Gold",
        "LightSalmon",
        "Pink",
        "IndianRed",
        "Brown",
        "Navy",
        "DarkCyan"
    ];

    let Lfilterbuttons={};
    let Lfilters=["Skills","Topics"]
    let LObject= document.getElementById("LObject");//Lista cartas
    let searching = document.getElementById("searching");//Boton busqueda

    let Lusers={}; //Lista Usuarios
    let Eusers=[];


    
    //Utilidades
    let checker = arr => arr.some(v => v === true);
    
    function newcard(name,Obj){

            return `<div class="col my-2">
                        <div class="card text-white bg-secondary ">
                            <div class="d-flex justify-content-between align-items-center px-5 py-1">
                                <h5 class="card-title">${name}</h5>
                                <button type="button" class="btn btn-info">Add</button>
                            </div>
    
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card-body d-flex bg-white text-start ">
                                <div id="crd_${Obj}" onmouseover="hoverchact('${Obj}')" class="hoverch d-flex flex-column rounded-4 car" style="background-color:${"#" + Math.floor(Math.random()*16777215).toString(16)};">
                                    <p class="card-text"> ${Obj.proyects}</p>
                                    <p class="card-text"> ${Obj.skills}</p>
                                </div>
                            </button>
                        </div>
                    </div>`
    }

    const findobject=(e)=>{
        e.preventDefault();
        console.log(e)
        if (e.target.id=="btn_all") {

            LObject.innerHTML="";// Lista Cards
            Lusers={}
            console.log("es el all")
            const apiUrl = `http://localhost:3000/api/BD/Users`
            axios.get(apiUrl)
            .then(res=>{
                for (let i = 0; i < res.data.length; i++) {
                    Lusers[res.data[i].name]={
                        "contacts": res.data[i].contacts,
                        "proyects": res.data[i].proyects,
                        "skills": res.data[i].skills
                    };
                }
                Object.keys(Lusers).forEach(u => {
                    LObject.innerHTML+=newcard(u,Lusers[u]);
                });
            })
            .catch(error=>{
                console.log(error)
            })            

        } else {
            if (searching.value == "") {
                // if (checker(Object.values(arrcat))||checker(Object.values(arrtam))) {
                    
                //     var setcat=labelcat.filter((e,i)=>arrcat[e]==true)
                //     var settam=labeltam.filter((e,i)=>arrtam[e]==true)

                //     let cards=LObjecten.filter((e,i)=>{
                //         return setcat.includes(rps101BD[e][1])||settam.includes(rps101BD[e][2]);
                //     })
                //     LObject.innerHTML="";
                //     cards.forEach(element => {
                //         LObject.innerHTML+=newcard(element);
                //     });
    
                // } else {
                //     alert("Busqueda Vacia");
                // }
    
            } else {
                // perform operation with form input
                LObject.innerHTML=newcard(searching.value);
                searching.value = "";
            }
        }
    }

    function addfilter(filters) {
        let Efilters=[]
        
        
        for (let i = 0; i < filters.length; i++) {
            Lfilterbuttons[filters[i]]={};
            const apiUrl = `http://localhost:3000/api/BD/${filters[i]}`
            axios.get(apiUrl)
            .then(res=>{
                for (let j = 0; j < res.data.length; j++) {
                    
                    if (!Object.keys(Lfilterbuttons[filters[i]]).includes(res.data[j])){
                        Lfilterbuttons[filters[i]][res.data[j]]=false;
                    }
                    
                }
            })
            .catch(error=>{
                console.log(error)
            })
            //promisse
            Efilters.push(
                <li className="nav-item dropdown" key={`FB_${filters[i]}`}>
                    <Filterbutton 
                    tfilter={filters[i]}
                    farr={Lfilterbuttons}
                    />
                </li>
            );
        }
        return Efilters
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
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
                                    <button id="btn_all" className="btn btn-secondary btn-lg mx-2" type="button"
                                    onClick={(e)=>findobject(e)}
                                    >
                                        ALL
                                    </button>
                                </li>
                                {addfilter(Lfilters)}

                            </div>
                            <div className="nav-item">
                                <textarea disabled id="NAV_SEA" className="navbar-brand" rows="2" ></textarea>
                            </div>
                        </ul>

                        <form className="d-flex" id="searchform">
                            <input id="searching" className="form-control me-2" type="text" placeholder="Search User" aria-label="Search" />
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

