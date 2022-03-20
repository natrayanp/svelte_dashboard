<script>

import { onMount,createEventDispatcher, onDestroy } from 'svelte';
import { Tabs, TabList, TabPanel, Tab } from '../../../../common/tabs/tab';
import Userprofile from './Userprofile.svelte';
import {flip} from 'svelte/animate';
import { writable } from 'svelte/store';
import Useraccessmatrix from './Useraccessmatrix.svelte';
import {getMissingRef} from "../../../../common/utilfuncs/Refdata.svelte";
import Alerts from '../../../../common/notifications/components/alerts/Alerts.svelte';
import { authStore,authVal,roleStore,usermatrixStore} from '../../../../stores/stores';
import { getNotificationsContext } from '../../../../common/notifications';
import { getRoleval } from '../Roles/Rolefetch';
const { addNotification,clearNotifications } = getNotificationsContext();
import { http } from '../../../../stores/services';


let alt = null

let bask =        {                              
                              "Availablemodules": [
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "Branches",
                                                submodules:[
                                                    { 
                                                      
                                                      'name' : "Jurong west JEM",
                                                      'read': true,
                                                      'write': true,
                                                      
                                                    },
                                                    { 'name' : "Serangoon road opp mustafa 24hours next to",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "Pasirris",
                                                    'read': false,
                                                      'write': true,
                                                    },
                                                    { 'name' : "Changi Business Park",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "Sentosa island",
                                                    'read': true,
                                                      'write': false,
                                                    }                                                
                                                ],
                                            },
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "Roles",
                                                submodules:[
                                                    { 'name' : "Admin",
                                                    'read': true,
                                                      'write': true,
                                                      'menu':false,
                                                    },
                                                    { 'name' : "billingcounter",
                                                    'read': true,
                                                      'write': true,
                                                      'menu':false,
                                                    }
                                                ],
                                            },
                                        ] ,                              
                              "Selectedmodules": [   

                              ],
                              "Unselectedmodules": []
                            };

  let baskets = writable(bask);



onMount(async ()=> {
  await getUserMatrixdetail();
})

onDestroy( () => {
  //removeNotification(alt);
})

async function  getUserMatrixdetail() {
  let proceed = true;
  let mymodal =Rolefetchprogressmodal();       

  let misrefs = await getMissingRef("useraccess");

  if(!misrefs) {
    alt = allAlerts({tgt:"useralert_2",text:"Reference data error. Contact Tech support",type:'error'});
    proceed = false;
  }

//Get Role details
  if (proceed) {
    let respdata;
    if ($roleStore.Availablemodules.length <= 0) {
      respdata = await getRoleval();
    
    if(respdata.status !== "SUCCESS"){
      alt = allAlerts({tgt:"useralert_2",text:"Role data error. Contact Tech support",type:'error'});
      proceed = false;
    }
  } 
  }

  console.log($usermatrixStore);
  if(proceed && $usermatrixStore.mode != "new") {
    if (!($usermatrixStore.Livematrix.FullDetails)) {
      
      //User id is the user for which we need to get profile and matrix details
      let postdata = {"Optype":"detail","Companyid":authVal.activecompany.companyId,"Matrixuserid": [$usermatrixStore.Livematrix.Userid]};
      console.log("postdate = ", postdata);
      let respdata = await http.post('getusrmatrix',postdata);

      if((respdata.status !== "SUCCESS")) {
        //allAlerts({text:respdata.data.message,type:'success'});
        console.log("inside error")
            let s = allAlerts({tgt:"useralert_1",text:respdata.data.message,type:'error'});    
        //$goto('/login');
      } else {    
        console.log(respdata);
        let ref = JSON.parse(JSON.stringify(respdata.data.matrixdata));
        //console.log(ref.Selectedmodules.length);        
        if (ref.Listmatrix && ref.Listmatrix.length) {            
            $usermatrixStore.Livematrix = JSON.parse(JSON.stringify(ref.Listmatrix[0]));
            $usermatrixStore.Listallmatrix[$usermatrixStore.Livematrixindex] = JSON.parse(JSON.stringify($usermatrixStore.Livematrix));
        } else {
            //$usermatrixStore.Selectedmodules = [];
            let s = allAlerts({tgt:"useralert_1",text:respdata.data.message,type:'error'});    
            proceed = false
        }        
      }    
    }  
  } 
  
  if(proceed) populateMatrix();

  
  if(mymodal) {			
    mymodal.close();
    mymodal=null;
  }

}

function populateMatrix() {
  $usermatrixStore.LiveAvailbranch.push($authStore.allbranch.slice());
  $usermatrixStore.LiveAvailrole.push($roleStore.Availablemodules.slice());
   
  if(JSON.stringify($usermatrixStore.Livematrix) !== JSON.stringify({})) {
    
    $usermatrixStore.LiveSelectmatrix = JSON.parse(JSON.stringify($usermatrixStore.Livematrix));      

    if ($usermatrixStore.Livematrix.Accessmatrix.length > 0) {           
      $usermatrixStore.Livematrix.Accessmatrix.forEach(ama => {
        $usermatrixStore.LiveAvailbranch = $usermatrixStore.LiveAvailbranch.filter( x => ama.branchId !== x.branchId);
      } );
    }

  } 
}

const Rolefetchprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}

const allAlerts = (val) => {
		return addNotification({
				targetid: val.tgt,
				title : 'Alert',				
				//text: 'dkdkdk',
				text: val.text,
				type:val.type,										
				notificationtype: 'alert',     
				disableClose: false,        	
			});	
	}

const dispatch = createEventDispatcher();

const sendcardaction = async (btnpressed,submitval) => {
    
    /*
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
    */
    dispatch('editresult',{
    action: btnpressed,
    //rolemasterid: (submitval && submitval.rolemaster)? submitval.rolemaster.Rolemasterid:'',
    //roledisplayname: (submitval && submitval.rolemaster)? submitval.rolemaster.Roledisplayname:'',
    });
    //resetst();
}

</script>

<Alerts targetid="useralert_2"/>

   <div class="shadow rounded-lg flex flex-col  bg-white">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
        <h2 class="text-2xl text-black text-gray-700 font-bold">New User</h2>  
        <span class="flex-grow"></span>  
       <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Save</button>
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md" on:click|preventDefault={()=>sendcardaction('cancel')}>Cancel</button>      
    </div>

    <Tabs>
      
        <TabList>
        <Tab>Register Company</Tab>
        <Tab>User Enrolment</Tab>    
      </TabList>

      <TabPanel>
        <Userprofile/>      
      </TabPanel>
      
      <TabPanel>
        <Useraccessmatrix/>
      </TabPanel>

    </Tabs>

  </div>