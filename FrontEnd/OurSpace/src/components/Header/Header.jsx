import React from 'react'
import "./header.css";
import axios from 'axios'
import Filterbutton from "./Filterbutton"
const apiUrl = `https://ourspace-bd.up.railway.app/api/BD/`
const apiUrlst=`https://ourspace-bd.up.railway.app/api/ST/`

function addlocalstorage(key,value) {
    localStorage.setItem(key,JSON.stringify(value))
}

function getlocalstorage(key) {

    return JSON.parse(localStorage.getItem(key))
}

function dellocalstorage(key) {
    localStorage.removeItem(key)
    
}

function manage(element) {
    
    
    let uactual= document.getElementById("h_user")
    let fileselector = document.getElementById("customFile")

    let aelement=element.id.split("_")
    let userm=getlocalstorage("auser")
    if (!userm) {
        alert("accion disponible solo para usuarios logueados")
    }else{
        
        if (aelement[0]=="pbtn") {

            if (aelement[1]=="Add") {
                alert(`hola ${userm.name} seleccionaste agregar/editar proyecto`)

                let aproyect=prompt(`${userm.name} Actualmente tienes || ${userm.proyect} || digita el/los proyectos a agregar (separados por comas)`)
                aproyect=aproyect.split(",")
                const reqaxios={
                    "name":userm.name,
                    "pass":userm.pass,
                    "proyect": []
                }
                let aux="";
                for (let i = 0; i < aproyect.length; i++) {
                    
                    aux=prompt(`Dijite una descripcion para el proyecto: ${aproyect[i]}`)
                    reqaxios["proyect"].push(
                        {
                            "title":aproyect[i],
                            "description":aux,
                            "proyects":[]
                        }

                    )

                    //alert("seleccione el archivo HTML")
                    fileselector.click()
                    //alert("se ah seleccionado correctamente")
                    const files=fileselector.file
                    const formData = new FormData();

                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                        formData.append("file", file);
                        formData.append("upload_preset", "docs_upload_example_us_preset");

                        fetch(apiUrlst+"uploadFile", {
                        method: "POST",
                        body: {
                            "name":userm.name,
                            "filename":formData
                        }
                        })
                        .then(data => {
                            if (!data.ok) {
                                throw Error(data.status);
                            }
                            return data.json();
                        })
                        .then((data)=>{
                            alert(`tu informacion fue actualizada ${data}`)
                        })
                        .catch(e => {
                            alert(e)
                            console.log(e);
                        });
                        
                    }

                    reqaxios["proyects"][i]={
                        "URLHTML":aproyect[i],
                        "URLJS":aproyect[i]
                    }
                }

                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(reqaxios),
                };

                fetch(apiUrl+"User/Add/Skills", options)
                .then(data => {
                    if (!data.ok) {
                        throw Error(data.status);
                    }
                    return data.json();
                })
                .then((data)=>{
                    alert(`tu informacion fue actualizada ${data}`)
                })
                .catch(e => {
                    alert(e)
                    console.log(e);
                });
            } else {
                if (aelement[1]=="Topic") {
                    alert(`hola ${userm.name} seleccionaste agregar/editar tema de un proyecto`)
                    let aproyect=prompt(`${userm.name} Actualmente tienes || ${userm.proyects} || digita el proyecto a cambiar de tema`)
                    if (!userm.proyects.includes(aproyect)) {
                        alert("Solo puedes modificar tus proyectos o existe un error de digitacion intentalo nuevamente")
                    } else {
                        let atopic= prompt(`${userm.name} Digita el nuevo tema al que puede hacer referencia tu proyecto`)
                        const reqaxios={
                            "proyect": aproyect,
                            "topic": atopic
                        }
                        const options = {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                        },
                            body: JSON.stringify(reqaxios),
                        };
    
                        fetch(apiUrl+"Proyect/Topic", options)
                        .then(data => {
                            if (!data.ok) {
                                throw Error(data.status);
                            }
                            return data.json();
                        })
                        .then((data)=>{
                            alert(`tu informacion fue actualizada ${data}`)
                        })
                        .catch(e => {
                            alert(e)
                            console.log(e);
                        });
                    }
                }else{
                    if (aelement[1]=="Del") {
                        alert(`hola ${userm.name} seleccionaste eliminar  un proyecto`)

                        let aproyect=prompt(`${userm.name} Actualmente tienes || ${userm.proyects} || digita el/los proyecto a eliminar (separados por comas)`)
                        aproyect=aproyect.split(",")
                        if (!userm.proyects.some(r=> aproyect.includes(r))) {
                            alert("Solo puedes modificar tus proyectos o existe un error de digitacion intentalo nuevamente")
                        } else {
                            const reqaxios={
                                "name":userm.name,
                                "pass":userm.pass,
                                "proyects": aproyect,
                            }
                            const options = {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json',
                            },
                                body: JSON.stringify(reqaxios),
                            };
        
                            fetch(apiUrl+"User/Del/Proyects", options)
                            .then(data => {
                                if (!data.ok) {
                                    throw Error(data.status);
                                }
                                return data.json();
                            })
                            .then((data)=>{
                                alert(`tu informacion fue actualizada ${data}`)
                            })
                            .catch(e => {
                                alert(e)
                                console.log(e);
                            });
                        }

                    } else {
                        alert(`lo siento ${userm.name} presiona f5 y logueate nuevamente`)
                    }

                }
            }
        } else {
            if (aelement[1]=="Add") {
                alert(`hola ${userm.name} seleccionaste agregar/editar habilidad`)
                let askill=prompt(`${userm.name} Actualmente tienes || ${userm.skills} || digita el/las habilidad a agregar (separados por comas)`)
                askill=askill.split(",")
                
                const reqaxios={
                    "name":userm.name,
                    "pass":userm.pass,
                    "skills": askill,
                }
                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(reqaxios),
                };

                fetch(apiUrl+"User/Add/Skills", options)
                .then(data => {
                    if (!data.ok) {
                        throw Error(data.status);
                    }
                    return data.json();
                })
                .then((data)=>{
                    alert(`tu informacion fue actualizada ${data}`)
                })
                .catch(e => {
                    alert(e)
                    console.log(e);
                });
                
            } else {
                if (aelement[1]=="Focus") {
                    alert(`hola ${userm.name} seleccionaste agregar/editar enfoque de una habilidad`)
                    let askill=prompt(`${userm.name} Actualmente tienes || ${userm.skills} || digita la habilidad a cambiar de enfoque`)
                    if (!userm.skills.includes(askill)) {
                        alert("Solo puedes modificar tus habilidades o existe un error de digitacion intentalo nuevamente")
                    } else {
                        let afocus= prompt(`${userm.name} Digita el nuevo enfoque al que puede hacer referencia tu habilidad`)
                        const reqaxios={
                            "ability": askill,
                            "focus": afocus
                        }
                        const options = {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                        },
                            body: JSON.stringify(reqaxios),
                        };
    
                        fetch(apiUrl+"Skill/Focus", options)
                        .then(data => {
                            if (!data.ok) {
                                throw Error(data.status);
                            }
                            return data.json();
                        })
                        .then((data)=>{
                            alert(`tu informacion fue actualizada ${data}`)
                        })
                        .catch(e => {
                            alert(e)
                            console.log(e);
                        });
                    }
                }else{
                    if (aelement[1]=="Del") {
                        alert(`hola ${userm.name} seleccionaste eliminar una habilidad`)

                        let askill=prompt(`${userm.name} Actualmente tienes || ${userm.skills} || digita el/las habilidades a eliminar (separados por comas)`)
                        askill=askill.split(",")
                        if (!userm.skills.some(r=> askill.includes(r))) {
                            alert("Solo puedes modificar tus proyectos o existe un error de digitacion intentalo nuevamente")
                        } else {
                            const reqaxios={
                                "name":userm.name,
                                "pass":userm.pass,
                                "skills": askill,
                            }
                            const options = {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json',
                            },
                                body: JSON.stringify(reqaxios),
                            };
        
                            fetch(apiUrl+"User/Del/Skills", options)
                            .then(data => {
                                if (!data.ok) {
                                    throw Error(data.status);
                                }
                                return data.json();
                            })
                            .then((data)=>{
                                alert(`tu informacion fue actualizada ${data}`)
                            })
                            .catch(e => {
                                alert(e)
                                console.log(e);
                            });
                        }
                    } else {
                        alert(`lo siento ${userm.name} presiona f5 y logueate nuevamente`)
                    }

                }
            }

        }
    }
}

