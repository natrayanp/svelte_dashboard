<script>

import {formValidator} from '../../../common/formvalidators/formvalidator';
import {onMount, onDestroy} from 'svelte';
import { http } from '../../../stores/services';
import { Accordion, AccordionItem } from "../../../common/accordion/index";
import Companydetails from './Companydetails.svelte';

import Alerts from '../../../common/notifications/components/alerts/Alerts.svelte';

import { getNotificationsContext } from '../../../common/notifications';
const { addNotification } = getNotificationsContext();



const dd1 = {
        companyId: null,
        companyName: "Ananthi",
        companyShortName: null,
        companyCategory: null,
        
        companyStatus: null,                
        companyLogoUrl: null,
        companyLogo: null,

        companyIndustry: null,
        companyTaxID: null,
        companyStartDate: null,
        companyAddLine1: null,
        companyAddLine2: null,
        companyCountry: null,
        companyCity: null,
        companyState: null,        
        companyPinCode: null,
        companyPhone: null,
        companyFax: null,
        companyMobile: null,
        companyEmail: null,
        companyWebsite: null,
        companyFiscalYear: null,
        companyTimeZone: null,
        companyBaseCurency:null,
        companyParent:null,

        entityid:null,
}


  let dt2 = false 
  let dt1 = false
  let refdata = {};
  let compdata = [];
	
let mymod = 'display';
let myc = "hidden";
let mymodal = null;

//sessionStorage.setItem('myWork', 'Developer');
let firstvisit = sessionStorage.getItem('cpyfirst');
sessionStorage.removeItem('cpyfirst');


const loginprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}


if (firstvisit){
  toggle_edit();
} 


function toggle_viewdetail(){ 
  if (myc === "hidden") {
    myc = "visible";
  } else {
    myc = "hidden";
  }
  mymod ='display';
}

  function toggle_edit() {
    mymod = 'edit';
    myc = "hidden";
  }

  async function handleresult() {
  console.log(handleresult);
  await getCompany();
   if (compdata.length <= 0) {    
    let s = allAlerts({tgt:"sudo1",text:"No company setup exists. Please save company",type:'error'});    
  } else {
    mymod = 'display';
    myc = "hidden";
  }
}


onMount(async() => {   
    await getCompany();
    //if (compdata.length <= 0) toggle_edit();
  });

  const getCompany = async() => {
    console.log("inside onmoung inner if");
    mymodal =loginprogressmodal();  
    let respdata = await http.get('getcompany'); 
    compdata = respdata.data.company; 
    refdata = respdata.data.refdata; 
    if (compdata.length <= 0) {
      firstvisit = true;
      toggle_edit();
    }
    mymodal.close();
    mymodal=null;
  };


  const allAlerts = (val) => {
    console.log(val);
		return addNotification({
				targetid: val.tgt,
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

  

</script>

<Alerts targetid="sudo"/>
{#if mymod !== 'edit'}
<div class="flex flex-col" >



    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <caption class="bg-blue-100 rounded-t-lg divide-y divide-gray-300">                                
                <div class="flex md:flex-row flex-col items-center md:h-20 px-7">
                  <h2 class="text-2xl  text-gray-700 font-bold">Company Settings</h2>
                  <span class = "flex px-7"></span>
                  <!--button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Add New</button-->      
                  <span class = "flex flex-grow"></span>                         
                  
                </div>              
                <div></div>
              </caption>
            <thead class="bg-blue-100">
              <tr>
                
                <th on:click={()=> dt1=true} on:focusout={()=> dt1=false} scope="col" class="px-6 py-6 text-left text-xs font-medium text-black uppercase tracking-wider">
                    <span >Name</span>
                           
                    {#if !dt1}
                        <span>Name</span>
<!--                    {:else}

                    <div class="relative text-gray-600 focus-within:text-gray-400">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                          <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          </button>
                        </span>
                        
                        <input type="text" name="q" class:autofocus={dt1} class="py-1.5 text-sm pl-10 w-full outline-none bg-blue-100 text-gray-900  border-0 border-b-2 border-blue-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b" placeholder="Name" autocomplete="off">
                        <span class="absolute inset-y-0 -ml-6 -mt-4">
                        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline" on:click|stopPropagation={()=> dt1=false}>
                           <svg fill="red" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"></path></svg>
                       
                          </button>
                        </span>
                      </div>                -->
                    {/if}
               
               </th>

  

                <th scope="col" on:click={()=> dt2=true} on:focusout={()=> dt2=false} class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    <span>Address</span>
               
                    {#if !dt2}
                    <span>Title</span>
  <!--               {:else}

                <div class="relative text-gray-600 focus-within:text-gray-400">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                      <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </button>
                    </span>
               
                    <input type="text" name="q" class:autofocus={dt2} class="py-1.5 text-sm pl-10 w-full outline-none bg-blue-100 text-gray-900  border-0 border-b-2 border-blue-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b" placeholder="Title" autocomplete="off">
                    <span class="absolute inset-y-0 -ml-6 -mt-4">
                    <button type="submit" class="p-1 focus:outline-none focus:shadow-outline" on:click|stopPropagation={()=> dt2=false}>
                       <svg fill="red" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"></path></svg>
                   
                      </button>
                    </span>
                  </div>        -->
                {/if}
          

               </th>
  

                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Status
                </th>
                
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Phone/Mobile/email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium  text-black  uppercase tracking-wider">
                  <span >Action</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href="#" class="text-red-600 hover:text-red-900 mr-5"><i class="far fa-trash-alt fa-lg"/></a>
                  <a href="#" class="text-green-600 hover:text-green-900 mr-4" on:click={()=>toggle_edit()}><i class="far fa-edit fa-lg"/></a>
                  <a href="#" class="text-green-600 hover:text-green-900" on:click={toggle_viewdetail}><i class="far fa-eye fa-lg"/></a>
                </td>
              </tr>
  

              
           

              {#if myc ==='visible'}
              <!--tr class = {myc}-->
              <tr>
                <td colspan="6" headers="Col2">
                  
                    <Companydetails companydata_init ={compdata} firstvisit = {firstvisit} refdata = {refdata} mode = {mymod} />
                  
                </td>
              </tr>
              {/if}
         

              <!-- More rows... -->
          </tbody>
          </table>
        </div>
      </div>
    </div>
</div>
{/if}

{#if mymod ==='edit'}
<Alerts targetid="sudo1"/>
<Companydetails companydata_init={compdata} firstvisit = {firstvisit} refdata = {refdata} mode = {mymod} on:editresult= {handleresult}/>
{/if}




<style>
  	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}

  .avatar{
		height:200px;
		width:200px;
	}
</style>