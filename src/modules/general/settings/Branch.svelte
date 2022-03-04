
  <script>

import {formValidator} from '../../../common/formvalidators/formvalidator';
import {onMount, onDestroy} from 'svelte';
import { http } from '../../../stores/services';

import { Accordion, AccordionItem } from "../../../common/accordion/index";
import Branchdetails from './Branchdetails.svelte';

import Alerts from '../../../common/notifications/components/alerts/Alerts.svelte';

import { entityStore,enityVal, authStore, authVal } from "../../../stores/stores";
import {getMissingRef} from "../../../common/utilfuncs/refdata";

import { getNotificationsContext } from '../../../common/notifications';
const { addNotification } = getNotificationsContext();



  let dt2 = false 
  let dt1 = false
  let refdata = {};
  let brndata = [];
  let datatosend = [];
	
let mymod = 'display';
let myc = "hidden";
let mymodal = null;
let selectedbranch = "";


let firstvisit = sessionStorage.getItem('brnfirst');
sessionStorage.removeItem('brnfirst');
if(firstvisit == null) firstvisit = false;

const brnfetchprogressmodal = () => {
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


function toggle_viewdetail(branchdata={}){ 
  console.log(JSON.stringify(branchdata));
  datatosend = [];
  if (myc === "hidden") {
    myc = "visible";
  } else {
    myc = "hidden";
  }
  mymod ='display';
  if(JSON.stringify(branchdata) !== JSON.stringify({})) datatosend.push(branchdata);    
}

  function toggle_edit(branchdata={}) {
    mymod="edit";
    datatosend = [];
    if(brndata.length <= 0)  mymod="new";
    if(JSON.stringify(branchdata)=== JSON.stringify({})) mymod = 'new';
    if(firstvisit)  mymod="new";
    myc = "hidden";    
    if(JSON.stringify(branchdata) !== JSON.stringify({})) datatosend.push(branchdata);    
  }

  
  


onMount(async() => {  
  console.log("going to onmount");
      await getBranch();      
 
    //if (brndata.length <= 0) toggle_edit();
  });

  onDestroy(async() => {
    if(mymodal) {
      mymodal.close();
      mymodal=null;
    }
  })


  const getBranch = async(goforfetch = false) => {
    console.log("inside getBranch inner if");    
    mymodal =brnfetchprogressmodal();  
    let respdata;
    /*  
    if(goforfetch && selectedbranch !="") {
      respdata = await http.post('getbranch',[
                      {"Entitytype":"company","Entityid":[authVal.activecompany.companyId]},
                      {"Entitytype":"branch","Entityid":[selectedbranch]}
                    ]).catch( e => {
          let s = allAlerts({tgt:"sudo",text:"Technical error",type:'error'});    
          return;
        });
    
        if(respdata.data.branch.length == 1 ) {
          await authStore.setBranch(JSON.parse(JSON.stringify(respdata.data.branch[0])));
        } else {
          //TODO: Throw error
        } 
        ref = JSON.parse(JSON.stringify(respdata.data.refdata));
        await entityStore.setRef({refdatatype:"branch",refdata:ref}); 
        console.log("after getcompany set store end");
    } else 
    */
    let misrefs = getMissingRef("branch");
    //if(JSON.stringify(enityVal.brrefdata) === JSON.stringify({})) {
    if(misrefs.length > 0) {
        //let respdata = await http.post('getrefdata',[{"Reftype": "group", "Refname": "branch"}]).catch(e=>{
        let respdata = await http.post('getrefdata',misrefs).catch(e=>{  
            //TODO Error handling
            console.error(e);
          });
        console.log(respdata);
        let ref = JSON.parse(JSON.stringify(respdata.data.refdata));
        await entityStore.setRef(ref); 
    }

    brndata = [];
    console.log(authVal.allbranch !== undefined);
    if(authVal.allbranch !== undefined && authVal.allbranch !== null && authVal?.allbranch.length > 0)
        brndata=(JSON.parse(JSON.stringify(authVal.allbranch.slice())));   
    refdata = JSON.parse(JSON.stringify(enityVal.refdata));  

    if (brndata.length <= 0) {
      firstvisit = true;
      toggle_edit();
    }else {
      firstvisit = false;
    }
    mymodal.close();
    mymodal=null;
    console.log("inside onmoung inner if end of getcompany");

  }


  /*
  const getBranch = async(goforfetch = false) => {
    console.log("inside getBranch inner if");
      console.log(JSON.stringify(enityVal));
    mymodal =brnfetchprogressmodal();  
    let respdata;
    console.log(enityVal);
    console.log(enityVal.branch);
    console.log( JSON.stringify(enityVal.branch.length) === 0); 
    if(!goforfetch) {
      if (enityVal.branch.length === 0 || JSON.stringify(enityVal.refdata) === JSON.stringify({})) {
        goforfetch = true;  
      } 
    }    

    if(goforfetch) {
      //respdata = await http.get('getbranch'); 
      respdata = await http.post('getbranch',{"Entitytype":"company","Entityid":authVal.activecompany.companyId}); 
      console.log(JSON.stringify(respdata));
      console.log("after getBranch set store start"); 
      console.log(respdata.data.branch.length);
      if(respdata.data.branch.length > 0) {
        entityStore.setBranch(JSON.parse(JSON.stringify(respdata.data.branch)));
      } else {
        entityStore.setBranch([]); 
      }
      
      entityStore.setRef(JSON.parse(JSON.stringify(respdata.data.refdata))); 
      console.log("after getBranch set store end");
    }        

    console.log(JSON.stringify(enityVal.branch));
    console.log(JSON.stringify(enityVal.refdata));
    
    brndata=JSON.parse(JSON.stringify(enityVal.branch.slice()));   
    console.log(enityVal.branch) ;
    console.log(brndata) ;
    refdata = JSON.parse(JSON.stringify(enityVal.refdata));  

    if (brndata.length <= 0) {
      firstvisit = true;
      toggle_edit();
      
    }else {
      firstvisit = false;
    }
    mymodal.close();
    mymodal=null;
    console.log("inside onmoung inner if end of getBranch");
  };
*/

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

  async function handleresult(event) {
  console.log(event.detail.action);  
  if (['Save','Update'].includes(event.detail.action)) await getBranch(true);

  
   if (brndata.length <= 0) {    
    let s = allAlerts({tgt:"sudo1",text:"No Branch setup exists. Please save Branch",type:'error'});    
  } else {
    mymod = 'display';
    myc = "hidden";

    if (['Save','Update'].includes(event.detail.action)) {
      //let s = allAlerts({tgt:"sudo",text:event.detail.action + " action for Company " + event.detail.company.companyName + " is successful",type:'success'});    
      let s = addNotification({
				//targetid: val.tgt,
				title : 'Alert',				
				//text: 'dkdkdk',
				text: event.detail.action + " action for Branch " + event.detail.branchName + " is successful",
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
              <h2 class="text-2xl  text-gray-700 font-bold">Branch Settings</h2>
              <span class = "flex px-7"></span>     
                      
              <button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click|preventDefault={()=>toggle_edit()}>Add New</button>      
              
              <!--                       
              <select  
              class="flex mt-0 w-full md:w-56  px-2 py-1.5 bg-white rounded-2xl border-0 border-b-2 border-white-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                          
              >
              <option value="" >Select Company</option>
              <option value="1" >Select 1</option>
              <option value="2" >Select 2</option>
              </select>
              --> 
            </div>              
            <div></div>
          </caption>
          <thead class="bg-blue-100">
            <tr>
              <th on:click={()=> dt1=true} on:focusout={()=> dt1=false} scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <span >Name</span>
              <!--
                  {#if !dt1}
                      <span>Name</span>
                  {:else}

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
                    </div>
                  {/if}
              -->
              </th>

              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Company Name
              </th>



              <th scope="col" on:click={()=> dt2=true} on:focusout={()=> dt2=false} class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <span>Address</span>
              <!--
                  {#if !dt2}
                  <span>Title</span>
              {:else}

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
                </div>
              {/if}
          -->

              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Phone/Mobile/email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium  text-gray-700 uppercase tracking-wider">
                <span >Action</span>
              </th>
            </tr>
          </thead>

          {#each brndata as brndat}

          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {brndat.branchName}
                    </div>
                    <div class="text-sm text-gray-500">
                      {brndat.branchEmail}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{brndat.companyName}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{brndat.branchAddLine1}</div>
                <div class="text-sm text-gray-500">{brndat.branchAddLine2}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {brndat.branchStatus}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="text-sm text-gray-900">{brndat.branchPhone}</div>
                <div class="text-sm text-gray-900">{brndat.branchMobile}</div>
                <div class="text-sm text-gray-900">{brndat.branchFax}</div>
                <div class="text-sm text-gray-900">{brndat.branchWebsite}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href="#" class="text-green-600 hover:text-red-900 mr-5" on:click|preventDefault={()=>toggle_viewdetail(brndat)}><i class="far fa-eye fa-lg"/></a>
                <a href="#" class="text-green-600 hover:text-green-900 mr-4" on:click|preventDefault={()=>toggle_edit(brndat)}><i class="far fa-edit fa-lg"/></a>
              </td>
            </tr>


            {#if myc ==='visible' && datatosend[0].branchId === brndat.branchId }
            <!--tr class = {myc}-->              
            <tr>
            <td colspan="6" headers="Col2">
                <Branchdetails branchdata_init ={datatosend} firstvisit = {firstvisit} refdata = {refdata} mode = {mymod} />
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
  <Branchdetails branchdata_init ={datatosend} firstvisit = {firstvisit} refdata = {refdata} mode = {mymod}  on:editresult= {handleresult}/>
{/if}

