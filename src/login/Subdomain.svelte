<script>
import {onDestroy } from 'svelte';
import {formValidator} from '../common/formvalidators/formvalidator';
import { http } from './../stores/services';
import { getNotificationsContext } from '../common/notifications';
import Alerts from '../common/notifications/components/alerts/Alerts.svelte';
import { goto } from '@roxi/routify';
import { Tabs, TabList, TabPanel, Tab } from '../common/tabs/tab';


const { addNotification } = getNotificationsContext();

let mform;
let domainform;	
let domainstore;
let domaindata;
let domaindata_init;	
$: domaindata;
domaindata_init = {domain: ''};
domaindata = JSON.parse(JSON.stringify(domaindata_init));

domainform = formValidator(domaindata);
domainstore = domainform.data;	
$domainstore = domaindata;

let mymodal = null;
let pgtog = false;
let yes = false;
let myurl = null;

const loginunsub = domainstore.subscribe(value => {		
		console.log(value)	;
		domaindata = value;		
  });
  
	const progressModal = () => {
		return addNotification({
				title : 'Preparing your page',
				text: 'We are working on your page... Gateway to world of opourtunity' ,
				notificationtype: 'modal',            
				modaltype:'modal-no-action',  	
				//comp:Modals				
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

async function registerDomain() {
  if(!mymodal){
		mymodal = progressModal();
  }
  console.log($domainstore);
  console.log(domaindata);
  const {domain}=domaindata;
  
  let registype;
  (yes)?registype='mydomain':registype='subdomain';
  
  let respdata = await http.post('regisdomain',{siteid:domain,registype:registype}); 
  console.log(respdata);
  console.log(respdata.status);
  console.log(respdata.status === "SUCCESS");
  console.log(!(respdata.status === "SUCCESS"));
  if(!(respdata.status === "SUCCESS")) {
    //allAlerts({text:respdata.data.message,type:'success'});
    console.log("inside error")
        let s = allAlerts({text:respdata.data.message,type:'error'});    
    if(mymodal) {			
				mymodal.close();
				mymodal=null;
			}
    //$goto('/login');
  } else {    
    pgtog = true;
    myurl = respdata.data.URL;
    let s = allAlerts({text:respdata.data.message,type:'success'});    
    if(mymodal) {			
				mymodal.close();
				mymodal=null;
			}
  }

}

onDestroy(async () => {
    // await activateListener();
    await loginunsub();
	});

</script>



<style>

  .m{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .m1{
    position: fixed;
    top: 50%;       
  }

</style>
<div class="w-1/2 mx-auto mt-4  rounded">

<Tabs>
  <TabList>
    <Tab>Register Company</Tab>
    <Tab>User Enrolment</Tab>

  </TabList>
  <TabPanel>




<div >
  <Alerts targetid="sudo"/>
  {#if !pgtog}  

  <label>
    <input type=checkbox bind:checked={yes}>    
      Use my own domain
    </label>

    <label for="url" class="block text-xl font-bold text-gray-700 pb-2">Choose your URL</label>
    {#if !yes}    
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">
          https://
        </span>
      </div>
      <div class="form-group pristine-form-group">
        <input type="text" name="price" id="price" maxlength="30" size="30" bind:value={$domainstore.domain}
         class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 pr-16 pt-2.5 pb-2.5 sm:text-sm font-bold border-gray-300 rounded-md" placeholder="Your url">
        <div class="pristine-error-group"></div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <span class="text-gray-500 sm:text-sm pr-3">
          .assetscube.com
        </span>

      </div>
    </div>
    <!--
    <div class="flex justify-center	p-5">
      <button on:click={registerDomain} class=" flex justify-center	border-none bg-indigo-700 rounded text-white font-semibold w-36 py-2 shadow-md">Confirm</button>  
    </div>
    -->
    {:else}
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">
          https://
        </span>
      </div>
      <div class="form-group pristine-form-group">
        <input type="text" name="price" id="price" maxlength="30" size="30" bind:value={$domainstore.domain}
         class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 pr-16 pt-2.5 pb-2.5 sm:text-sm font-bold border-gray-300 rounded-md" placeholder="Your url">
        <div class="pristine-error-group"></div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <span class="text-gray-500 sm:text-sm pr-3">
          .com or .co.in
        </span>
      </div>      
    </div>

    <div>
      <p> Capture only subdomain and domain</p>
    </div>

    {/if}
    <div class="flex justify-center	p-5">
      <button on:click={registerDomain} class=" flex justify-center	border-none bg-indigo-700 rounded text-white font-semibold w-36 py-2 shadow-md">Confirm</button>  
    </div>
  {:else}
    <p>Please login with your URL now to start the journey </p><a href={myurl}>Click here</a>
  {/if}
  </div>

</TabPanel>
<TabPanel>
  <h2>First panel</h2>
</TabPanel>




</Tabs>
</div>