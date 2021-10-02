<script>
    import { onMount } from 'svelte';
    import { authStore } from '../../../../stores/stores';
	import { createEventDispatcher } from 'svelte';    
    import { connectAuthEmulator } from '@firebase/auth';
    
    

    export let basketsd;
    export let basket;    
    let expanded = true;

    if(basket.allowedopsval === null) {
        basket.allowedopsval=new Array(basket.allowedops.length).fill(false);            
    }

    onMount(async() => {  
        console.log(basketsd);
        console.log(basket);
        if (basket.type === "pack") expanded = true;    
    });
    
    function toggleshow() {
        expanded = !expanded
    }
    
    function handleMessage(event) {            
        let dd = event.detail.value;
        onReadChangeIt(dd.event,dd.index,dd.nosubmenu);
    }
    
    function getClass(df) {
        console.log("inside get class");
        console.log(df);
        console.log(df.disablefunc);
        if(df.disablefunc) {
            return "divide-y divide-gray-200 overflow-y-scroll h-15 bg-gray-300 avoidclicks"
        }
        return "divide-y divide-gray-200 overflow-y-scroll h-15 bg-white";
        
    }

    


    /*
    TODO : Add header checkbox
            const dispatch = createEventDispatcher();

            function sayHello(event,d,nosubmenu) {
                console.log("sayhello");
                console.log(event);
                dispatch('message', {
                    value: {event:event,index:d,nosubmenu:nosubmenu}
                });
            }
        
    */  

    function onReadChangeIt(event,d,nosubmenu=false) { 
        console.log("inside read change");
        console.log(basket);
        if (basket.allowedopsval === null)  basket.allowedopsval=[];
        basket.allowedopsval[d]=event.target.checked;        
            /* TODO : Add header checkbox
            if(basket.type === "function") sayHello(event,d,nosubmenu);
            */
    }


    
    </script>
   
   
<style>
    .avoidclicks {
  pointer-events: none;
}
</style>

   {#if basket.submenu !=null}

        {#if basket.type !== "pack"}
            <tbody class="bg-blue-100 divide-y divide-gray-200 overflow-y-scroll h-15">                                        
                <tr >                                            
                    <td class="px-3 py-1 whitespace-nowrap">{basket.name}</td>
                    
                    {#each $authStore.allowedops as oper, operindex(oper)}
                    <td>
                    <div class="flex items-center">
                            <div class="ml-2">
                                
                            <div class="text-xs font-medium text-gray-900">
                                {oper}
                            </div>
                            <!--
                                TODO : Add header checkbox
                            <div class="text-sm text-gray-500">
                                    <input type="checkbox" class="h-4 w-4 text-blue-600" on:change={(event)=>onReadChangeIt(event,operindex)} bind:checked={basket.allowedopsval[operindex]}>
                            </div>
                            -->
                        </div>
                    </div>

                    </td>
                    {/each}

                    {#if !expanded}
                        <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow()}><i class="fas fa-angle-down fa-lg"></i></th>
                    {/if}
                    {#if expanded}
                        <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow()}><i class="fas fa-angle-up fa-lg"></i></th>
                    {/if}
                </tr>                                        
            </tbody> 
        {/if}        
            {#if expanded}
                {#each basket.submenu as baskete}    
                    <svelte:self bind:basketsd = {basket.submenu} bind:basket={baskete} on:message={handleMessage}/>
                {/each}
            {/if}
    {:else}    
    
    <tbody class={getClass(basket)}  >
        <tr>                                            
            <td class="px-3 py-1 whitespace-nowrap">{basket.name}</td>
            {#each $authStore.allowedops as oper, operindex(oper)}


            <td >
                <div class="flex items-center">
                    <div class="ml-2">
                     <div class="text-sm text-gray-500">
                            <input type="checkbox" class="h-3 w-3 text-red-600" on:change={(event)=>onReadChangeIt(event,operindex,true)} bind:checked={basket.allowedopsval[operindex]}  >
                      </div>
                    </div>
                  </div>
            </td>          
             
    
            {/each}
            <td></td>
        </tr>                                        
    </tbody>
    
    {/if}