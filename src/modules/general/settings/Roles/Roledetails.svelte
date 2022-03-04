<script>
import { onMount,createEventDispatcher } from 'svelte';
//import { options } from '../../../../../routify/routes';
import { authStore, authVal,roleStore, roleVal } from '../../../../stores/stores';
import Roleselectdetails from './Roleselectdetails.svelte';
import {flip} from 'svelte/animate';
import { goto } from '@roxi/routify';
import { getNotificationsContext } from '../../../../common/notifications';
const { addNotification,subscribe } = getNotificationsContext();
import {diffJson} from 'diff';
import Switch from '../../../../common/components/Switch.svelte';
import { createForm } from "svelte-forms-lib";
import * as yup from 'yup';
import { http } from '../../../../stores/services';
import Alerts from '../../../../common/notifications/components/alerts/Alerts.svelte';

//export let roledata_init;	
export let mymod;
//$roleStore.LiveSelectmod.Modules=[];

let patharray = [];
let hoveringOverBasket;
let firstvisit = false;
let firstload = true;

let mymodl = null;
let avs= [];
let modtext = '';
let mystyle ='';
let btntxt = '';
let uno = false;
let uno1 = false;
let istouched = false;
$: istouched;
$: uno1;
let tobcal = true;



$: {    
    if(uno) {
        console.log("if "+uno);
        uno1 = false;
        togglechangeaction();        
 
       // console.log($roleStore);
        
    } else {
        console.log("else tst :"+uno);        
       // console.log($roleStore);
        uno1 = true;
        togglechangeaction();
    }
}



onMount(async() => {  
    Initialise(firstload);
    firstload = false;
});

function Initialise(firstload=false){
    console.log("Initialising");
    /*
    console.log(JSON.stringify(roledata_init));
    console.log(roledata_init.length);
    if(JSON.stringify(roledata_init)=== JSON.stringify([{}])) mymodl = 'new';
    if (mymodl !== 'new') $roleStore.LiveSelectmod = JSON.parse(JSON.stringify((roledata_init.slice())[0]));
    */
    /*
    $roleStore.LiveSelectmod = JSON.parse(JSON.stringify(($roleStore.Liverole)));
    let td= $roleStore.Availablemodules.slice();   
    $roleStore.LiveAvailmod = td.slice();

    
        if(JSON.stringify($roleStore.LiveSelectmod) !== JSON.stringify({})){
            $roleStore.LiveSelectmod.Modules.forEach ( (mod) => {             
                console.log(mod);
                 avs = $roleStore.LiveAvailmod.filter(av => !(av.packid === mod.packid));
                 $roleStore.LiveAvailmod = avs.slice();
            })
        }
    */

    reinstate_val(firstload);
    console.log($roleStore);
    if(mymod === 'display') {
        modtext = 'View';        
        mystyle ='pointer-events:none';
    } else if (mymod === 'new') {
        modtext = 'New';
        btntxt = "Save";
    } else if (mymod === 'edit') {
        modtext = 'Update';
        btntxt = "Update";
    }
    
}

