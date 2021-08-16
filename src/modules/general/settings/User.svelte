<script>

import {flip} from 'svelte/animate';
import { writable } from 'svelte/store';
import { Tabs, TabList, TabPanel, Tab } from '../../../common/tabs/tab';

/// Tabs
//https://catalin.red/css3-jquery-folder-tabs/



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

	let baskets3 = [
    {
      "name": "Basket 1",
      "items": ["Orange", "Pineapple","banan1","papap1","kdkjfiue1","kdjiejc1","Pineapple2","banan2","papap2","kdkjfiue2","kdjiejc2","Pineapple3","banan3","papap3","kdkjfiue3","kdjiejc3"]
    },
    {
      "name": "Basket 2",
      "items": ["Banana", "Apple"]
    }
  ];
  
  
	let baskets1 = [
    {
      "name": "Basket 11",
      "items": ["Orange", "Pineapple","banan1","papap1","kdkjfiue1","kdjiejc1","Pineapple2","banan2","papap2","kdkjfiue2","kdjiejc2","Pineapple3","banan3","papap3","kdkjfiue3","kdjiejc3"]
    },
    {
      "name": "Basket 21",
      "items": ["Orange", "Pineapple","banan1","papap1","kdkjfiue1"]
    },
    {
      "name": "Basket 22",
      "items": []
    },
    {
      "name": "Basket 23",
      "items": []
    },
    {
      "name": "pasir ris pungol towncouncil branch dasddkkd dkdkjeiruekd dkfkdkd",
      "items": []
    },
    {
      "name": "Basket 25",
      "items": []
    },
    {
      "name": "Basket 26",
      "items": []
    },
    {
      "name": "Basket 27",
      "items": []
    },
    {
      "name": "Basket 28",
      "items": []
    },
    {
      "name": "Basket 29",
      "items": []
    },
    {
      "name": "Basket 30",
      "items": []
    },
    {
      "name": "Basket 33",
      "items": ["biscut", "cream"]
    },
    {
      "name": "Basket 35",
      "items": []
    },
    {
      "name": "Basket 36",
      "items": []
    },
    {
      "name": "Basket 37",
      "items": []
    },
    {
      "name": "Basket 38",
      "items": []
    },
    {
      "name": "Basket 39",
      "items": []
    },
    {
      "name": "Basket 40",
      "items": []
    },
    {
      "name": "Basket 31",
      "items": ["biscut", "cream"]
    }
    
  ];

  let hoveringOverBasket;
  let hoveringOverBasket1;
  


  function togglemenu(event, basketIndex, itemIndex) {
    $baskets.Availablemodules[basketIndex].submodules[itemIndex].menu = !$baskets.Availablemodules[basketIndex].submodules[itemIndex].menu;
  }

  function removerole(basketIndex,itemIndex) {
    $baskets.Selectedmodules[basketIndex].submodules.splice(itemIndex,1);
    $baskets = $baskets;
  }

