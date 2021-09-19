<script>
    import { onMount } from 'svelte';
    //import { options } from '../../../../.routify/routes';
    import { authStore, roleStore, roleVal } from '../../../../stores/stores';
    
    
    
    export let basketIndex;
    export let basketsd;
    export let patharray;
    let showe = [];
    export let shoea = false;
    
    
        patharray = patharray.slice();    
        patharray.push(basketIndex);
        patharray = patharray.slice();    
    
    onMount(async() => {  
       
    
    });
    
    
    
        function onReadChange(d) {
            console.log("inside read change");
            console.log(patharray);
            console.log(d);
            console.log(roleVal.Selectedmodules);
            let ss = JSON.parse(JSON.stringify(roleVal.Selectedmodules));      
            console.log(ss);  
            patharray.forEach(x => {        
            if (ss[x].submenu !== undefined && ss[x].submenu !== null) {
                let dd = [];
                dd = ss[x].submenu;
                ss = [];
                ss = dd.slice();
            }
        });
        console.log(ss);
        console.log(ss[d.itemIndex]);
    
        
        }
    
        function onWriteChange(d) {
            
        }
    
    
        function toggleshow(itemIndex) {
            console.log("inside toogle");
            console.log(showe[itemIndex.itemIndex]);
            if (showe[itemIndex.itemIndex] === undefined) showe[itemIndex.itemIndex] = false;
            showe[itemIndex.itemIndex] = !(showe[itemIndex.itemIndex]);
            shoea = true;
          }
    
          function toggleshowa(itemIndex) {
            shoea = !shoea;
          }
    
       function onReadChangeIt(d) {
        console.log("inside read change");
            console.log(patharray);
            console.log(d);
            console.log(roleVal.Selectedmodules);
            let ss = JSON.parse(JSON.stringify(roleVal.Selectedmodules));      
            console.log(ss);  
            patharray.forEach(x => {        
            if (ss[x].submenu !== undefined && ss[x].submenu !== null) {
                let dd = [];
                dd = ss[x].submenu;
                ss = [];
                ss = dd.slice();
            }
        });
        console.log(ss);
        console.log(ss[d.itemIndex]);
    
       }
    
        function onWriteChangeIt(d) {
    
        }
    
    </script>
    
    
    {#each basketsd[basketIndex].submenu as item, itemIndex (item)}
    {#if (item != null) && item.submenu !== undefined && item.submenu !== null}
        <tbody class="bg-blue-100 divide-y divide-gray-200 overflow-y-scroll h-15">                                        
            <tr>                                            
                <td class="px-3 py-1 whitespace-nowrap">{item.name}</td>
                {#each $authStore.allowedops as oper, operindex(oper)}
                <td class="text-xs">{oper}</td>    
                <td class="pr-4 pl-0 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-red-600" on:change={()=>onReadChangeIt({itemIndex})}  bind:checked={basketsd[basketIndex].submenu[itemIndex].read}></td>
                
                {/each}
    
                {#if !showe[itemIndex]}
                    <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow({itemIndex})}><i class="fas fa-angle-down fa-lg"></i></th>
                {/if}
                {#if showe[itemIndex]}
                    <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow({itemIndex})}><i class="fas fa-angle-up fa-lg"></i></th>
                {/if}
    
      <!-- 
                <td class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow({itemIndex})}><i class="fas fa-angle-down fa-lg"></i></td>
                          <td class="px-6 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-blue-600"  on:change={()=>onWriteChangeIt({itemIndex})} bind:checked={basketsd[basketIndex].submenu[itemIndex].write}></td>
        -->
            </tr>                                        
        </tbody>         
        {#if item.submenu !== undefined && item.submenu !== null  && showe[itemIndex]}
            <svelte:self basketsd =  {basketsd[basketIndex].submenu} basketIndex={itemIndex} {patharray}  bind:shoea={showe[itemIndex]}/>
    
        {/if}
    
    {/if}
    {#if item != null && ( item.submenu === undefined || item.submenu === null) }
    
    {#if patharray.length === 1}
    <tbody class="bg-blue-100 divide-y divide-gray-200 overflow-y-scroll h-15">                                        
        <tr>                                            
            <td class="px-3 py-1 whitespace-nowrap">{item.name}</td>
            {#each $authStore.allowedops as oper, operindex(oper)}
            <td class="text-xs">{oper}</td>    
            <td class="pr-4 pl-0 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-red-600" on:change={()=>onReadChangeIt({itemIndex})}  bind:checked={basketsd[basketIndex].submenu[itemIndex].read}></td>
            
            {/each}
    
    
            {#if !shoea}
            <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshowa({itemIndex})}><i class="fas fa-angle-down fa-lg"></i></th>
        {/if}
        {#if shoea}
            <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshowa({itemIndex})}><i class="fas fa-angle-up fa-lg"></i></th>
        {/if}
    
    
            
            <!--             <td class="px-6 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-blue-600"  on:change={()=>onWriteChangeIt({itemIndex})} bind:checked={basketsd[basketIndex].submenu[itemIndex].write}></td>
    -->
        </tr>                                        
    </tbody>   
    {/if}
    
    {#if shoea}
    <tbody class="bg-white divide-y divide-gray-200 overflow-y-scroll h-15">                                        
        <tr>                                            
            <td class="px-3 py-1 whitespace-nowrap">{item.name}</td>
            {#each $authStore.allowedops as oper, operindex(oper)}
            <td></td>
    
                <td class="pr-4 pl-0whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-red-600" on:change={()=>onReadChangeIt({itemIndex})}  bind:checked={basketsd[basketIndex].submenu[itemIndex].read}></td>
             
    
            {/each}
            <td></td>
            <!--             <td class="px-6 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-blue-600"  on:change={()=>onWriteChangeIt({itemIndex})} bind:checked={basketsd[basketIndex].submenu[itemIndex].write}></td>
     -->
        </tr>                                        
    </tbody>
    {/if}
    {/if}
    {/each}