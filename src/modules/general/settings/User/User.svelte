<script>

import { onMount } from "svelte";
import Alerts from '../../../../common/notifications/components/alerts/Alerts.svelte';
import Userdetails from './Userdetails.svelte';
import { authStore,authVal,usermatrixStore} from '../../../../stores/stores';
import { getNotificationsContext } from '../../../../common/notifications';
const { addNotification } = getNotificationsContext();
import { http } from '../../../../stores/services';

/// Tabs
//https://catalin.red/css3-jquery-folder-tabs/

let mymod = 'list';

onMount(async ()=> {
  await getAllUserMatrixForCompany();
})

const getAllUserMatrixForCompany = async() => {
  $usermatrixStore.mode = 'list';
  let mymodal =Rolefetchprogressmodal();       


    if ($usermatrixStore.Listallmatrix.length  === 0) {
      
      let postdata = {"Optype":"list","Companyid":authVal.activecompany.companyId};
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
          
        if (ref.Listmatrix && ref.Listmatrix.length) {
            $usermatrixStore.Listallmatrix = ref.Listmatrix.slice();
        } else {
            $usermatrixStore.Listallmatrix = [];
        }        
        //$usermatrixStore.Availablemodules = ref.Availablemodules.slice(); 
      }
    }  

    console.log($usermatrixStore);
  
  if(mymodal) {			
    mymodal.close();
    mymodal=null;
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

  
function toggle_edit(matrixdata={item:{},itemIndex:null}) {
  console.log("toogle eeid");  
  console.log(matrixdata);
  $usermatrixStore.mode="edit";
  if(JSON.stringify(matrixdata.item) === JSON.stringify({})) {
    $usermatrixStore.mode = 'new';
    $usermatrixStore.Livematrix = JSON.parse(JSON.stringify(matrixdata.item));
    $usermatrixStore.Livematrixindex = matrixdata.itemIndex;
  }
  /*  
  if($usermatrixStore.Selectedmodules.length <= 0)  mymod="new";  
  if(firstvisit)  mymod="new";
  myc = "hidden";  
  */
}


async function handleresult(event) {
  console.log(event.detail.action);  
  //TODO: Don't go for full fetch.  after Save/Update, replace the new values in store
  if (!['cancel'].includes(event.detail.action)) callalert(event);


  /* if (roledata.length <= 0) {    
  let s = allAlerts({tgt:"sudo1",text:"No Role setup exists. Please save company",type:'error'});    
  } else {*/
    $usermatrixStore.mode = 'list';
  //myc = "hidden";
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

<Alerts targetid="useralert_1"/>

{#if (['list'].includes($usermatrixStore.mode))}

    <div class="flex flex-col" >

        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <caption class="bg-blue-100 rounded-t-lg divide-y divide-gray-300">                                
                    <div class="flex md:flex-row flex-col items-center md:h-20 px-7">
                      <h2 class="text-2xl  text-gray-700 font-bold">User Settings</h2>
                      <span class = "flex px-7"></span>
                      <button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click|preventDefault={()=>toggle_edit()}>Add New</button>      
                      <span class = "flex flex-grow"></span>    
                      <select  
                      class="flex mt-0 w-full md:w-56  px-2 py-1.5 bg-white rounded-2xl border-0 border-b-2 border-white-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                          
                      >
                      <option value="" >Select Company</option>
                      <option value="1" >Select 1</option>
                      <option value="2" >Select 2</option>
                      </select>                      
                      
                      <select  
                      class="flex mt-0 w-full md:w-56 ml-3  px-2 py-1.5 bg-white rounded-2xl border-0 border-b-2 border-white-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                          
                      >
                      <option value="" >Select Branch</option>
                      <option value="1" >Select 1</option>
                      <option value="2" >Select 2</option>
                      </select> 
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
                          <span>Branch Access</span>
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
                        Phone/Mobile/email
                    </th>


                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      

                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium  text-gray-700 uppercase tracking-wider">
                        <span >Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {#each $usermatrixStore.Listallmatrix as item, itemIndex (item)}
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
                        <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                        <div class="text-sm text-gray-500">Optimization</div>
                      </td>

                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Admin
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href="#" class="text-green-600 hover:text-green-900 mr-5" ><i class="far fa-eye fa-sm"/></a>
                        <a href="#" class="text-red-600 hover:text-red-900 mr-5" ><i class="far fa-trash-alt fa-lg"/></a>
                        <a href="#" class="text-green-600 hover:text-green-900" on:click|preventDefault={()=>toggle_edit({item,itemIndex})}><i class="far fa-edit fa-lg"/></a>
                      </td>
                    </tr>
                    {/each}
                    <!-- More rows... -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/if}

        {#if (['edit','new','display'].includes($usermatrixStore.mode))}
          <Userdetails  on:editresult= {handleresult}></Userdetails>
        {/if}
<!--
          <div class="shadow rounded-lg  h-56  bg-white overflow-auto	">
            <ul class="bg-white rounded shadow w-56 flex flex-row flex-grow">
                
                <li class="block px-2 py-0.5 active:bg-blue-100">sdf</li>
                <li class="block px-2 py-0.5 active:bg-blue-100">sd</li>
                <li class="block px-2 py-0.5 active:bg-blue-100">dfd</li>
                <li class="block px-2 py-0.5 active:bg-blue-100">dfdf</li>


            </ul>
        <div>
    </div>
    <div>cccccc</div>
    -->



    <!--                <div class="flex md:flex-row flex-col justify-around ">
                
                <div class="flex xl:flex-row md:space-y-3 xl:space-y-0 flex-col justify-around ">

                   <div class = "flex flex-col bg-green-100 justify-center shadow rounded-lg p-3">
                        <div class="p-3"><h2 >Branch selection</h2></div>
                        <div class = "flex flex-col md:flex-row bg-blue-100 justify-center shadow rounded-lg p-3">
                        
                            <div class="order-2 px-5 flex flex-col justify-center">
                                <button class="p-1"><i class="fas fa-angle-double-right fa-lg"></i></button>
                                <button class="p-1"><i class="fas fa-angle-right  fa-lg"></i></button>
                                <button class="p-1"><i class="fas fa-angle-left   fa-lg"></i></button>
                                <button class="p-1"><i class="fas fa-angle-double-left fa-lg"></i></button>                               
                                
                            </div>
                            {#each baskets as basket, basketIndex (basket)}
                            <div animate:flip class="shadow rounded-lg p-3 bg-white order-{basketIndex >= 1?basketIndex+2:basketIndex+1}">
                              <b class="m-3">{basket.name}</b>
                              <ul
                                class = "flex flex-col overflow-auto h-80 mt-4"
                                on:dragenter={() => hoveringOverBasket = basket.name}
                                on:dragleave={() => hoveringOverBasket = null}
                                    on:drop={event => drop(event, basketIndex)}
                                    ondragover="return false"
                              >
                                  {#each basket.items as item, itemIndex (item)}
                                        <div class="inline" animate:flip>
                                        <li
                                            class="bg-white rounded-b shadow block p-3 cursor-pointer border-2 w-64  hover:bg-yellow-200 "
                                            draggable={true}
                                              on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                                          >
                                            {item}
                                        </li>
                                        </div>
                                  {/each}
                              </ul>                              
                            </div>
                            
                          {/each}                        
                        </div>
                    </div>
                   <div class="px-3"></div>
                    <div class = "flex flex-col bg-green-100 justify-center shadow rounded-lg p-3">
                        <div class="p-3"><h2 >Service selection</h2></div>
                        <div class = "flex flex-col md:flex-row bg-blue-100 justify-center shadow rounded-lg p-3">
                        <div class="order-2 px-5 flex flex-col justify-center">
                            <button class="p-1"><i class="fas fa-angle-double-right fa-lg"></i></button>
                            <button class="p-1"><i class="far fa-hand-point-right  fa-lg"></i></button>
                            <button class="p-1"><i class="far fa-hand-point-left   fa-lg"></i></button>
                            <button class="p-1"><i class="fas fa-angle-double-left fa-lg"></i></button>                               
                            
                        </div>
                        {#each baskets as basket, basketIndex (basket)}
                        <div animate:flip class="shadow rounded-lg p-3 bg-white order-{basketIndex >= 1?basketIndex+2:basketIndex+1}">
                          <b class="m-3">{basket.name}</b>
                          <ul
                            class = "flex flex-col overflow-auto h-80 mt-4"
                            on:dragenter={() => hoveringOverBasket = basket.name}
                            on:dragleave={() => hoveringOverBasket = null}
                                on:drop={event => drop(event, basketIndex)}
                                ondragover="return false"
                          >
                              {#each basket.items as item, itemIndex (item)}
                                    <div class="inline" animate:flip>
                                    <li
                                        class="bg-white rounded-b shadow block p-3 cursor-pointer border-2 w-64  hover:bg-yellow-200 "
                                        draggable={true}
                                          on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                                      >
                                        {item}
                                    </li>
                                    </div>
                              {/each}
                          </ul>                              
                        </div>
                        
                      {/each}                        
                    </div>
                </div>
            </div>
                </div-->
            
<!--           <div class="bg-red-100"></div>-->


              <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
              <!--
              <div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">
                <div class="p-3"><h2 >Service selection</h2></div>
                <div>Available Branch and Roles for the Company</div>
                <div class = "flex flex-col md:flex-row bg-blue-100 justify-center gap-x-5 shadow rounded-lg p-3">
                
                {#each baskets1 as basket, basketIndex (basket)}                           
                <--div animate:flip ->
                  {#if basketIndex <=1}     
                

                <div class="shadow rounded-lg p-3 bg-gray-100 order-{basketIndex >= 1?basketIndex+2:basketIndex+1} w-1/2">
                  <b class="m-3 p-5">{basket.name}</b>
                  
                  
                  <ul
                    class = "flex flex-row flex-wrap overflow-auto flex-grow content-centre	justify-start	md:space-x-4 space-y-4 p-5 h-60"
                    on:dragenter={() => hoveringOverBasket = basket.name}
                    on:dragleave={() => hoveringOverBasket = null}
                        on:drop={event => drop1(event, basketIndex)}
                        ondragover="return false"
                  >
                      {#each basket.items as item, itemIndex (item)}
                            <div class="inline" animate:flip>
                            <li
                                class="bg-{basketIndex >= 1? `green`:`blue`}-100 rounded-b shadow block p-3 cursor-pointer border-2 w-64  hover:bg-yellow-200 "
                                draggable={true}
                                  on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                              >
                              <span class="flex flex-row items-center">  
                                {item}                   
                                <span class="flex flex-1 "></span>             
                                <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                              </span>
                            </li>
                            </div>
                      {/each}
                  </ul>  
                </div>                                          
                
                {/if}       
          <--/div->                   
          {/each}  
        </div>
            <div>User access branch wise matrix</div>
            <div class = "flex flex-col md:flex-row bg-blue-100 justify-center gap-x-5 shadow rounded-lg p-3">
            <div class="bg-gray-100 flex flex-row flex-wrap flex-auto content-centre	justify-center	md:space-x-4 space-y-4 p-5">
              {#each baskets1 as basket, basketIndex (basket)}
              <div animate:flip >
                {#if basketIndex >1}     
              
              <--test->
              <div  class="shadow rounded-lg p-3  bg-blue-100 ">
                <div class="bg-blue-100 rounded-t w-64 p-2 break-words">
                  <div class="flex flex-row justify-center">
                    <b class="m-3 ">{basket.name}</b>
                    <span class="flex flex-1 "></span>    
                    <i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i>
                  </div>
                </div>
                <ul
                  class = "flex flex-col overflow-auto w-64  h-64 mt-4 "
                  on:dragenter={() => hoveringOverBasket = basket.name}
                  on:dragleave={() => hoveringOverBasket = null}
                      on:drop={event => drop1(event, basketIndex)}
                      ondragover="return false"
                >
                    {#each basket.items as item, itemIndex (item)}
                          <div class="inline" >
                          <li
                              class="bg-green-100 rounded-b shadow block p-3 cursor-pointer border-2 w-64 hover:bg-yellow-200 "
                              draggable={true}
                                on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                            > 
                            {item}                           
                            <--span class="flex flex-row items-center">  
                              {item}                   
                              <span class="flex flex-1 "></span>             
                              <input type="checkbox" class="form-checkbox h-3 w-3 text-indigo-400" checked><span class="ml-2 text-gray-700"></span>
                            </span->
                                                         
                          </li>
                          </div>
                    {/each}
                </ul>
              </div>   
              {/if}
              </div>
              {/each}  
            </div>
          </div>



<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
            

            <!--/div-->