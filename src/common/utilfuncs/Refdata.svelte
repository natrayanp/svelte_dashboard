<script  context="module">
import {getMissingRefts} from "./refdata";
import { http } from '../../stores/services';
import { enityVal,entityStore } from "../../stores/stores";


export async function getMissingRef(refgroupname) {
    let misrefs = await getMissingRefts(refgroupname);

    if(misrefs.length > 0) {
        //let respdata = await http.post('getrefdata',[{"Reftype": "group", "Refname": "branch"}]).catch(e=>{
        let respdata = await http.post('getrefdata',misrefs);
        console.log(respdata);

        if(respdata.status === "SUCCESS") {
            let ref = JSON.parse(JSON.stringify(respdata.data.refdata));
            await entityStore.setRef(ref); 
            return true;
        } else {
            return false;
        }
    } 
    return true;
}

</script>