function dragStart(event, basket,groupid,subbasket,subbaskIndex,itemIndex,item) {
		// The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
        console.log("starting drag");
        const data = {basket,groupid,subbasket,subbaskIndex,itemIndex,item};
        console.log(data);
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	function drop(event, target,taritem=null) {
        console.log('drop');        
        console.log(JSON.stringify(target));
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const data = JSON.parse(json);        
        console.log(JSON.stringify(data));
        console.log(JSON.stringify($baskets));
        console.log("-----------");
        console.log(JSON.stringify(taritem));
        console.log("-----------");
        if(data.basket !== target.basketname && data.groupid === target.groupid) {
            if(data.basket === "Availablemodules" && target.basketname === "Selectedmodules" && data.subbasket === "Branches"){                
              let intarget = [];
              if($baskets.Selectedmodules.length){
                  intarget= null;
                  intarget = $baskets.Selectedmodules.filter(x => x.name === data.item.name);                
              }                
              if(intarget.length === 0) {
                  console.log($baskets.Availablemodules);
                  $baskets.Availablemodules[data.subbaskIndex].submodules = $baskets.Availablemodules[data.subbaskIndex].submodules.filter(x => !(x.name === data.item.name));                  
                  //let x = {...data.basket,basketname:"Selectedmodules"};
                  //let y = {...x,submodules:item}
                  $baskets.Selectedmodules.push({...data.item,basketname:"Selectedmodules",groupid:"mygroup",submodules:[]});
              }
            }

            if(data.basket === "Availablemodules" && target.basketname === "Selectedsubmod" && data.subbasket === "Roles"){                 

                  let intarget= [];
                  let m = $baskets.Selectedmodules.findIndex(x => x.name === target.basket.name);
                  if($baskets.Selectedmodules[m].submodules.length !== 0) {                    
                    intarget = $baskets.Selectedmodules[m].submodules.filter(x => x.name === data.item.name);
                  }
                  console.log(intarget);
                  console.log($baskets.Selectedmodules[m]);
                              
              if(intarget.length === 0) {
                  console.log($baskets.Availablemodules);
                  //baskets.Availablemodules[data.subbaskIndex].submodules = baskets.Availablemodules[data.subbaskIndex].submodules.filter(x => !(x.name === data.item.name));                  
                  //let x = {...data.basket,basketname:"Selectedmodules"};
                  //let y = {...x,submodules:item}
                  $baskets.Selectedmodules[m].submodules.push({...data.item});
                  let sm = $baskets;
                  $baskets = sm;
              }

            }             
        }

        console.log(JSON.stringify($baskets));

        
        

		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
      // const [item] = baskets.Availablemodules[data.basketIndex].items.splice(data.itemIndex, 1);
        
		
    // Add the item to the drop target basket.
	      //baskets.Selectedmodules[basketIndex].items.push(item);
	//	baskets = baskets;
		
    hoveringOverBasket = null;   
    }


    function pushRoleToAllBranch(basketIndex, item){
      console.log(item);
      let putput = true;
      $baskets.Selectedmodules.forEach((x) => {
            x.submodules.forEach((y) => { 
              console.log(y);
              if(y.name === item.name) {
                putput = false;
              }
            });                 
          if(putput) x.submodules.push({...item});
          putput = true;
      });
      //$baskets = $baskets;
    }

    function removebranch(basket) {
      console.log(basket);
      let {name,selected} = basket;
      $baskets.Availablemodules[0].submodules.push({name,selected});
      $baskets.Selectedmodules=$baskets.Selectedmodules.filter(x=> !(x.name === basket.name));
      //$baskets = $baskets;
    }
    
    let dd = {
                companyId: null,
                companyname: null,        
                branchId: null,
                branchName: null,
                branchShortName: null,
                branchCategory: null,
                branchStatus: null,
                branchDescription: null,
                branchImageUrl: null,
                branchAddLine1: null,
                branchAddLine2: null,
                branchCity: null,
                branchState: null,
                branchCountry: null,
                branchPinCode: null,
                branchPhone: null,
                branchFax: null,
                branchMobile: null,
                branchWebsite: null,
                branchEmail: null,
                branchStartDate: null,
                entityId: null,
            };
      
      let dt1 = false;
      let dt2 = false;
      
      
      
      </script>


    
    <div class="flex flex-col" >

        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <caption class="bg-blue-100 rounded-t-lg divide-y divide-gray-300">                                
                    <div class="flex md:flex-row flex-col items-center md:h-20 px-7">
                      <h2 class="text-2xl  text-gray-700 font-bold">User Settings</h2>
                      <span class = "flex px-7"></span>
                      <button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Add New</button>      
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
                        <a href="#" class="text-red-600 hover:text-red-900 mr-5"><i class="far fa-trash-alt fa-lg"/></a>
                        <a href="#" class="text-green-600 hover:text-green-900"><i class="far fa-edit fa-lg"/></a>
                      </td>
                    </tr>
        
                    <!-- More rows... -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div class="py-10"></div>

    
        <div class="shadow rounded-lg flex flex-col  bg-white">
            <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
                <h2 class="text-2xl text-black text-gray-700 font-bold">New User</h2>  
                <span class="flex-grow"></span>  
               <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Save</button>
               <span class="flex w-5"></span>
              <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md">Cancel</button>      
            </div>
            <Tabs>
              <TabList>
                <Tab>Register Company</Tab>
                <Tab>User Enrolment</Tab>
            
              </TabList>
              <TabPanel>
                <p>Add some data</p>
              </TabPanel>
              <TabPanel>
            <form class="px-10 py-1 rounded w-full my-5 inputs space-y-6">
                <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
          


                    <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                        <label for="firstname">Company</label>
                                <select required 
                                class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                >dasdfasdf</select>
                                <div class="pristine-error-group"></div>
                            </div>


                            <div class="pristine-form-group md:col-span-3">				  
                                <label for="firstname">Branch</label>
                                        <select required 
                                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                        >dasdfasdf</select>
                                        <div class="pristine-error-group"></div>
                                    </div>


                                    <div class="pristine-form-group md:col-span-3">				  
                                        <label for="firstname">Copy from User</label>
                                                <select required 
                                                class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                                >dasdfasdf</select>
                                                <div class="pristine-error-group"></div>
                                            </div>
                </div>

            </form> 

          


            <div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">

              <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">

                  {#each $baskets.Availablemodules as basket, basketIndex (basket)} 
                      <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">

                          <b class="m-3 ">{basket.name}</b>

                          
                          <ul
                          class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full"
                        >
                        {#if basket.submodules.length === 0}
                          <div class ="h-52 flex-grow"> All Available Options are assigned </div>
                        {/if}
                          {#each basket.submodules as item, itemIndex (item)}
                              <div animate:flip class="inline" >
                                  <li   
                                  class=" shadow rounded-lg bg-green-100 rounded-lg cursor-pointer hover:bg-yellow-200 border-2 p-3 w-64"                     
                                    draggable={true}
                                    on:dragstart={event => dragStart(event, "Availablemodules", basket.groupid, basket.name, basketIndex, itemIndex,item)}
                                  >
                                      <span class="flex flex-row items-center">  
                                          {item.name}
                                          <span class="flex flex-1 "></span>             
                                          <div class="relative inline-block text-left"  on:click={(event)=>togglemenu(event, basketIndex, itemIndex)}>          
                                            <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                                            {#if $baskets.Availablemodules[basketIndex].submodules[itemIndex].menu}
                                            <div class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                              <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" on:click|preventDefault={()=> pushRoleToAllBranch(basketIndex,item)}>To all Branhes</a>
                                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">specific branch</a>
                                              </div>
                                            </div>
                                            {/if}
                                            </div>


                                      </span>
                                  </li>                        
                              </div>
                          {/each}
                        </ul> 
                          
                      </div>
                  {/each}
          
              </div>
              <div>spacing bewtween</div>
              <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3"
                on:dragenter={() => hoveringOverBasket = "Selectedmodules"}
                on:dragleave={() => null}
                on:drop={event => drop(event,{groupid:"mygroup",basketname:"Selectedmodules"})}     
                ondragover="return false"
              >
                {#if $baskets.Selectedmodules.length === 0}
                <div class ="h-96 flex-grow">Nothing selected yet</div>
              {/if}
                  {#each $baskets.Selectedmodules as basket, basketIndex (basket)} 
                      <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-80">
                        <div class="flex flex-row justify-center">
                          <b class="m-3 ">{basket.name}</b>
                          <span class="flex flex-1 "></span> 
                          <span on:click={()=>removebranch(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
                        </div>
                          
                          <ul
                          class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-72 h-60"
                            on:dragenter={() => hoveringOverBasket = "Selectedmodules_"+basket.name}
                            on:dragleave={() => hoveringOverBasket = null}
                            on:drop|stopPropagation={event => drop(event, {groupid:"mygroup",basketname:"Selectedsubmod",basket})}
                            ondragover="return false"
                        >
          
                          {#each basket?.submodules as item, itemIndex (item)}
                              <div animate:flip class="inline" >
                                  <li   
                                  class=" shadow rounded-lg bg-green-100 rounded-lg cursor-pointer hover:bg-yellow-200 border-2 p-3 w-64"                     
                                    draggable={true}
                                    on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                                  >
                                      <span class="flex flex-row items-center">  
                                          {item.name}
                                          <span class="flex flex-1 "></span>   
                                          <span on:click={()=>removerole(basketIndex,itemIndex)}><i class="fas fa-trash-alt fa-xs text-red-400 hover:text-red-500"></i></span>
                                      </span>
                                  </li>                        
                              </div>
                          {/each}
                        </ul> 
                          
                      </div>
                  {/each}
          
              </div>
          
          
          </div>

              </TabPanel>
        </Tabs>




          </div>
          
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