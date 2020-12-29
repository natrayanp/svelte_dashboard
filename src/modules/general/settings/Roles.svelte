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