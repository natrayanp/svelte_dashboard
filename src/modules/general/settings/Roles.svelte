<script>
import {flip} from 'svelte/animate';
import { writable } from 'svelte/store';

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
      let showAll= false;

      function toggleshow(basketIndex) {
          $baskets.Selectedmodules[basketIndex].showAll = !$baskets.Selectedmodules[basketIndex].showAll;
      }

      function onReadChange(basketIndex) {
        $baskets.Selectedmodules[basketIndex].readAll = !$baskets.Selectedmodules[basketIndex].readAll;
        if ($baskets.Selectedmodules[basketIndex].readAll) {
            $baskets.Selectedmodules[basketIndex].submodules.forEach(value => {
                value.read = true;
        });
        $baskets.Selectedmodules[basketIndex].readindeterminate =false;
        } else {
            $baskets.Selectedmodules[basketIndex].submodules.forEach(value => {
            value.read = false;
            value.write = false;            
        });
        $baskets.Selectedmodules[basketIndex].writeAll =false;        
        }
        
      }


      function onWriteChange(basketIndex) {
        console.log(basketIndex);
        console.log($baskets.Selectedmodules[basketIndex].writeAll);
        $baskets.Selectedmodules[basketIndex].writeAll = !$baskets.Selectedmodules[basketIndex].writeAll;
        
            if ($baskets.Selectedmodules[basketIndex].writeAll) {
                $baskets.Selectedmodules[basketIndex].submodules.forEach(value => {
                value.write = true;
                value.read = true; 
            }) ;       
            $baskets.Selectedmodules[basketIndex].writeindeterminate =false;       
            } else {
                $baskets.Selectedmodules[basketIndex].submodules.forEach(value => {
                value.write = false;
                value.read = true;                
            });            
            }
            $baskets.Selectedmodules[basketIndex].readAll =true;
            $baskets.Selectedmodules[basketIndex].readindeterminate =false;
            
  }

  
  function onReadChangeIt(basketIndex,itemIndex) {
    $baskets.Selectedmodules[basketIndex].submodules[itemIndex].read = !$baskets.Selectedmodules[basketIndex].submodules[itemIndex].read;
    let noread = $baskets.Selectedmodules[basketIndex].submodules.filter(x => x.read);
    if(noread.length === 0) {

        $baskets.Selectedmodules[basketIndex].readAll =false;
        $baskets.Selectedmodules[basketIndex].readindeterminate =false;
    }
    else if(noread.length === $baskets.Selectedmodules[basketIndex].submodules.length) {
        $baskets.Selectedmodules[basketIndex].readindeterminate =true;
        onReadChange(basketIndex);
    }
    else if(noread.length !== $baskets.Selectedmodules[basketIndex].submodules.length) {
        $baskets.Selectedmodules[basketIndex].readAll =false;
        $baskets.Selectedmodules[basketIndex].readindeterminate =true;
    }
  }
    
  function onWriteChangeIt(basketIndex,itemIndex){
    $baskets.Selectedmodules[basketIndex].submodules[itemIndex].write = !$baskets.Selectedmodules[basketIndex].submodules[itemIndex].write;
    let nowrite = $baskets.Selectedmodules[basketIndex].submodules.filter(x => x.write);
    if(nowrite.length === 0) {
        $baskets.Selectedmodules[basketIndex].writeAll =false;
        $baskets.Selectedmodules[basketIndex].writeindeterminate =false;
    }
    else if(nowrite.length === $baskets.Selectedmodules[basketIndex].submodules.length) {
        //$baskets.Selectedmodules[basketIndex].writeAll =true;
        onWriteChange(basketIndex);
    }else if(nowrite.length !== $baskets.Selectedmodules[basketIndex].submodules.length) {
        $baskets.Selectedmodules[basketIndex].writeAll =false;
        $baskets.Selectedmodules[basketIndex].writeindeterminate =true;
    }
  }






      let hoveringOverBasket;

            let basketsv =        {                              
                              "Availablemodules": [
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "POS",
                                                showAll:false,
                                                readAll:false,
                                                writeAll:false,
                                                indeterminate:false,
                                                submodules:[
                                                    { 'name' : "posbilling",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': false,
                                                      'write': true,
                                                    } ,
                                                    { 'name' : "posbilling",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': false,
                                                      'write': true,
                                                    }                                                
                                                                                               
                                                ],
                                            },
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "Inventory",
                                                showAll:false,
                                                readAll:false,
                                                writeAll:false,
                                                readindeterminate:false,
                                                writeindeterminate:false,
                                                submodules:[
                                                    { 'name' : "setting",
                                                        'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "settingsreport",
                                                    'read': false,
                                                      'write': false,
                                                    }
                                                ],
                                            },
                                        ] ,                              
                              "Selectedmodules": [   

                              ],
                              "Unselectedmodules": []
                            };
      
        let baskets = writable(basketsv);

	function dragStart(event, basket) {
		// The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
        console.log("starting drag");
        const data = basket;
        console.log(data);
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	function drop(event, basket) {
        console.log('drop');        
        console.log(JSON.stringify(basket));
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const data = JSON.parse(json);        
        console.log(data);
        console.log(JSON.stringify($baskets));
        
        if(data.basketname !== basket.basketname && data.groupid === basket.groupid) {
            if(data.basketname === "Availablemodules" && basket.basketname === "Selectedmodules"){                
                let intarget = $baskets.Selectedmodules.filter(x => x.name === data.name);
                console.log(intarget);
                if(intarget.length === 0) {
                    $baskets.Availablemodules = $baskets.Availablemodules.filter(x => !(x.name === data.name));
                    $baskets.Selectedmodules.push({...data,basketname:"Selectedmodules"});
                }
            }
        }

        console.log(JSON.stringify($baskets));



		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
       // const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);
        
		
    // Add the item to the drop target basket.
	//	baskets[basketIndex].items.push(item);
	//	baskets = baskets;
		
    hoveringOverBasket = null;   
    }


    function removemodule(data) {              
        console.log('nn')    ;
        console.log(data)               ;
        let intarget = $baskets.Availablemodules.filter(x => x.name === data.name);
        console.log(intarget);
        if(intarget.length === 0) {
            $baskets.Selectedmodules = $baskets.Selectedmodules.filter(x => !(x.name === data.name));
            $baskets.Availablemodules.push({...data,basketname:"Availablemodules"});
        }
    }

function dragEnterLeave(tarstr){
    console.log(JSON.stringify(tarstr));
    console.log(JSON.stringify(hoveringOverBasket));
    if(tarstr.status === 'leave'){
        if(hoveringOverBasket && hoveringOverBasket.basketname === tarstr.basketname) {
            hoveringOverBasket = null;            
        }
    } else {
        hoveringOverBasket = tarstr;    
    }
    
}   
      
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
            <h2 class="text-2xl text-black text-gray-700 font-bold">New Role</h2>  
            <span class="flex-grow"></span>  
           <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Save</button>
           <span class="flex w-5"></span>
          <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md">Cancel</button>      
        </div>
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
                                    <label for="firstname">Copy from Role</label>
                                            <select required 
                                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                            >dasdfasdf</select>
                                            <div class="pristine-error-group"></div>
                                        </div>
            </div>

        </form> 

<div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">

    <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">

        <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">            
            <b class="m-3 p-5">Available modules</b>
            <div class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full">
                {#if $baskets.Availablemodules.length === 0}
                <div class ="h-52 flex-grow"> All Available modules assigned </div>
            {/if}
            {#each $baskets.Availablemodules as basket, basketIndex (basket)} 
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
        </div>
        </div>
    </div>
    <div>kdkdkkd</div>
    <!-- on:dragenter={() => hoveringOverBasket = basket.name} -->
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
            <div class="shadow rounded-lg p-3  bg-green-100 w-full md:w-5/12">
                <div class="flex flex-row justify-center">
                    <b class="m-3 ">{basket.name}</b>
                    <span class="flex flex-1 "></span> 
                    <span on:click={()=>removemodule(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
                  </div>
                  <div class="container">
                                <table class="min-w-full divide-y divide-gray-200 ">                           
                    
                                    <thead  class="bg-blue-100">                           
                                        <tr>
                                            <th class="sticky top-0 px-6 py-3 text-red-900 ">All Header </th>
                                            <th class="sticky top-0  py-3 text-red-900 "><input type="checkbox" on:change={()=>onReadChange(basketIndex)} class="h-4 w-4 text-red-600" 
                                                bind:checked={$baskets.Selectedmodules[basketIndex].readAll} 
                                                bind:indeterminate={$baskets.Selectedmodules[basketIndex].readindeterminate} /> Read</th>
                                            <th class="sticky top-0  py-3 text-blue-900 "><input type="checkbox" on:change={()=>onWriteChange(basketIndex)} class="h-4 w-4 text-blue-600" 
                                                bind:checked={$baskets.Selectedmodules[basketIndex].writeAll}
                                                bind:indeterminate={$baskets.Selectedmodules[basketIndex].writeindeterminate}/> Write</th>
                                            <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow(basketIndex)}><i class="fas fa-angle-down fa-lg"></i></th>
                                        </tr>
                                    </thead>
                                    
                                    {#if $baskets.Selectedmodules[basketIndex].showAll}
                                    <tbody class="bg-white divide-y divide-gray-200 overflow-y-scroll h-28">
                                        {#each $baskets.Selectedmodules[basketIndex].submodules as item, itemIndex (item)}
                                        <tr>                                            
                                            <td class="px-3 py-1 whitespace-nowrap">{$baskets.Selectedmodules[basketIndex].submodules[itemIndex].name}</td>
                                            <td class="px-10 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-red-600" on:change={()=>onReadChangeIt(basketIndex,itemIndex)}  bind:checked={$baskets.Selectedmodules[basketIndex].submodules[itemIndex].read}></td>
                                            <td class="px-6 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-blue-600"  on:change={()=>onWriteChangeIt(basketIndex,itemIndex)} bind:checked={$baskets.Selectedmodules[basketIndex].submodules[itemIndex].write}></td>
                                            <td></td>
                                        </tr>
                                        {/each}
                                    </tbody>
                                {/if}
                                </table>
                  </div>


                        <!--    <span class="flex flex-row items-center">  
                                {item.name}
                                <div>sdffasdfasdfasdjfsdaf</div>
                                <span class="flex flex-1 "></span>             
                                <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                            </span> 
                        </li>                        
                    </div>

              </ul> 
                -->
            </div>
        {/each}

    </div>



</div>
    </div>

<!--
<div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">

    <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">

        {#each baskets.Availablemodules as basket, basketIndex (basket)} 
            <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">
                <b class="m-3 p-5">{basket.name}</b>
                
                <ul
                class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full"
                on:dragenter={() => hoveringOverBasket = basket.name}
                on:dragleave={() => hoveringOverBasket = null}
                    on:drop={event => drop(event, basketIndex)}
                    ondragover="return false"
              >

                {#each basket.submodules as item, itemIndex (item)}
                    <div animate:flip class="inline" >
                        <li   
                        class=" shadow rounded-lg bg-green-100 rounded-lg cursor-pointer hover:bg-yellow-200 border-2 p-3 w-64"                     
                          draggable={true}
                          on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                        >
                            <span class="flex flex-row items-center">  
                                {item.name}
                                <span class="flex flex-1 "></span>             
                                <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                            </span>
                        </li>                        
                    </div>
                {/each}
              </ul> 
                
            </div>
        {/each}

    </div>

    <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">

        {#each baskets.Selectedmodules as basket, basketIndex (basket)} 
            <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">
                <b class="m-3 p-5">{basket.name}</b>
                
                <ul
                class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full"
                on:dragenter={() => hoveringOverBasket = basket.name}
                on:dragleave={() => hoveringOverBasket = null}
                    on:drop={event => drop(event, basketIndex)}
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
                                <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                            </span>
                        </li>                        
                    </div>
                {/each}
              </ul> 
                
            </div>
        {/each}

    </div>


</div>
-->