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
    const apiUrl = `https://ourspace.up.railway.app/api/BD/`
    const apiUrlst=`https://ourspace.up.railway.app/api/ST/`
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
                    
                    aux=prompt(`Dijite una descripcion para el proyecto: aproyect[i]`)
                    reqaxios["proyect"].push(
                        {
                            "title":aproyect[i],
                            "description":aux
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

                    reqaxios["proyect"][i]["URLHTML"]=aproyect[i];
                    reqaxios["proyect"][i]["URLJS"]=aproyect[i];
                    
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
    let uactual= document.getElementById("h_user")
    const apiUrl = `https://ourspace.up.railway.app/api/BD/`
    let inusuario= document.getElementById("exampleUsuario")
    let inpass= document.getElementById("exampleInputPassword")

    
    //event.preventDefault();

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
                "pass": pass,
            }
            if (reqaxios.name=="" || reqaxios.pass=="") {         
                alert("Campos Vacios")
            } else {
                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(reqaxios),
                };

                fetch(apiUrl+"User", options)
                .then(data => {
                    if (!data.ok) {
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