function login(element) {

    // e.preventDefault();
    let uactual= document.getElementById("h_user")
    let inusuario= document.getElementById("exampleUsuario")
    let inpass= document.getElementById("exampleInputPassword")

    if (element.id=="ubtn_sup") {

        let name=inusuario.value
        let pass=inpass.value
        const reqaxios={
            "name": name ,
            "pass": pass,
            "skills": []
        }
        
        if (reqaxios.name=="" || reqaxios.pass=="") {         
            alert("Campos Vacios")
        } else {
            var opcion = prompt("Introduzca 3 habilidades separadas por comas:",);

            if (opcion == null || opcion == "") {
            alert("Has cancelado o introducido un campo vacio")
            } else {
                opcion=opcion.split(",");
                reqaxios["skills"]=opcion

                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(reqaxios),
                };

                fetch(apiUrl+"Register", options)
                .then(data => {
                    if (!data.ok) {
                        throw Error(data.status);
                    }
                    return data.json();
                })
                .then(update => {
                    addlocalstorage("auser",update);
                    uactual.classList.remove("d-none");
                    uactual.innerHTML=name;
                })
                .catch(e => {
                    alert(e)
                    console.log(e);
                });

                let manualfocus = confirm("¿Deseas agregar el enfoque de cada habilidad? ej: soft,dev,nodev,ext");
                let aux=[]
                if (manualfocus) {
                    let afocus=[];
                    for (let i = 0; i < opcion.length; i++) {
                        const element = opcion[i];
                        console.log(element)
                        afocus=prompt( `¿que enfoque tiene la habilidad: ${element}?`)
                        aux.push();

                        const reqaxios={
                            "ability": element,
                            "focus":afocus
                        }
                        const options = {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                        },
                            body: JSON.stringify(reqaxios),
                        };
        
                        fetch(apiUrl+"Skill/Focus", options)
                        .then(data => {
                            if (!data.ok) {
                                throw Error(data.status);
                            }
                            return data.json();
                        })
                        .catch(e => {
                            alert(e)
                            console.log(e);
                        });                        
                    }
                }
            }
        }
        
    } else {
        if (element.id=="ubtn_sin"){
            let name=inusuario.value
            let pass=inpass.value
            const reqaxios={
                "name": name,
                "pass": pass
            }
            if (reqaxios.name=="" || reqaxios.pass=="") {         
                alert("Campos Vacios")
            } else {
                const options = {
                    method: 'POST',
                    headers: {"Content-type":"application/json; charset=UTF-8"},
                    body: JSON.stringify(reqaxios),
                };            

                fetch(apiUrl+"User", options)
                .then(data => {
                    if (!data.ok) {
                        alert("hola?")
                        throw Error(data.status);
                    }
                    return data.json();
                })
                .then(update => {
                    if (update.pass==reqaxios.pass) {
                        addlocalstorage("auser",update);
                        uactual.classList.remove("d-none");
                        uactual.innerHTML=name;
                        element.innerHTML="Update"
                        alert(`Bienvenido ${name} !!!`)
                    }else{
                        alert("Acceso no autorizado")
                    }                    
                })
                .catch(e => {
                    alert(options);
                    alert(e)
                    console.log(e);
                });


            }

            console.log("clic en "+element.id)
        }

    }
}

