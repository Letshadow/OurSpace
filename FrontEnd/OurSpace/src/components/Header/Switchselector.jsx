import React from 'react'

const Switchselector = ({tfilter,Obj,farr}) => {

    
    const SWvrf=()=>{
        farr[tfilter][Obj]=!farr[tfilter][Obj];
        let tex=""
        let setfil=false;
        Object.entries(farr).forEach(([key, value]) => {
            
            Object.entries(farr[key]).forEach(([skey, svalue]) => {
                //console.log(` ${key} - ${skey} - ${svalue}`)
                if (svalue) {
                    tex+=" "+skey;
                    setfil=true;
                }
            });
        });
        
        let searching = document.getElementById("searching");//Boton busqueda
    
        if (!setfil) {
            searching.disabled=false;
            searching.placeholder="Search";
        } else {
            searching.disabled=true;
            searching.placeholder="Clasificacion";
        }
        let Lsea= document.getElementById("NAV_SEA");//Lista Total
        Lsea.innerHTML=tex
    }

    return (
        <>
            <div className="form-check form-switch px-5">
                <input id={`SW_${Obj}`} className="form-check-input" type="checkbox" role="switch" onClick={SWvrf}/>
                <label className="form-check-label" htmlFor={`SW_${Obj}`}>
                {Obj}
                </label>
            </div>
        </>
    )
}

export default Switchselector