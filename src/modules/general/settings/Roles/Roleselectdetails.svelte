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
        console.log(basket.allowedopsval);
        let newbasket = JSON.parse(JSON.stringify(basket));
        newbasket.allowedopsval[d]=event.target.checked;  
        $roleStore.ChangeDetails.ischanged = false;
        /* TODO : Add header checkbox
        if(basket.type === "function") sayHello(event,d,nosubmenu);
        */            
        let cond = "NOTINBOTH";
        let dd = [];       
        dd.push(newbasket);        
        let indet =[];
        let inorg =[];                
        console.log("start hcekc");
        console.log(JSON.stringify($roleStore));
        if($roleStore.ChangeDetails.detail.length !== 0){
            //Check if the baskets packid is in detail
            indet = $roleStore.ChangeDetails.detail.filter( (x) => x.packid === basket.packid);  
            //Delete from detail to accept new record
            $roleStore.ChangeDetails.detail= $roleStore.ChangeDetails.detail.filter( (x) => x.packid !== basket.packid);  
        } 
        
        //if(morgdetail.length !== 0){ 
        if($roleStore.ChangeDetails.orgdetail.length !== 0){ 
            //Check if the baskets packid is in orgdetail
            let m = $roleStore.ChangeDetails.orgdetail.filter( (x) => x.packid === basket.packid); 
            console.log("going inside");
            //let m = morgdetail.filter( (x) => x.packid === basket.packid); 
            inorg = m.slice();
            console.log("morg done");

        } 
        console.log(JSON.parse(JSON.stringify($roleStore.ChangeDetails)));
        console.log("details");
        console.log(JSON.parse(JSON.stringify(indet))); 
        console.log(JSON.parse(JSON.stringify(inorg)));        
        let so = [];
        let sn = newbasket.allowedopsval.slice();
        let defopval = Array($authStore.allowedops.length).fill(false);
        let op = "U";

        if(inorg.length && indet.length){ 
            cond = "INBOTH";                             
            //dd = inorg.slice();     

            so = (inorg[0].allowedopsval).slice();
            console.log(inorg[0].allowedopsval);
            console.log(so);
        } else if (inorg.length && !indet.length) {
            cond = "INORG_NOTINDETAIL";                             
            //dd = inorg.slice();    
            
            so = inorg[0].allowedopsval.slice();  
            console.log(inorg[0].allowedopsval);
            console.log(so);     
        } else if (!inorg.length && indet.length) {
            cond = "NOTINORG_INDETAIL";                             
            //dd = indet.slice();      
        }        

        let oldauditval = {allowedopsval: so.length?so.slice():[]};
        let newauditval = {allowedopsval:newbasket.allowedopsval.slice()};
        console.log(sn);
        console.log(so);

        if( cond !== "NOTINBOTH") {
            if(JSON.stringify(sn) === JSON.stringify(so)) {
                op = "SAME"
            } else {
                console.log(JSON.stringify(sn));
                console.log(JSON.stringify(defopval));
                console.log(JSON.stringify(sn) === JSON.stringify(defopval));
                if (JSON.stringify(sn) === JSON.stringify(defopval)) {                    
                        op = "D";
                        newauditval = {allowedopsval:[]};
                    
                } else {
                    if( cond === "NOTINORG_INDETAIL") op = "I";
                } 
            }
        }


        if( cond === "NOTINBOTH") op = "I"
        //if( cond === "NOTINORG_INDETAIL" && op === "U") op = "I"

        
        if(op !== "SAME"){
            //Possible OP values insider are I,U,D
        switch(cond) {
            case("NOTINBOTH"): {
                console.log("INSIDE NOT IN BOTH");
                if(op != "D"){
                    let dp = dd.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=>  ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,action:op,
                                                                                                    audit:{old:{packid,...oldauditval},new:{packid,...newauditval}}}));                
                    $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));
                }else {
                    console.log("No action required for delete option here")
                }
                break;
            }
            case("INBOTH"): {
                if (op == "I") op ="U";

                let dp = dd.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=>  ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,action:op,
                                                                                            audit:{old:{packid,...oldauditval},new:{packid,...newauditval}}}));
                $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));  
                break;           
            }
            case("INORG_NOTINDETAIL") : { 
                console.log(op)  ;
                if (op == "I") op ="U";                          
                console.log("INSIDE INORG_NOTINDETAIL U D");  
                let dp = dd.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=> ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,action:op,
                                                                                audit:{old:{packid,...oldauditval},new:{packid,...newauditval}}}));
                console.log(dp);
                $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));                               
                break;   
            }
            case("NOTINORG_INDETAIL") : {
                if (op === "U") op ="I";
                console.log("INSIDE NOTINORG_INDETAIL I");
                if(op != "D"){
                    let dp = dd.map(({roledetailid,rolemasterid,packid,planid,allowedopsval})=> ({roledetailid,rolemasterid,packid,planid,allowedopsval,companyid:$authStore.companyid,branchid:$authStore.branchid,action:op,
                                                                                                audit:{old:{packid,...oldauditval},new:{packid,...newauditval}}}));
                    console.log(dp);
                    $roleStore.ChangeDetails.detail.push(JSON.parse(JSON.stringify(dp[0])));
                }     else {
                    console.log("No action required for delete option here")
                }
                break;     
            }
        }
    }

    if ($roleStore.ChangeDetails.detail.length) $roleStore.ChangeDetails.ischanged = true;


    console.log(JSON.parse(JSON.stringify($roleStore)));
    console.log("-----inside read change end-----");
    if (basket.allowedopsval === null)  basket.allowedopsval=[];
    basket.allowedopsval[d]=event.target.checked; 


/*
        //Create consolidated Audit entry
        if (JSON.stringify($roleStore.ChangeDetails.audit) === JSON.stringify({})) {
            aud = {itemid: "ROLE", itemkeys:{rolemasterid:dd.rolemasterid},action:op,oldvalue:[],newvalue:[]};
        } else {
            if(["UPDATE","DELETE"].includes(op)){
                $roleStore.ChangeDetails.audit.action = "UPDATE";
            } else {
                $roleStore.ChangeDetails.audit.action = "ADD";
            }
        }
        $roleStore.ChangeDetails.audit.oldvalue.push({roledetailid:dd.roledetailid,...oldauditval});
        $roleStore.ChangeDetails.audit.newvalue.push({roledetailid:dd.roledetailid,...newauditval});

*/

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
                        {#if basket.allowedops[operindex]}
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
                        {/if}
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

            {#if basket.allowedops[operindex]}

            <td >
                <div class="flex items-center">
                    <div class="ml-2">
                     <div class="text-sm text-gray-500">
                            <input type="checkbox" class="h-3 w-3 text-red-600" on:change={(event)=>onReadChangeIt(event,operindex,true)} bind:checked={basket.allowedopsval[operindex]}  >
                      </div>
                    </div>
                  </div>
            </td>          
             {/if}
    
            {/each}
            <td></td>
        </tr>                                        
    </tbody>
    
    {/if}