<script>

import {formValidator} from '../../../common/formvalidators/formvalidator';
import {onMount, onDestroy} from 'svelte';
import { http } from '../../../stores/services';

import { createForm } from "svelte-forms-lib";

import { Accordion, AccordionItem } from "../../../common/accordion/index";
import Companydetails from './Companydetails.svelte';

import Alerts from '../../../common/notifications/components/alerts/Alerts.svelte';

import { entityStore,enityVal, authStore, authVal } from "../../../stores/stores";
import {getMissingRef} from "../../../common/utilfuncs/refdata";

import { getNotificationsContext } from '../../../common/notifications';
import { each } from 'svelte/internal';
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
  let datatosend = [];
	
let mymod = 'display';
let myc = "hidden";
let mymodal = null;

//sessionStorage.setItem('myWork', 'Developer');
let firstvisit = sessionStorage.getItem('cpyfirst');
sessionStorage.removeItem('cpyfirst');
if(firstvisit == null) firstvisit = false;





    const { form, handleChange, handleSubmit } = createForm({
      initialValues: {
        title: "",
        name: "",
        email: ""
      },
      onSubmit: values => {
        alert(JSON.stringify(values));
      }
    });


  


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
    mymod="edit";
    datatosend = [];

    if(compdata.length <= 0)  mymod="new";
    if(JSON.stringify(compdata)=== JSON.stringify({})) mymod = 'new';
    if(firstvisit)  mymod="new";
    console.log("firstvisit",firstvisit);
    myc = "hidden";
    if(JSON.stringify(compdata) !== JSON.stringify({})) datatosend.push(compdata);  

  }


  async function handleresult(event) {
  console.log(event.detail.action);  
  if (['Save','Update'].includes(event.detail.action)) await getCompany(true);

  
   if (compdata.length <= 0) {    
    let s = allAlerts({tgt:"sudo1",text:"No company setup exists. Please save company",type:'error'});    
  } else {
    mymod = 'display';
    myc = "hidden";

    if (['Save','Update'].includes(event.detail.action)) {
      //let s = allAlerts({tgt:"sudo",text:event.detail.action + " action for Company " + event.detail.company.companyName + " is successful",type:'success'});    
      let s = addNotification({
				//targetid: val.tgt,
				title : 'Alert',				
				//text: 'dkdkdk',
				text: event.detail.action + " action for Company " + event.detail.company.companyName + " is successful",
				type:'success',								
				notificationtype: 'notification',     
				disableClose: false,        
        position:'bottom-right',
        removeAfter:2000,
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
/*
      let s1 = addNotification({
				//targetid: val.tgt,
				title : 'Second Alert',				
				//text: 'dkdkdk',
				text: event.detail.action + " action for Company " + event.detail.company.companyName + " is successful",
				type:'success',								
				notificationtype: 'notification',     
				disableClose: false,        
        position:'bottom-right',
        removeAfter:2000,
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
*/
    }
  }
}


onMount(async() => {  
  console.log("going to onmount");
    await getCompany();
    console.log((authVal));
    console.log("firstvisit de atuvalue send",firstvisit);

    //if (compdata.length <= 0) toggle_edit();
  });

  onDestroy(async() => {
    if(mymodal) {
      mymodal.close();
      mymodal=null;
    }
  })


const getCompany = async(goforfetch = false) => {
    console.log("inside getCompany inner if");
    mymodal =loginprogressmodal();      
    let respdata;
  /*
    if(goforfetch) {
        let respdata = await http.post('getcompany',[{"Entitytype":"company","Entityid":[authVal.activecompany.companyId]}]).catch( e => {
          let s = allAlerts({tgt:"sudo",text:"Technical error",type:'error'});    
          return;
        });

        if(respdata.data.company.length > 0 ) {
          authStore.setCompany(JSON.parse(JSON.stringify(respdata.data.company[0])));
        } else if(respdata.data.company.length < 1){
          //TODO: Throw error
        }         
        let ref = JSON.parse(JSON.stringify(respdata.data.refdata));
        await entityStore.setRef({refdatatype:"company",refdata:ref}); 
        console.log("after getcompany set store end");
    } else 
    */
    let misrefs = getMissingRef("company");
    if(misrefs.length > 0) {
    //if(JSON.stringify(enityVal.cprefdata) === JSON.stringify({})) {

      
        //let respdata = await http.post('getrefdata',[{"Reftype": "group", "Refname": "company"}]).catch(e=>{
        //let respdata = await http.post('getrefdata',getMissingRef("company")).catch(e=>{  
          let respdata = await http.post('getrefdata',misrefs).catch(e=>{  
          //TODO Error handling
            console.error(e);
          });

        console.log(respdata);
        let ref = JSON.parse(JSON.stringify(respdata.data.refdata));
        await entityStore.setRef(ref); 
    }
    console.log(authVal);
    compdata = [];  
    if(authVal.activecompany !== null ) compdata.push(JSON.parse(JSON.stringify(authVal.activecompany)));   
    refdata = JSON.parse(JSON.stringify(enityVal.refdata));  
    console.log(compdata.length );
    console.log(compdata );

    if (compdata.length <= 0) {
      firstvisit = true;
      toggle_edit();
    }else {
      firstvisit = false;
    }
    mymodal.close();
    mymodal=null;
    console.log("firstvisit inner end",firstvisit);
    console.log("inside onmoung inner if end of getcompany");
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
{#if !(['edit','new'].includes(mymod))}

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

            {#each compdata as compdat}
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {compdat.companyName}
                      </div>
                      <div class="text-sm text-gray-500">
                        {compdat.companyEmail}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{compdat.companyAddLine1}</div>
                  <div class="text-sm text-gray-500">{compdat.companyAddLine2}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {compdat.companyStatus}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-900">{compdat.companyPhone}</div>
                  <div class="text-sm text-gray-900">{compdat.companyMobile}</div>
                  <div class="text-sm text-gray-900">{compdat.companyFax}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <!--a href="#" class="text-red-600 hover:text-red-900 mr-5"><i class="far fa-trash-alt fa-lg"/></a-->
                  <a href="#" class="text-green-600 hover:text-red-900 mr-5" on:click={toggle_viewdetail}><i class="far fa-eye fa-lg"/></a>
                  <a href="#" class="text-green-600 hover:text-green-900 mr-4" on:click={()=>toggle_edit()}><i class="far fa-edit fa-lg"/></a>
                  <!--a href="#" class="text-green-600 hover:text-green-900" ><i class="far fa-eye fa-lg"/></a-->
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
          {/each}
          </table>
        </div>
      </div>
    </div>
</div>
{/if}

{#if mymod ==='edit' || mymod ==='new'}
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