function pt(x){
    if (x) {
        console.log(x)
    } else {
        console.log("wtf")
    }
}

function addcontact(element) {
    console.log("addcontact")
}



function Header() {

    let Lfilterbuttons={};
    let Lfilters=["Skills","Topics"]

    let Lusers={}; //Lista Usuarios
    let Eusers=[];
    let crdact="";//card actual

    
    function hoverchact(e,Obj){
        let divtarget=[];
        if (!e.target.id) {
            divtarget=["false","false"]
        }else{
            divtarget=e.target.id.split("_", 3);
            let modtitle = document.getElementById("ModalLabel");//Titulo modal
            let modaldes = document.getElementById("Modaldes");//body modal
            let modalfoot = document.getElementById("Modalfoot");//footer modal
            if (divtarget[0]=="crd") {
                const crdact={
                    name:divtarget[1],
                    proyects:Obj[divtarget[1]].proyects,
                    skills:Obj[divtarget[1]].skills,  
                }

                modtitle.innerHTML=`<div class="p-2 fs-3 bg-secondary">${crdact.name}</div>
                                    <div class="d-flex flex-col bg-secondary">
                                        <div class="p-2 fs-3 ">#</div>
                                        <button type="button" class="btn-close p-2" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>`;
                modaldes.innerHTML=`<h3>${crdact.proyects}</h3>`;

                modalfoot.innerHTML=`<div class="p-2 fs-5" </div> 
                                    <div class="p-2 fs-5 style="background-color:${"#" + Math.floor(Math.random()*16777215).toString(16)}">${crdact.skills}</div>`
            }else{
                if (divtarget[0]=="btn") {
                    console.log("en login")
                    modtitle.innerHTML=`<div class="p-2 fs-3 bg-secondary">LOGIN</div>
                                    <div class="d-flex flex-col bg-secondary">
                                        <div class="p-2 fs-3 ">#</div>
                                        <button type="button" class="btn-close p-2" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>`;
                    modaldes.innerHTML=`
                    <div class="d-flex flex-column mb-3" >
                        <div class="m-2">
                            <label for="exampleInputUsuario" class="form-label">Usuario</label>
                            <input type="text" class="form-control" id="exampleUsuario" aria-describedby="userHelp"
                            placeholder="digite un usuario">
                            <label id="userHelp" class="form-label" >Bienvenido a nuestro espacio</label>
                        </div>
                        <hr/>
                        <div class="m-2">
                            <label for="exampleInputPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword" placeholder="digite una contraseña">
                        </div>
                        <div class="d-flex justify-content-between">
                            <button id="ubtn_sup" onclick="login(this)" type="submit" class="m-2 btn btn-info">Sign Up</button>
                            <hr/>
                            <button id="ubtn_sin" onclick="login(this)" type="submit" class="m-2 btn btn-light">Sign In</button>
                        </div>
                    </div>
                    `;

                    modalfoot.innerHTML=`
                    
                    <div class="dropup-center dropup">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Proyect
                        </button>
                        <ul class="dropdown-menu">
                            <li class="bg-dark d-flex">
                            <button id="pbtn_Add" onclick="manage(this)" type="submit" class="flex-fill btn btn-dark">Add</button>
                            </li>

                            <li class="bg-dark d-flex">
                            <button id="pbtn_Topic" onclick="manage(this)" type="submit" class="flex-fill btn btn-dark">Topic</button>
                            </li>
                            
                            <li class="bg-dark d-flex">
                            <button id="pbtn_Del" onclick="manage(this)" type="submit" class="flex-fill btn btn-dark">Del</button>
                            </li>

                        </ul>
                    </div>
                    <hr/>
                    <div class="dropup-center dropup">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Skill
                        </button>
                        <ul class="dropdown-menu">
                            <li class="bg-dark d-flex">
                            <button id="sbtn_Add" onclick="manage(this)" type="button" class="flex-fill btn btn-dark">Add</button>
                            </li>

                            <li class="bg-dark d-flex">
                            <button id="sbtn_Focus" onclick="manage(this)" type="button" class="flex-fill btn btn-dark">Focus</button>
                            </li>
                            
                            <li class="bg-dark d-flex">
                            <button id="sbtn_Del" onclick="manage(this)" type="button" class="flex-fill btn btn-dark">Del</button>
                            </li>
                        </ul>
                    </div>
                    
                    `;
                }
            }
        }
    }
    
    //Utilidades
    let checker = arr => arr.some(v => v === true);
    
    function newcard(name,proyects,skills){
            const crdact={
                name:name,
                proyects:proyects,
                skills:skills  
            }

            return `<div class="col my-2">
                        <div class="card text-white bg-secondary ">
                            <div class="d-flex justify-content-between align-items-center px-5 py-1">
                                <h5 class="card-title">${name}</h5>
                                <button id="ubtn_${name}" onclick="addcontact(this)" type="button" class="btn btn-info">Add</button>
                            </div>

                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card-body d-flex bg-white text-start ">
                                <div id="crd_${crdact.name}" 
                                key="crdk_${crdact.name}" class="hoverchcard hoverch d-flex flex-column rounded-4 car" style="background-color:${"#" + Math.floor(Math.random()*16777215).toString(16)};">
                                    <p class="card-text"> ${crdact.proyects}</p>
                                    <p class="card-text"> ${crdact.skills}</p>
                                </div>
                            </button>
                        </div>
                    </div>`
    }

    const findobject=(e)=>{
        e.preventDefault();
        let LObject= document.getElementById("LObject");//Lista cartas
        LObject.innerHTML="<hr/>";// Lista Cards
        
        Lusers={}
        if (e.target.id=="btn_all") {
            while (LObject.firstChild) {
                //The list is LIVE so it will re-index each call
                LObject.removeChild(LObject.firstChild);
            }
            axios.get(apiUrl+"Users")
            .then(res=>{
                for (let i = 0; i < res.data.length; i++) {
                    Lusers[res.data[i].name]={
                        "contacts": res.data[i].contacts,
                        "proyects": res.data[i].proyects,
                        "skills": res.data[i].skills
                    };
                }
                let Obj={};
                let aux={}
                Object.keys(Lusers).forEach(key => {
                    LObject.innerHTML+=newcard(key,Lusers[key].proyects,Lusers[key].skills);
                    
                    Obj={
                        name:key,
                        proyects:Lusers[key].proyects,
                        skills:Lusers[key].skills  
                    }
                });

                let cardsArray = document.querySelectorAll(".hoverchcard");
                console.log(cardsArray)
                cardsArray.forEach(function(elem) {
                    elem.addEventListener("mouseover", function(e) {
                        hoverchact(e,Lusers);
                    });
                });

            })
            .catch(error=>{
                console.log(error)
            })            

        } else {
            if (e.target.id=="btn_searching") {
                console.log("buscando")
                let searching = document.getElementById("searching");//Boton busqueda
                let reqaxios={}
                if (searching.disabled==true) {
                    let Lfilterbuttonsfind={}
                    let torev={};
                    Object.keys(Lfilterbuttons).forEach(element => {
                        Lfilterbuttonsfind[element]=[];
                        Object.keys(Lfilterbuttons[element]).forEach(element2 => {
                            if (Lfilterbuttons[element][element2]) {
                                Lfilterbuttonsfind[element].push(element2)
                                torev[element]=true;
                            }                        
                        });
                        
                    });
                    let checker = arr => arr.some(v => v === true);
                    if (checker(Object.values(torev))) {
                        Object.keys(torev).forEach(element => {
                            reqaxios={
                                ability: Lfilterbuttonsfind[element],
                                topic: Lfilterbuttonsfind[element]
                            }

                            if (torev[element]) {

                                
                                axios.post(apiUrl+"User/"+element,reqaxios)
                                .then(res=>{
                                    for (let i = 0; i < res.data.length; i++) {
                                        Lusers[res.data[i].name]={
                                            "contacts": res.data[i].contacts,
                                            "proyects": res.data[i].proyects,
                                            "skills": res.data[i].skills
                                        };
                                    }
                                    
                                    let Obj={};
                                    let aux=Object.keys(Lusers);
                                    console.log("HABER -.-")
                                    console.log(aux)

                                    for (let i = 0; i < aux.length; i++) {

                                        LObject.innerHTML+=newcard(aux[i],Lusers[aux[i]].proyects,Lusers[aux[i]].skills);
                                        Obj={
                                            name:aux[i],
                                            proyects:Lusers[aux[i]].proyects,
                                            skills:Lusers[aux[i]].skills  
                                        }
                                        console.log("KEY INCLIDA ::"+aux[i])
                                    }

                                    let cardsArray = document.querySelectorAll(".hoverchcard");
                                    
                                    cardsArray.forEach(function(elem) {
                                        elem.addEventListener("mouseover", function(e) {
                                            hoverchact(e,Lusers);
                                        });
                                    });

                                })
                                .catch(error=>{
                                    console.log(error)
                                }) 
                            }                            
                        });
        
                    } else {
                        alert("Busqueda Vacia");
                    }
        
                } else {
                    reqaxios={                        
                        "name":searching.value,
                    }
                    axios.post(apiUrl+"User",reqaxios)
                    .then(res=>{
                        Lusers[res.data.name]={
                            "contacts": res.data.contacts,
                            "proyects": res.data.proyects,
                            "skills": res.data.skills
                        };
                        let Obj={};
                        let aux={}
                        Object.keys(Lusers).forEach(key => {
                            LObject.innerHTML+=newcard(key,Lusers[key].proyects,Lusers[key].skills);
                            
                            Obj={
                                name:key,
                                proyects:Lusers[key].proyects,
                                skills:Lusers[key].skills  
                            }
                        });

                        let cardsArray = document.querySelectorAll(".hoverchcard");
                        console.log(cardsArray)
                        cardsArray.forEach(function(elem) {
                            elem.addEventListener("mouseover", function(e) {
                                hoverchact(e,Lusers);
                            });
                        });

                    })
                    .catch(error=>{
                        alert("Usuario no encontrado")
                        console.log(error)
                    })

                }
            }else{
                if (e.target.id=="btn_login") {
                    console.log("inlogin")
                }
            }
        }

    }

    function addfilter(filters) {
        let Efilters=[]
        
        
        for (let i = 0; i < filters.length; i++) {
            Lfilterbuttons[filters[i]]={};
            axios.get(apiUrl+filters[i])
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
                    <div>
                        <a className="text-end navbar-brand" href="#">OurSpace</a>
                        <h6 id="h_user" className="d-none text-white">hola</h6>
                    </div>
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
                            <input id="searching" className="form-control me-2" type="text" placeholder="Search User" aria-label="Search"/>
                            <button id="btn_searching" onClick={(e)=>findobject(e)} className="btn btn-outline-warning btn-lg" type="button">Search </button>
                            <button id="btn_login" onMouseOver={(e)=>{
                                hoverchact(e,"login");
                            }}
                            className="btn btn-outline-success btn-lg mx-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button">Manage</button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header

