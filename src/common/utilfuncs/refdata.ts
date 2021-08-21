import { enityVal } from "../../stores/stores";

const requiredrefs = {
    company:["country", "industype", "compcat"],
    branch:["country"]
}


export const getMissingRef = (refgroupname="",indiitarr=[]) => {          
    let dd = Object.keys(enityVal.refdata);
    let missrefs;
    if(indiitarr.length < 1) {
        missrefs = requiredrefs[refgroupname].filter(e => !dd.includes(e) );
    } else {
        missrefs = indiitarr;
    }
    
    let retval = [];
    missrefs.forEach( mref => {
        retval.push({"Reftype": "single", "Refname": mref})
    });
    return retval;
}