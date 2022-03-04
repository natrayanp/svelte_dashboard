<script>
    import { onMount,createEventDispatcher } from 'svelte';
    import { Tabs, TabList, TabPanel, Tab } from '../../../../common/tabs/tab';
    import Userprofile from './Userprofile.svelte';
    import {flip} from 'svelte/animate';
    import { writable } from 'svelte/store';
    
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
          

    

    
    </script>
    
    
    
    
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
    
        