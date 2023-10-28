import React from 'react'
import {useState,useEffect,useMemo} from 'react'
import axios from 'axios'

//import Switchselector from './switchselector'

const useHover = () => {
    const [hovering, setHovering] = useState("true");

    const eventHandlers = useMemo(
        () => ({
            onMouseEnter() {
                const apiUrl = `http://localhost:3000/api/BD/Skills`
                axios.get(apiUrl)
                .then(response=>{
                    //console.log(response)
                    //setswitchselect(response.data);
                    console.log(response.data);
                })
                .catch(error=>{
                    console.log(error)
                })
                setHovering("true");
            }
            ,
            onMouseLeave() {
                setHovering("false");
            }
        }),
        [hovering]
    );

    return [hovering, eventHandlers];
};

function Filterbutton({tfilter}) {
    
    const [hovering, eventHandlers] = useHover();

    //const [switchselects,setswitchselects] = useState([])

    
    return (
    <>
        <button className="btn btn-primary btn-lg dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"
        {...eventHandlers}
        >
        {tfilter}
        
        </button>
        <ul className="dropdown-menu" id={"Nav_"+tfilter}>
        {hovering}
        </ul>
    </>
    )
}

export default Filterbutton



// const filterbuttons = () => {

    /*{type,typearr}
    const [switchselect,setswitchselect] = useState({sws_deault:{"swsname":"nah"}})
    let url = switchselect.sw == undefined ? "waiting": switchselect.sws_deault

    useEffect(function(){
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nombre}`
        axios.get(apiUrl)
        .then(response=>{
            //console.log(response)
            setswitchselect(response.data);
            console.log(response.data);
        })
        .catch(error=>{
            console.log("error")
        })
    },[nombre])


    async function OurSpacegetsws(myurl,sws){
        return axios.get(myurl)
        .then(res=>{
            //console.log(res)
            sws=res.data
            switchselect(res.data);
            console.log(res.data);
        })
        .catch(error=>{
            console.log("error")
        })
        
    }

    return (
    <div>
          {pokemon.name || "Ningun pokemon"}  
          <img src={url}/>
    </div>
    )
    

    */
    
// }