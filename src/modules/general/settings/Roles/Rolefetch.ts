
import { authVal, enityVal, roleVal, roleStore } from '../../../../stores/stores';
import { http } from '../../../../stores/services';

export async function getRoleval(){

  let postdata = {"Optype":"fetch","Companyid":authVal.activecompany.companyId,"Branchid":authVal.activebranch.branchId};
    console.log("postdate = ", postdata);
    let respdata = await http.post('getroledata',postdata);

    if(respdata.status === "SUCCESS") {  
        console.log(respdata);
        let ref = JSON.parse(JSON.stringify(respdata.data.roledata));
        console.log(ref.Selectedmodules.length);        
        if (ref.Selectedmodules.length) {
          roleStore.setModVal({value: ref.Selectedmodules,modname:"Selectedmodules"});
        } else {
          roleStore.setModVal({value: [],modname:"Selectedmodules"});          
        }        
        roleStore.setModVal({value: ref.Availablemodules,modname:"Availablemodules"});                      
  }
  return respdata;
}
