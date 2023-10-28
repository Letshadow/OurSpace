import React from 'react'

const Switchselector = ({Obj,arr}) => {
  
    let arr[Obj]=false;

    function SWvrf(){
        if (id=="CAT") {
        arrcat[Obj]=!arrcat[Obj];
    } else {
        arrtam[Obj]=!arrtam[Obj];
    }
    let tex=""
    labelcat.forEach((element,i) => {
        if (i>0) {

            if (arrcat[labelcat[i]]) {
                tex+=" "+element; 
            }
            
        }
        
    });
    labeltam.forEach((element,i) => {
        if (i>0) {
            if (arrtam[labeltam[i]]) {
                tex+=" "+element;
            }
            
        }
        
    });

    var setcat=labelcat.filter((e,i)=>arrcat[e]==true); 
    var settam=labeltam.filter((e,i)=>arrtam[e]==true);
    if (setcat.length==0&&settam.length==0) {
        searching.disabled=false;
        searching.placeholder="Search";
    } else {
        searching.disabled=true;
        searching.placeholder="Clasificacion";
    }
    Lsea.innerHTML=tex
    }
  
    return (
        <>
            <div className="form-check form-switch px-5">
                <input id={"SW_$"+Obj} className="form-check-input" type="checkbox" role="switch" onClick={`'SWvrf("${Obj}","${arr["IDENTY"]}")'`}/>
                <label className="form-check-label" htmlFor={`SW_${Obj}">${Obj}`}/>
            </div>
        </>
  )
}

export default Switchselector