function reinstate_val(firstload){
    firstload = true;
    if (JSON.stringify(($roleStore.Liverole)) === JSON.stringify({})) {
        $form.rolemasterid = $roleStore.ChangeDetails.masterdefaul.rolemasterid;
        $form.rolename = $roleStore.ChangeDetails.masterdefaul.rolename;
        $form.roledisplayname = $roleStore.ChangeDetails.masterdefaul.roledisplayname;
        $form.roledescription = $roleStore.ChangeDetails.masterdefaul.roledescription;
        if(firstload){
            $roleStore.ChangeDetails.orgmaster ={};
            $roleStore.ChangeDetails.orgdetail =[];
            $roleStore.LiveSelectmod = {Rolemasterid: $form.rolemasterid, Rolename: $form.rolename, Roledisplayname: $form.roledisplayname,  Roledescription:$form.roledescription, Modules: []};        
        }
    } else {
        console.log("going inside reinstate val else");
        console.log(JSON.parse(JSON.stringify(($roleStore.Liverole))));
        if(firstload) $roleStore.LiveSelectmod = JSON.parse(JSON.stringify(($roleStore.Liverole)));
        let cp = JSON.parse(JSON.stringify($roleStore.LiveSelectmod));
        $form.rolemasterid = cp.Rolemasterid;
        $form.rolename = cp.Rolename;
        $form.roledisplayname = cp.Roledisplayname;
        $form.roledescription = cp.Roledescription;
        if(firstload){            
            $roleStore.ChangeDetails.orgmaster = {Rolemasterid:cp.Rolemasterid ,Rolename:cp.Rolename,Roledisplayname: cp.Roledisplayname,Roledescription:cp.Roledescription};
            console.log(cp);
            console.log(JSON.parse(JSON.stringify($roleStore.ChangeDetails.orgmaster)));
            let resultmod =[];
            get_leafs($roleStore.LiveSelectmod.Modules[0],resultmod);        
            console.log(resultmod);
            console.log(resultmod[0].allowedopsval);
            resultmod = resultmod.filter( f => (f.roledetailid !== null));
            resultmod.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=> ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid}));
            $roleStore.ChangeDetails.orgdetail = resultmod.slice();  
            console.log($roleStore.ChangeDetails.orgdetail);      
        }

    }

    let td= $roleStore.Availablemodules.slice();   
    $roleStore.LiveAvailmod = td.slice();    

        if(JSON.stringify($roleStore.LiveSelectmod) !== JSON.stringify({})){
            $roleStore.LiveSelectmod.Modules.forEach ( (mod) => {             
                console.log(mod);
                 avs = $roleStore.LiveAvailmod.filter(av => !(av.packid === mod.packid));
                 $roleStore.LiveAvailmod = avs.slice();
            })
        } 
    
    $roleStore.ChangeDetails.master = {};
    $roleStore.ChangeDetails.detail = [];
    $roleStore.ChangeDetails.ischanged = false;
}


function get_leafs(mod,indmod){
    console.log("inside get_leaf");
    console.log(mod);
    if (mod.submenu === null || (mod.submenu && mod.submenu.length === 0)) {
        indmod.push(JSON.parse(JSON.stringify(mod)));
    } else if ((mod.submenu && mod.submenu.length !== 0)) {
        console.log(mod);
        mod.submenu.forEach((submod) => {
            get_leafs(submod,indmod);             
        });        
    }
    console.log("inside get_leaf end");
}








function chk_value_change(){

    
    return ($roleStore.ChangeDetails.detail.length) ? true: false;


    /*
    let valch = false;
    console.log(JSON.stringify($roleStore.LiveSelectmod));
    console.log(JSON.stringify($roleStore.Liverole));
    if($roleStore.LiveSelectmod.Modules) console.log($roleStore.LiveSelectmod.Modules.length);
    
    if (JSON.stringify($roleStore.LiveSelectmod) === JSON.stringify(($roleStore.Liverole))) {
        //No change in value
        console.log("liverole and liveselecetmod are same");
    } else if ($roleStore.LiveSelectmod.Modules && $roleStore.Liverole.Modules) {
        if ($roleStore.LiveSelectmod.Modules.count === $roleStore.Liverole.Modules.count) {
            console.log("liverole and liveselecetmod length are same");
            $roleStore.LiveSelectmod.Modules.forEach ( (mod) => {             
                 console.log(mod);
                 avs = $roleStore.Liverole.Modules.filter(av => !(av.packid === mod.packid));
                 $roleStore.Liverole.Modules = avs.slice();
            })
            if ($roleStore.Liverole.Modules.length != 0) {
                console.log("liverole and liveselecetmod length are diff");
                //There is a change
                valch = true;
            }   
        //No change in value
        }
    } else if ((JSON.stringify($roleStore.LiveSelectmod) !== JSON.stringify(({}))) && $roleStore.LiveSelectmod.Modules.length === 0){

        if (  JSON.stringify(($roleStore.Liverole)) !== JSON.stringify({})) {
            //There is a change
            valch = true;
            console.log("liverole and liveselecetmod length is zeeo");
        }
    } else {
        //There is a change
        console.log(JSON.stringify($roleStore.LiveSelectmod));
        console.log(JSON.stringify($roleStore.Liverole));
        console.log("liverole and liveselecetmod no condition met");

        valch = true;
    }
        return valch;
    */
    
}

