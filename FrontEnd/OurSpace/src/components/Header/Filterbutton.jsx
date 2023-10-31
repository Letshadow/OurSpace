import React from 'react'
import ReactDomServer from 'react-dom/server';
import {useState,useEffect,useMemo} from 'react'
import axios from 'axios'
const apiUrl = `https://ourspace-bd.up.railway.app/api/BD/`

import Switchselector from './Switchselector'

function Filterbutton({tfilter,farr}) {
    const useHover = () => {
        const [hovering, setHovering] = useState([]);
    
        const eventHandlers = useMemo(
            () => ({
                onMouseEnter() {
                    
                    axios.get(apiUrl+tfilter)
                    .then(res=>{
                        let swelements=[];
                        for (let i = 0; i < res.data.length; i++) {
                            if (!Object.keys(farr[tfilter]).includes(res.data[i])) {
                                farr[tfilter][res.data[i]]=false;
                            }
                        }
                        for (let i = 0; i < res.data.length; i++) {
                            swelements.push(
                            <Switchselector
                            tfilter={tfilter}
                            Obj={res.data[i]}
                            farr={farr}
                            key={`SWE_${res.data[i]}`}
                            />)
                            //swelements = swelements.concat(res.data[i])
                        }
                        
                        setHovering(swelements);
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }
                ,
                // onMouseLeave() {
                //     setHovering("false");
                // }
            }),
            []
        );
    
        return [hovering, eventHandlers];
    };
    
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