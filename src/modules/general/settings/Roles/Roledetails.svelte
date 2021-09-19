<script>
import { onMount } from 'svelte';
//import { options } from '../../../../../routify/routes';
import { authStore, roleStore, roleVal } from '../../../../stores/stores';
import Roleselectdetails from './Roleselectdetails.svelte';
import {flip} from 'svelte/animate';

export let roledata_init;	
$roleStore.SelectActivemod.Modules=[];
let showe = [];
let patharray = [];
let hoveringOverBasket;


onMount(async() => {  
    console.log(roledata_init);
    $roleStore.SelectActivemod = (roledata_init.slice())[0];    
    $roleStore.AvailActivemod = $roleStore.Availablemodules;
    $roleStore.SelectActivemod.Modules.forEach ( (mod) => {             
        console.log(mod);
         let avs = $roleStore.AvailActivemod.filter(av => !(av.packid === mod.packid));
         $roleStore.AvailActivemod = avs.slice();
    })
});

    function removemodule(data) {              
        $roleStore.SelectActivemod.Modules = $roleStore.SelectActivemod.Modules.filter(x => !(x.packid === data.packid));
        let intarget = $roleStore.Availablemodules.filter(x => x.packid === data.packid);
        $roleStore.AvailActivemod.push(intarget[0])
    }

         

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
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const data = JSON.parse(json);       

        if(data.basketname !== basket.basketname) {
            if(data.basketname === "Availablemodules" && basket.basketname === "Selectedmodules"){                
                $roleStore.AvailActivemod = $roleStore.AvailActivemod.filter(x => !(x.packid === data.packid));
                data.basketname="Selectedmodules";
                $roleStore.SelectActivemod.Modules.push({...data,basketname:"Selectedmodules"});
            }
        }
    hoveringOverBasket = null;   
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
          
            {#if $roleStore.AvailActivemod.length === 0}
            <div class ="h-52 flex-grow"> All Available modules assigned </div>
        {/if}
        {#each $roleStore.AvailActivemod as basket, basketIndex (basket)} 
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

    {#if $roleStore?.SelectActivemod?.Modules?.length === 0}
        <div class ="h-96 flex-grow">Nothing selected yet</div>
    {/if}

    {#each $roleStore.SelectActivemod?.Modules as basket, basketIndex (basket)} 
        <div class="shadow rounded-lg p-3  bg-green-100 w-full md:w-9/19">
            <div class="flex flex-row justify-center">
                <b class="m-3 ">{basket.name}</b>
                <span class="flex flex-1 "></span> 
                <span on:click={()=>removemodule(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
              </div>
              <div class="container">
                            <table class="min-w-full divide-y divide-gray-200 ">
                   
                              
                              <Roleselectdetails  basketsd = {$roleStore.SelectActivemod.Modules} {basketIndex} {patharray}/>

                                              <!--         
                              {#each $roleStore.SelectActivemod.Modules[basketIndex].submenu as item, itemIndex (item)}           
                                
                              {#if item.submenu !== null}
                                <thead  class="bg-blue-100">                           
                                    <tr>
                                        <th class="sticky top-0 px-6 py-3 text-red-900 "> {item.name} </th>
                                        <th class="sticky top-0  py-3 text-red-900 "><input type="checkbox" on:change={()=>onReadChange(basketIndex)} class="h-4 w-4 text-red-600" 
                                            bind:checked={$roleStore.SelectActivemod.Modules[basketIndex].readAll} 
                                            bind:indeterminate={$roleStore.SelectActivemod.Modules[basketIndex].readindeterminate} /> Read</th>
                                        <th class="sticky top-0  py-3 text-blue-900 "><input type="checkbox" on:change={()=>onWriteChange(basketIndex)} class="h-4 w-4 text-blue-600" 
                                            bind:checked={$roleStore.SelectActivemod.Modules[basketIndex].writeAll}
                                            bind:indeterminate={$roleStore.SelectActivemod.Modules[basketIndex].writeindeterminate}/> Write</th>
                                        <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow(basketIndex)}><i class="fas fa-angle-down fa-lg"></i></th>
                                    </tr>
                                </thead>                                    
                                {/if}
                                {#if item.submenu === null}
                                <tbody class="bg-white divide-y divide-gray-200 overflow-y-scroll h-28">                                        
                                    <tr>                                            
                                        <td class="px-3 py-1 whitespace-nowrap">{item.name}</td>
                                        <td class="px-10 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-red-600" on:change={()=>onReadChangeIt(basketIndex,itemIndex)}  bind:checked={$roleStore.SelectActivemod.Modules[basketIndex].submenu[itemIndex].read}></td>
                                        <td class="px-6 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-blue-600"  on:change={()=>onWriteChangeIt(basketIndex,itemIndex)} bind:checked={$roleStore.SelectActivemod.Modules[basketIndex].submenu[itemIndex].write}></td>
                                        <td></td>
                                    </tr>                                        
                                </tbody>
                            {/if}
                         
                              {#if item != null ||  item !== undefined }
                                  --> 
                           
                              <!--
                            {/if}
                            {/each}
                            -->
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

            {#each basket.submenu as item, itemIndex (item)}
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

            {#each basket?.submenu as item, itemIndex (item)}
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




