const {
      // observables state
      form,
      errors,
      state,
      touched,
      isValid,
      isSubmitting,
      isValidating,
      // handlers
      handleBlur,
      handleChange,
      handleSubmit
    } = createForm({
      initialValues:JSON.parse(JSON.stringify(($roleStore.Liverole))),
      validationSchema: yup.object().shape({
        rolemasterid: yup.string().required(),
        rolename: yup.string().required(),
        roledisplayname: yup.string().required(),
        roledescription: yup.string().required(),
      }),
      onSubmit: values => {
        console.log("inside onsubmit");
        saveaction(values);
      },
    });


function edgeloop(inx){
    //$authStore.activepack.branchlevel[inx].submen
    $roleStore.LiveAvailmod.Modules.forEach ( (mod) => {             

if(mod.menulevel !== 'COMPANY') {            
    if($authStore.activepack.branchlevel !== null || $authStore.activepack.branchlevel.length > 0) {

        $authStore.activepack.branchlevel.forEach((br,inx)=>{
            if(br.packid === mod.packid) {
                
            }
        });
    }
} else if(mod.menulevel === 'COMPANY') {
    if($authStore.activepack.companylevel !== null || $authStore.activepack.companylevel.length > 0) {


    }            
}
})
}


    function removemodule_d(data) {
        $roleStore.ChangeDetails.ischanged = false;               
        $roleStore.LiveSelectmod.Modules = $roleStore.LiveSelectmod.Modules.filter(x => !(x.packid === data.packid));
        let mynewv =[];
        //Check if the removedmodule is in Liverole (To retain values got from DB)
        if(JSON.stringify($roleStore.Liverole) !== JSON.stringify({})) {
            mynewv = $roleStore.Liverole.Modules.filter(y => y.packid === data.packid);
        }
        let datas;
        if (mynewv.length > 0 ){
            //If yes, take the value from Liverole
            datas= JSON.parse(JSON.stringify(mynewv[0]))
        } else {
            //If no, this means we don't have data in db for this pack so show the fresh value
            let intarget = $roleStore.Availablemodules.filter(x => x.packid === data.packid);
            datas= JSON.parse(JSON.stringify(intarget[0]))
        }
        $roleStore.LiveAvailmod.push({...datas,basketname:"Availablemodules"});
        console.log(data);
        remove_det(data);  
        toggle_enable_button();      
    }


    function remove_det(d){        
        //This function is to delete the leafs in orgdetail as the previous access is now removed for them
        let indmod=[];
        let op = 'D';
        get_leafs(d,indmod)
        indmod.forEach(x => {
            let bu = $roleStore.ChangeDetails.detail.filter(y => x.packid !== y.packid);
            $roleStore.ChangeDetails.detail = bu.slice();

            let buo = $roleStore.ChangeDetails.orgdetail.filter(y => x.packid === y.packid);
            if (buo.length){
                let dp = buo.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=>  ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,action:op,
                                                                                                    audit:{old:{packid,allowedopsval},new:{packid,allowedopsval:[]}}}));                
                $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));
            }
        });
        console.log($roleStore);
    }

    
    function toggle_enable_button(){
        $roleStore.ChangeDetails.ischanged = false;
        if(JSON.stringify($roleStore.ChangeDetails.orgmaster) === JSON.stringify({})) {
            if ($form.rolemasterid === "NEW"){
                if($roleStore.ChangeDetails.detail.length){
                    $roleStore.ChangeDetails.ischanged = true;
                } 
            } else {
                if($roleStore.ChangeDetails.detail.length || JSON.stringify($roleStore.ChangeDetails.master) !== JSON.stringify({})){
                    $roleStore.ChangeDetails.ischanged = true;
                }
            }
        } else {            
            if($form.rolemasterid !== "NEW" && ($roleStore.ChangeDetails.detail.length || JSON.stringify($roleStore.ChangeDetails.master) !== JSON.stringify({}))){
                $roleStore.ChangeDetails.ischanged = true;
            }            
        }
    }
    

         

	function dragStart(event, basket) {
		// The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
        console.log("starting drag");
        const data = basket;   
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	function drop(event, basket) {
        console.log("Drop");
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const data = JSON.parse(json);   
        let mynewv = [];
        if(data.basketname !== basket.basketname) {
            if(data.basketname === "Availablemodules" && basket.basketname === "Selectedmodules"){                
                mynewv = $roleStore.LiveAvailmod.filter(x => x.packid === data.packid);
                chk(mynewv);
                $roleStore.LiveAvailmod = $roleStore.LiveAvailmod.filter(x => !(x.packid === data.packid));
                console.log(JSON.stringify($roleStore.LiveSelectmod));
                if (JSON.stringify($roleStore.LiveSelectmod) === JSON.stringify({}) ) {
                    //$roleStore.LiveSelectmod = {Rolemasterid: 'NewRole', Rolename: 'NewRole', Displayname: 'NewRole',  Roledescription:'NewRole', Modules: [{...JSON.parse(JSON.stringify(mynewv[0])),basketname:"Selectedmodules"}]};
                }  else {
                    $roleStore.LiveSelectmod.Modules.push({...JSON.parse(JSON.stringify(mynewv[0])),basketname:"Selectedmodules"});
                }                
            }
        }       

        hoveringOverBasket = null;
        
        // Remove if we have any leaf items in details as this will drop the original data in orgdetail to selected box
        let indmod = [];
        get_leafs(mynewv[0],indmod);
        indmod.forEach(x => {
            let bu = $roleStore.ChangeDetails.detail.filter(y => x.packid !== y.packid);
            $roleStore.ChangeDetails.detail = bu.slice();
        });
        toggle_enable_button();  
        console.log($roleStore);


        console.log(JSON.parse(JSON.stringify($roleStore)));
    }

    function chk(mynewv) {
       

        if(mynewv[0].menulevel !== 'COMPANY') {
            if($authStore.activepack.branchlevel !== null || $authStore.activepack.branchlevel.length > 0) {           
                $authStore.activepack.branchlevel.forEach( br => {
                    if(br.packid === mynewv[0].packid) {
                        mynewv[0].disablefunc = false;
                        looptofind(br,mynewv[0]);
                    }
                });
            }
        } else if(mynewv[0].menulevel === 'COMPANY') {
            if($authStore.activepack.companylevel !== null || $authStore.activepack.companylevel.length > 0) {

                $authStore.activepack.companylevel.forEach( br => {
                    console.log(br);
                    if(br.packid === mynewv[0].packid) {
                        mynewv[0].disablefunc = false;
                        looptofind(br,mynewv[0]);
                    }
                });            
            
            }            
        }

    }


    function looptofind(br,mynewvcpy) {
        /*
        let mynewvcpy;
        if(mynewv.type === 'pack') {
            mynewvcpy = mynewv[0];
        }
        */

        console.log(br);
        console.log(mynewvcpy);

        if(mynewvcpy.submenu !== null && mynewvcpy.submenu.length > 0){
            mynewvcpy.submenu.forEach( nbr => {
                br.submenu.forEach ( xbr => {
                    if(nbr.packid === xbr.packid) {
                        nbr.disablefunc = false;                      
                            looptofind(xbr,nbr);                      
                    }
                })
            });

        }       
    }



    const dispatch = createEventDispatcher();

    const sendcardaction = async (btnpressed,submitval) => {
        
        if(firstvisit) {
          $goto('/login');
          $roleStore.reset;
          //resetst();
          return;
        }else if(['Save','Update'].includes(btnpressed)) {            
          //console.log(respdata);
        }        
        console.log(submitval);
        $roleStore.ChangeDetails.ischanged = false;
        dispatch('editresult',{
        action: btnpressed,
        rolemasterid: (submitval && submitval.rolemaster)? submitval.rolemaster.Rolemasterid:'',
        roledisplayname: (submitval && submitval.rolemaster)? submitval.rolemaster.Roledisplayname:'',
        });
        //resetst();
	}


function resetst(){
    $roleStore.LiveAvailmod = [];
    $roleStore.Liverole = {};
    $roleStore.LiveSelectmod = {};
}


const RoleDel = () => {
		return addNotification({
				title : 'Data Loss Alert',
				text: 'Your changes will be lost.  Do you want to proceed?' ,
				notificationtype: 'modal',            
				modaltype:'modal-accept-reject',  	
        //comp : Circularprogress,				
			});
	}

    function removemodule(data) {               
        /*
        mymodl =  RoleDel();
        mymodl.returneddata.then(d => {
        if(d.accept) removemodule_d(data);
        });               
        */
        removemodule_d(data);
    }

    function togglechangeaction(){            
        console.log("-----togglechangeaction start-----");
        if(tobcal) {
        /*
        console.log(istouched);
        console.log(JSON.stringify($roleStore.Liverole));
        console.log(JSON.stringify($roleStore.LiveSelectmod));
        if (!$roleStore.LiveSelectmod) {
             $roleStore.LiveSelectmod = JSON.parse(JSON.stringify({}));
             console.log(JSON.stringify($roleStore.LiveSelectmoduched));
        }
        let dd = diffJson($roleStore.Liverole,$roleStore.LiveSelectmod);
        console.log(dd);
        console.log(JSON.stringify($roleStore));
        */
        let chkres = true;        

        //If we are here first time then don't do chk_value change
        //and value change is false as we are just loading the screen
        //This is to get the modal displayed
        firstload? chkres = false: chkres = chk_value_change();
        
        if(chkres) {
            let mymodl =  RoleDel();
            mymodl.returneddata.then(d => {
            if(d.accept) {
                reinstate_val();
            } else {
                uno1 = !uno1;
                uno = !uno;
                tobcal = false;  
            }
            });  
        }
        } else {
            tobcal = true;    
        }
        console.log("-----togglechangeaction stop-----");
    }

    let tog = true;
    function handleToggleActive() {
        tog = !tog;
    }
    
    //function handleChange(){
    function mych(e) {
        console.log("going mych");
        $roleStore.ChangeDetails.ischanged = false;
        $roleStore.ChangeDetails.master = {};
        let rmcpy = JSON.parse(JSON.stringify($form));
        let frmcpy = {Rolemasterid:rmcpy.rolemasterid,Rolename:rmcpy.rolename,Roledisplayname:rmcpy.roledisplayname,Roledescription:rmcpy.roledescription};


        if (JSON.stringify($roleStore.ChangeDetails.orgmaster) === JSON.stringify({})) {
            console.log("going mych empty")
            if ($form.rolemasterid === "NEW") {
                $roleStore.ChangeDetails.master = {...frmcpy,action:'I'};                   
                if ($roleStore.ChangeDetails.detail.length) {
                    //$roleStore.ChangeDetails.ischanged = true;
                    toggle_enable_button();
                }
                
                console.log("going mych empty if")
            } 
        } else {
            console.log("going mych not empty")
            console.log(JSON.parse(JSON.stringify($roleStore.ChangeDetails.orgmaster)));
            console.log(JSON.parse(JSON.stringify(frmcpy)));

            if (JSON.stringify($roleStore.ChangeDetails.orgmaster) !== JSON.stringify(frmcpy)){
                $roleStore.ChangeDetails.master = {...frmcpy,action:'U'};
                //$roleStore.ChangeDetails.ischanged = true;
                toggle_enable_button();
                console.log("going mych not empty if")
            }
        }
        handleChange(e);
        //$form.handleChange();
       
    }

  
    async function saveaction(action) {
        console.log(action);
        console.log($roleStore);
        console.log($form);
       

        let submitval = {};
        
        let maudit = {itemid: "ROLE", itemkeys:{rolemasterid:$form.rolemasterid},action:"M",oldvalue:[],newvalue:[]};
        console.log("**************************************");
        console.log(maudit);
        let roledetails = [];
        if($roleStore.ChangeDetails.detail.length){
             $roleStore.ChangeDetails.detail.forEach((element)=> {
                console.log(element);
                 let recp = JSON.parse(JSON.stringify(element));
                 delete recp.audit;
                 console.log(recp);
                 
                 roledetails.push(recp);
                 let ro = {};
                 let rn = {};
                 let rid  = "";
                 element.roledetailid===""?rid="NEW":rid=element.roledetailid;
                 console.log("$$$$$$1");
                 console.log({roledetailid:rid,...element.audit.old});


                 ro = {roledetailid:rid,...element.audit.old};
                 rn = {roledetailid:rid,...element.audit.new};
                 //ro[rid]=element.audit.old;
                 //rn[rid]=element.audit.new;
                /* console.log(maudit);

                 */
                 console.log(ro);
                 console.log(rn);
                 
                 console.log({...maudit.oldvalue});

                 maudit.oldvalue.push(ro);
                 maudit.newvalue.push(rn);
                 //maudit.oldvalue={...maudit.oldvalue,...ro};
                 //maudit.newvalue={{...maudit.newvalue},{}...rn};
                 
                 console.log(maudit);
             });
        };

        /*
        let sendrolemaster = {action:'N'};
        let rolmasterchanged = false;
        console.log(sendrolemaster);
        if (JSON.stringify($roleStore.ChangeDetails.orgmaster) === JSON.stringify({})) {
            if ($form.rolemasterid === "NEW") {
                sendrolemaster = {...$form,action:'I'};
                rolmasterchanged = true;
            } 
        } else {
            console.log(JSON.stringify($roleStore.ChangeDetails.orgmaster) !== JSON.stringify($form));
            console.log(sendrolemaster);
            if (JSON.stringify($roleStore.ChangeDetails.orgmaster) !== JSON.stringify($form)){
                sendrolemaster = {...$form,action:'U'};
                rolmasterchanged = true;
            }
        }
        */

        //if(!rolmasterchanged) sendrolemaster = {...sendrolemaster,rolemasterid:$form.Rolemasterid}
        //console.log(sendrolemaster);
        let sendrolemaster = {rolemasterid:$form.Rolemasterid,action:'N'};
        if (JSON.stringify($roleStore.ChangeDetails.master) !== JSON.stringify({})){
            sendrolemaster = JSON.parse(JSON.stringify($roleStore.ChangeDetails.master));
            maudit.oldvalue.push({...JSON.parse(JSON.stringify($roleStore.ChangeDetails.master))});
            maudit.newvalue.push({...JSON.parse(JSON.stringify(sendrolemaster))});
        }

   
        submitval = {
            rolemaster : sendrolemaster,
            roledetails:roledetails,
            audit:maudit,
            Companyid:authVal.activecompany.companyId,
            Branchid:authVal.activebranch.branchId
        }
       
        console.log(submitval);

 

        let mymodal =Rolesaveprogressmodal();  
        let noerr = true;
        let respdata = await http.post('rolesave',submitval)

        console.log(respdata);

        if(!(respdata.status === "SUCCESS")) {
            let s = allAlerts({tgt:"roledetails_1",text:respdata.data.message,type:'error',title:'ERROR'});   
            if(mymodal) {			
				mymodal.close();
				mymodal=null;
			}
        } else {
            await $roleStore.reset;
            console.log(respdata);
            let ref = JSON.parse(JSON.stringify(respdata.data.roledata));
            console.log(ref.Selectedmodules.length);        
            if (ref.Selectedmodules.length) {
            $roleStore.Selectedmodules = ref.Selectedmodules.slice();
            } else {
            $roleStore.Selectedmodules = [];
            }        
            $roleStore.Availablemodules = ref.Availablemodules.slice();
            if(mymodal) {			
				mymodal.close();
				mymodal=null;
			}
            sendcardaction(btntxt,submitval);
        }


        //Dispatch the favorite event with object data
        




/*
        let rolemaster = {rolemasterid:'',name:'',displayname:'',description:'',companyid:'',branchid:'',status:'',action:'',audit:{}};
        let roledetails = [{roledetailid:'',rolemasterid:'',packid:'',planid:'',companyid:'',branchid:'',allowedopsval:[],action:'',audit:{}}];

*/
    }


function chk_readytosubmit(){
    let oktosubmit = false
        
        if ($roleStore.ChangeDetails.master.rolemasterid == "NEW"){
            if($isValid && $roleStore.ChangeDetails.detail.length) {
                oktosubmit = true; 
            }
        } 

}


    const Rolesaveprogressmodal = () => {
		return addNotification({
				title : 'ROLE UPDATE',
				text: 'Your Changes to Roles are getting updated' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}


    const allAlerts = (val) => {
    console.log(val);
		return addNotification({
				targetid: val.tgt,
				title : val.title,				
				//text: 'dkdkdk',
				text: val.text,
				type:val.type,								
				notificationtype: 'alert',     
				disableClose: false,        
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
	}

</script>


<style >
    /* CHECKBOX TOGGLE SWITCH */
    /* @apply rules for documentation, these do not work as inline style */
    .toggle-checkbox:checked {
      @apply right-0;
      @apply border-green-400;
      right: 0;
      border-color: #68D391;
    }
    .toggle-checkbox:checked + .toggle-label {
      @apply bg-green-400;
      background-color: #68D391;
    }
    </style>

{$roleStore.ChangeDetails.ischanged}
<Alerts targetid="roledetails_1"/>
<div class="shadow rounded-lg flex flex-col  bg-white py-1.5">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7" >
      
        <h2 class="text-2xl text-black text-gray-700 font-bold">{modtext } Role</h2>  
        <span class="flex-grow"></span>  
        {#if mymod !== 'display'}
       <!--button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click|preventDefault={()=>saveaction(btntxt)}>{btntxt}</button-->   

       
            {#if $roleStore.ChangeDetails.ischanged}
                <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click = {handleSubmit}>{btntxt}</button>   
            {:else}
                <button class=" bg-indigo-400 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" >{btntxt}</button>
            {/if}
       
       {/if}
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md" on:click|preventDefault={()=>sendcardaction('cancel')}>Cancel</button>      
    </div>
    
    <form class="px-10 py-1 rounded w-full my-5 inputs space-y-6"  style={mystyle} >
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
  

            
            <div class=" md:col-start-1 md:col-span-4">				  
             
                <label for="firstname"><b>Company : </b>{$authStore.activecompany.companyName}</label>
                
                    </div>


                    <div class=" md:col-span-4">				  
                        <label for="firstname"><b>Branch : </b>{$authStore.activebranch.branchName} </label>
             
                                
                            </div>




        </div>
        <!--
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0 h-14">
            <div class="pristine-form-group md:col-span-3">			  
            <Switch bind:istouched={istouched}  bind:checked={uno}></Switch>
            </div>
            {#if uno}
            <div class="pristine-form-group md:col-span-3">				  
                <label for="firstname">Copy from Role</label>
                    <select required 
                    class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                    >dasdfasdf</select>
                    <div class="pristine-error-group"></div>
            </div>
            {:else}
                <div class="md:col-span-4">	
                    <label for="firstname">Creating Role from Scratch.  <p>Toggle button to Copy Existing Role</p></label>
                </div>
            {/if}
        
        </div>
        --->
        
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
        
            <!--div class="pristine-form-group md:col-start-1 md:col-span-5"-->
            
            <div class="md:col-start-1 md:col-span-5">
            <label for="rolename">Role Name</label>
                        <input  
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"
                        type = "text"
                        id = "rolename"
                        name = "rolename"
                        bind:value={$form.rolename}
                        on:change={mych}                              
                        />
                        <!--on:change ={handleChange}-->
                        {#if $errors.rolename }
                         <small style="color:red">{$errors.rolename}</small>
                        {/if} 
            </div>

            <div class="md:col-start-6 md:col-span-5">
                <label for="roledisplayname">Role Display Name</label>
                            <input  
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"
                            type = "text"
                            id = "roledisplayname"
                            name = "roledisplayname"
                            bind:value={$form.roledisplayname}  
                            on:change={mych}                                                      
                            />
                            <!--on:change ={handleChange}-->
                            {#if $errors.roledisplayname }
                                <small style="color:red">{$errors.roledisplayname}</small>
                            {/if} 
                </div>

            <!--
            <label for="branchname">Branch Short Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />

                        -->
                        <!--bind:value={$branchstore.branchShortName}-->
                        <!--div class="pristine-error-group"></div>
                    </div>

                    <div class="pristine-form-group md:col-start-6 md:col-span-5">
                        <label for="branchname">Branch Short Name</label>
                        <bind:value={$branchstore.branchShortName}>
                        <input required 
                                class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                        type = "text"
                        
        
                                />
                                <div class="pristine-error-group"></div-->
                            



                        
                </div>

        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
            <div class= "md:col-start-1 md:col-span-5">				  
                <label for="roledescription">Role Description</label>
                <!--bind:value={$branchstore.branchAddLine2}-->
                <textarea required 
                        name = "roledescription"
                        id = "roledescription"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                        
                        type = "text"    
                        bind:value={$form.roledescription}                                    
                        on:change={mych}     
                        ></textarea>
                        <!--on:change ={handleChange}-->
                        {#if $errors.roledescription }
                            <small style="color:red">{$errors.roledescription}</small>
                        {/if} 
                        <!--div class="pristine-error-group"></div-->
                    </div>
                    
        

    </div>
    
    </form> 
    
    {#if mymod !== 'display'}
    <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0 h-18 " >
        <div class="md:col-span-3">			  
            <Switch bind:istouched={istouched}  bind:checked={uno}></Switch>
        </div>
        {#if uno}
        <div class="md:col-span-3">				  
            <label for="firstname">Copy from Role</label>
                <select required 
                class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                >dasdfasdf</select>
                <!--div class="pristine-error-group"></div-->
        </div>
        {:else}
            <div class="md:col-span-6">	
                <label for="firstname">You are {mymod === 'new'?"Creating a Role from Scratch now":"Editing the Role"} <p>Want to Copy values from an Existing Role? Then Toggle the button </p></label>
            </div>
        {/if}
    
    </div>
    {/if}

    <div></div>

{#if uno1}
<div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">
    {#if mymod !== 'display'}
        <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">

            <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">            
                <b class="m-3 p-5">Available modules</b>
                <div class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full">
                
                {#if  $roleStore.LiveAvailmod.length === 0}
                    <div class ="h-52 flex-grow"> All Available modules assigned </div>
                {:else}
                {#each $roleStore.LiveAvailmod as basket, basketIndex (basket)} 
                <div animate:flip class="inline" >
                <ul            
                on:dragenter={() => hoveringOverBasket = "Availablemodules"}
                on:dragleave={() => null}
                on:drop={event => drop(event,{groupid:"mygroup",basketname:"Availablemodules"})}     
                    ondragover="return false"
                >           
                    
                        <li   
                            class=" shadow rounded-lg bg-green-100 rounded-lg cursor-pointer hover:bg-yellow-200 border-2 p-3 w-64"                     
                            draggable={true}
                            on:dragstart={event => dragStart(event, basket)}
                            >
                                <span class="flex flex-row items-center">  
                                    {basket.name}
                                    <span class="flex flex-1 "></span>             
                                    <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                                </span>
                        </li>                        
                    
                
            </ul> 
                </div>
            {/each}
            {/if}
            </div>
            </div>
        </div>

        <div>kdkdkkd</div>
    {/if}
<!-- on:dragenter={() => hoveringOverBasket = basket.name} -->
    <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3"
        on:dragenter={() => hoveringOverBasket = "Selectedmodules"}
        on:dragleave={() => null}
        on:drop={event => drop(event,{groupid:"mygroup",basketname:"Selectedmodules"})}     
        ondragover="return false"
        style={mystyle}    
    >
        {#if JSON.stringify($roleStore.LiveSelectmod) === JSON.stringify({}) || $roleStore.LiveSelectmod.Modules?.length === 0 }
            <div class ="h-96 flex-grow">Nothing selected yet</div>
        {:else}
            {#each $roleStore.LiveSelectmod.Modules as basket, basketIndex (basket)} 
                <div class="shadow rounded-lg p-3  bg-green-100 w-full md:w-9/19">
                    <div class="flex flex-row justify-center">
                        <b class="m-3 ">{basket.name}</b>
                        <span class="flex flex-1 "></span> 
                        {#if mymod !== 'display'}
                        <span on:click={()=>removemodule(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
                        {/if}
                    </div>
                    <div class="container">
                                    <table class="min-w-full divide-y divide-gray-200">                                          
                                            <Roleselectdetails  bind:basketsd = {$roleStore.LiveSelectmod.Modules} basket={basket} />                                                                        
                                    </table>
                    </div>
                </div>
            {/each}
        {/if}
    </div>



</div>
{/if}
</div>

