<script>
    import { onMount } from 'svelte';
    import { authStore, roleStore } from '../../../../stores/stores';
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
        console.log("-----inside read change start-----");
        console.log(basket);
        if (basket.allowedopsval === null)  basket.allowedopsval=[];
        basket.allowedopsval[d]=event.target.checked;        
        /* TODO : Add header checkbox
        if(basket.type === "function") sayHello(event,d,nosubmenu);
        */            
        let cond = "NOTINBOTH";
        let dd = [];
        dd.push(basket);
        let indet =[];
        let inorg =[];
        console.log("start hcekc");
        console.log(JSON.stringify($roleStore));
        if($roleStore.ChangeDetails.detail.length !== 0){
            indet = $roleStore.ChangeDetails.detail.filter( (x) => x.packid === basket.packid);  
        }
        
        if($roleStore.ChangeDetails.orgdetail.length !== 0){ 
            inorg = $roleStore.ChangeDetails.orgdetail.filter( (x) => x.packid === basket.packid);
        } 
        console.log("details");
        console.log(indet);
        console.log(inorg);        
        let so = [];
        let sn = basket.allowedopsval.slice();
        let defopval = Array($authStore.allowedops.length).fill(false);
        let op = "UPDATE";

        if(inorg.length && indet.length){ 
            cond = "INBOTH";                             
            dd = inorg.slice(); 
            so = inorg[0].allowedopsval.slice();     
        } else if (inorg.length && !indet.length) {
            cond = "INORG_NOTINDETAIL";                             
            dd = inorg.slice();      
            so = inorg[0].allowedopsval.slice();     
        } else if (!inorg.length && indet.length) {
            cond = "NOTINORG_INDETAIL";                             
            //dd = indet.slice();      
        }        

        let oldauditval = {allowedopsval: so.length?so.slice():[]};
        let newauditval = {allowedopsval:basket.allowedopsval.slice()};

        if( cond !== "NOTINBOTH") {
            if(JSON.stringify(sn) === JSON.stringify(so)) {
                op = "SAME"
            } else {
                console.log(JSON.stringify(sn));
                console.log(JSON.stringify(defopval));
                console.log(JSON.stringify(sn) === JSON.stringify(defopval));
                if (JSON.stringify(sn) === JSON.stringify(defopval)) {                    
                    op = "DELETE";
                    newauditval = {allowedopsval:[]};
                }
            }
        }


        if( cond === "NOTINBOTH") op = "ADD"
        if( cond === "NOTINORG_INDETAIL" && op === "UPDATE") op = "ADD"

        

        switch(cond) {
            case("NOTINBOTH"): {
                console.log("INSIDE NOT IN BOTH");
                let dp = dd.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=>  ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,
                                                                                                audit:{action:op,old:{...oldauditval},new:{...newauditval}}}));
                console.log(dp);
                $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));
                break;
            }
            case("INBOTH"): {
                console.log("INSIDE INBOTH");
                let ab = $roleStore.ChangeDetails.detail.filter( s => s.packid != dd[0].packid);
                $roleStore.ChangeDetails.detail = ab.slice();                
            }
            case("INORG_NOTINDETAIL") : {   
                console.log("INSIDE INORG_NOTINDETAIL");             
                if(["UPDATE","DELETE"].includes(op)){
                    console.log("INSIDE INORG_NOTINDETAIL UPDATE DELETE");  
                    let dp = dd.map(({roledetailid,rolemasterid,packid,planid})=> ({roledetailid,rolemasterid,packid,planid,allowedopsval:newauditval.slice(),companyid:$authStore.companyid,branchid:$authStore.branchid,
                                                                                    audit:{action:op,old:{...oldauditval},new:{...newauditval}}}));
                    console.log(dp);
                    $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));
                }                
                break;   
            }
            case("NOTINORG_INDETAIL") : {
                console.log("INSIDE NOTINORG_INDETAIL");
                let ab = $roleStore.ChangeDetails.detail.filter( s => s.packid != dd[0].packid);
                $roleStore.ChangeDetails.detail = ab.slice();                                
                if(op === "ADD"){
                    console.log("INSIDE NOTINORG_INDETAIL ADD");
                    let dp = dd.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=> ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,
                                                                                                    audit:{action:op,old:{...oldauditval},new:{...newauditval}}}));
                    console.log(dp);
                    $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));
                }
                break;     
            }
        }
        console.log($roleStore);
        console.log("-----inside read change end-----");
        /*
        console.log($roleStore.ChangeDetails);
        if (!$roleStore.ChangeDetails.detail.includes('test')) {
            $roleStore.ChangeDetails.detail.push('test');
        } 
        console.log($roleStore.ChangeDetails);

        let roledetails = [{roledetailid:'',rolemasterid:'',packfuncid:'',planid:'',companyid:'',branchid:'',allowedopsval:[],action:'',audit:{}}];
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