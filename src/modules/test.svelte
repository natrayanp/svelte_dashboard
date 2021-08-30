<script>
    import { onMount } from 'svelte';
    import { options } from '../../../../.routify/routes';
    import { authStore, roleStore, roleVal } from '../../../stores/stores';
    
    
    
    export let basketIndex;
    export let basketsd;
    export let patharray;
    let showe = [];
    
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
    <thead  class="bg-blue-100">                           
        <tr>
            <th class="sticky top-0 px-6 py-1 text-red-900 "> {item.name} </th>
    
                <!--bind:checked={basketsd[{basketIndex}].read} 
                bind:indeterminate={basketsd[{basketIndex}].readindeterminate} -->
            <th class="sticky top-0  py-3 text-red-900 "><input type="checkbox" on:change={()=>onReadChange({itemIndex})} class="h-4 w-4 text-red-600" 
                 /> Read</th>
    
    <!--             bind:checked={basketsd[{basketIndex}].write}
                 bind:indeterminate={basketsd[{basketIndex}].writeindeterminate}   -->
     
                 <th class="sticky top-0  py-3 text-blue-900 "><input type="checkbox" on:change={()=>onWriteChange({itemIndex})} class="h-4 w-4 text-blue-600" /> Write</th>
            {#if !showe[itemIndex]}
                <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow({itemIndex})}><i class="fas fa-angle-down fa-lg"></i></th>
            {/if}
            {#if showe[itemIndex]}
                <th class="sticky top-0  px-1 py-3 text-black " on:click={()=>toggleshow({itemIndex})}><i class="fas fa-angle-up fa-lg"></i></th>
            {/if}
        </tr>
    </thead>                   
        {#if item.submenu !== undefined && item.submenu !== null && showe[itemIndex]}
            <svelte:self basketsd =  {basketsd[basketIndex].submenu} basketIndex={itemIndex} {patharray}/>
        {/if}
    {/if}
    {#if item != null && ( item.submenu === undefined || item.submenu === null)}
    <tbody class="bg-white divide-y divide-gray-200 overflow-y-scroll h-15">                                        
        <tr>                                            
            <td class="px-3 py-1 whitespace-nowrap">{item.name}</td>
            {#each $authStore.allowedops as oper, operindex(oper)}
                <td class="px-5 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-red-600" on:change={()=>onReadChangeIt({itemIndex})}  bind:checked={basketsd[basketIndex].submenu[itemIndex].read}></td>
                <td></td>
            {/each}
            <!--             <td class="px-6 py-1 whitespace-nowrap"><input type="checkbox" class="h-4 w-4 text-blue-600"  on:change={()=>onWriteChangeIt({itemIndex})} bind:checked={basketsd[basketIndex].submenu[itemIndex].write}></td>
     -->
        </tr>                                        
    </tbody>
    {/if}
    {/each}