<script>
import { onMount } from 'svelte';



import { writable, derived } from 'svelte/store';
import { authVal, enityVal, roleVal, roleStore } from '../../../../stores/stores';
import Roledetails from './Roledetails.svelte';
import Alerts from '../../../../common/notifications/components/alerts/Alerts.svelte';
import { http } from '../../../../stores/services';
import { getNotificationsContext } from '../../../../common/notifications';
const { addNotification } = getNotificationsContext();

    let datatosend = [];
    let mymod = 'list';

let yes = true;
let firstvisit = false;
let mymodal = null;
let myc = "hidden";





onMount(async ()=> {
  await getRolesForCompany();
})

//roleStore.subscribe((d)=>console.log(d));


const getRolesForCompany = async(goforfetch = false) => {
    console.log("inside getBranch inner if");    
    if ($roleStore.Selectedmodules.length  === 0) {
    mymodal =Rolefetchprogressmodal();   
    
    let postdata = {"Optype":"fetch","Companyid":authVal.activecompany.companyId,"Branchid":authVal.activebranch.branchId};
    console.log("postdate = ", postdata);
    let respdata = await http.post('getroledata',postdata);

    if(!(respdata.status === "SUCCESS")) {
    //allAlerts({text:respdata.data.message,type:'success'});
    console.log("inside error")
        let s = allAlerts({tgt:"sudo",text:respdata.data.message,type:'error'});    
    if(mymodal) {			
				mymodal.close();
				mymodal=null;
			}
    //$goto('/login');
  } else {    
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
    console.log(val);
		return addNotification({
				targetid: 'sudo',
				title : 'Alert',				
				//text: 'dkdkdk',
				text: val.text,
				type:val.type,								
				notificationtype: 'alert',     
				disableClose: false,        
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
	}


  function toggle_viewdetail(roledata={}){ 
  console.log(JSON.stringify(roledata));
  datatosend = [];
  if (myc === "hidden") {
    myc = "visible";
  } else {
    myc = "hidden";
  }
  mymod ='display';
  //if(JSON.stringify(branchdata) !== JSON.stringify({})) datatosend.push(branchdata);   
  $roleStore.Liverole = JSON.parse(JSON.stringify(roledata));    
}

  function toggle_edit(roledata={}) {
    console.log("toogle eeid");
    mymod="edit";
   // datatosend = [];
    if($roleStore.Selectedmodules.length <= 0)  mymod="new";
    if(JSON.stringify(roledata)=== JSON.stringify({})) mymod = 'new';
    if(firstvisit)  mymod="new";
    myc = "hidden";    
    
   // datatosend.push(JSON.parse(JSON.stringify(roledata)));    
    
    $roleStore.Liverole = JSON.parse(JSON.stringify(roledata));   
    /*
    if(JSON.stringify($roleStore.Selectedmodules) !== JSON.stringify({})) {
      datatosend.push(roledata);  
      console.log(JSON.stringify(roledata)) ;
      $roleStore.Liverole = JSON.parse(JSON.stringify(roledata));
    }
    */
  }

  const Rolesaveprogressmodal = () => {
		return addNotification({
				title : 'ROLE DELETE',
				text: 'Your Changes to Roles are getting updated' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}

async function toggle_delete(role){
  console.log(role)
  let sendrolemaster = {...role,action:'D'};
  let maudit = {itemid: "ROLE", itemkeys:{rolemasterid:role.rolemasterid},action:"D",oldvalue:[{rolemasterid:role.rolemasterid}],newvalue:[{}]};
  let submitval = {
                rolemaster : sendrolemaster,
                roledetails:{},
                audit:maudit,
                Companyid:authVal.activecompany.companyId,
                Branchid:authVal.activebranch.branchId
            };
  

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
        }
        console.log(sendrolemaster);
        let event= {detail:{action:'DELETE',rolemasterid:sendrolemaster.Rolemasterid,roledisplayname:sendrolemaster.Roledisplayname}}
        callalert(event);
}


  async function handleresult(event) {
  console.log(event.detail.action);  
  //TODO: Don't go for full fetch.  after Save/Update, replace the new values in store
  if (!['cancel'].includes(event.detail.action)) callalert(event);
  
  
  /* if (roledata.length <= 0) {    
    let s = allAlerts({tgt:"sudo1",text:"No Role setup exists. Please save company",type:'error'});    
  } else {*/
    mymod = 'list';
    myc = "hidden";
  //}
}



function callalert(event) {
      //let s = allAlerts({tgt:"sudo",text:event.detail.action + " action for Company " + event.detail.company.companyName + " is successful",type:'success'});    
      let s = addNotification({
				//targetid: val.tgt,
				title : 'Alert',				
				//text: 'dkdkdk',
				text: event.detail.action + " action for Role : " + event.detail.roledisplayname + " [id# - " + event.detail.rolemasterid + "] is successful",
				type:'success',								
				notificationtype: 'notification',     
				disableClose: false,        
        position:'bottom-right',
        removeAfter:2000,
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
    }

</script>

<Alerts targetid="sudo"/>

{#if (['list'].includes(mymod))}


<div class="flex flex-col" >


  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <caption class="bg-blue-100 rounded-t-lg divide-y divide-gray-300">                                
            <div class="flex md:flex-row flex-col items-center md:h-20 px-7">
              <h2 class="text-2xl  text-gray-700 font-bold">Role Settings</h2>
              <span class = "flex px-7"></span>     
                      
              <button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click|preventDefault={()=>toggle_edit()}>Add New</button>      
              
              

            </div>              
            <div></div>
          </caption>
          <thead class="bg-blue-100">
            <tr>
              <!--
              <th on:click={()=> dt1=true} on:focusout={()=> dt1=false} scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <span >Selection</span>

              </th>
-->
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Role Id
              </th>

              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Role Name
              </th>

              <th scope="col" class="px-6 py-3 text-left text-xs font-medium  text-gray-700 uppercase tracking-wider">
                <span >Action</span>
              </th>

            </tr>
          </thead>

          {#each $roleStore.Selectedmodules as role}

          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <!--
              <td>
                <div class="pristine-form-group md:col-start-8 md:col-span-4">				
                  <label for="default"></label>
                    <input type=checkbox bind:checked={yes} on:change= {e=>selectallrec(e)}>   
                    {yes?'Yes':'No'}
                    <div class="pristine-error-group"></div>                 
                    
                  </div>

                
              </td>
              -->
              <td class="px-6 py-1 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-xs font-semibold	 text-gray-900">
                      {role.Rolemasterid}
                    </div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-1 whitespace-nowrap">
                <div class="flex items-center">

                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {role.Roledisplayname}
                    </div>

                  </div>
                </div>
              </td>

              

              <td class="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                <a href="#" class="text-green-600 hover:text-green-900 mr-5" on:click|preventDefault={()=>toggle_viewdetail(role)}><i class="far fa-eye fa-sm"/></a>
                <a href="#" class="text-green-600 hover:text-blue-900 mr-4" on:click|preventDefault={()=>toggle_edit(role)}><i class="far fa-edit fa-sm"/></a>
                <a href="#" class="text-green-600 hover:text-red-900 mr-4" on:click|preventDefault={()=>toggle_delete(role)}><i class="fa fa-trash fa-sm"/></a>
              </td>

            </tr>

            <!-- More rows... -->
          </tbody>
          {/each}
        </table>
      </div>
    </div>
  </div>
</div>
{/if}

{#if (['edit','new','display'].includes(mymod))}

<Alerts targetid="sudo1"/>
<!--<Roledetails roledata_init={datatosend}  on:editresult= {handleresult}> </Roledetails> -->
<Roledetails  {mymod} on:editresult= {handleresult}> </Roledetails> 
{/if}
