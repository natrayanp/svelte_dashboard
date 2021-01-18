

<script>
    import { goto } from '@roxi/routify';
    import {authStore} from '../stores/stores';
    import { http } from '../stores/services';

    async function get_modules(){
        let dd = await http.post('getmenus',{});        
        let m = dd.data[0].menus;  
        console.log(m);      
        authStore.update(dd => ({...dd,menus:m}));  
        return m;
    }

    async function navi(pack) {
        console.log('insidenavi');
        await authStore.update(dd => ({...dd,activepack:pack}));          
        $goto(pack.link);
    }

</script>


<p>inside landing</p>
<div class="md:flex content-center justify-evenly flex-wrap -mx-2 p-3 space-y-5 md:space-y-0">


{#await get_modules()}
    <p>Loading menu......</p>
{:then packs}

    {#each packs as pack,i}
    <div class="md:flex md:w-1/2 lg:w-1/3 px-2 py-2">

    <div class="md:flex-1 rounded shadow-lg bg-white border-b border-r border-grey-dark">
        
      


            <div class="flex flex-row bg-gray-200 shadow-sm rounded p-4">
                <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div class="flex flex-col flex-grow ml-4">
                  <div class="text-sm text-gray-500">{pack.displayname}</div>
                  <div class="font-bold text-lg">
                    <button on:click={()=> navi(pack)}>{pack.displayname}</button>   
                    <!--a href='' on:click={()=> navi(pack)}>{pack.displayname}</a>   
                    <a href={$url(`${pack.link}`,{id:pack.id})}>{pack.displayname}</a--> 
                  </div>
                </div>
            </div>
        </div>  

        </div>
    
  
    <!--div class="flex items-center min-h-screen bg-gray-200 text-gray-800">
        <div class="p-4 w-full">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <div class="flex flex-row p-4 w-24 bg-red-200">
              <div class="flex flex-row bg-gray-200 shadow-sm rounded p-4">
                <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div class="flex flex-col flex-grow ml-4">
                  <div class="text-sm text-gray-500">{pack.displayname}</div>
                  <div class="font-bold text-lg">
                    <a href={$url(`${pack.link}`)}>{pack.displayname}</a> 
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div-->
        

    {/each}

    <!--
    <a href={$url('./POS')}>POS</a>
    <a href={$url('./SETTINGS')}>SETTINGS</a>
    -->
{/await}



  
  </div>

