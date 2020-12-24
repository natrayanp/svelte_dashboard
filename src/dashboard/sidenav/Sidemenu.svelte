<script>

import { Router, Route, Link } from "svelte-routing";

    import Sidemenuitems from './Sidemenuitems.svelte';
    import {initSideMenuStore} from './sidemenustore';
    import Test from '../../test/Test.svelte';
    import Gensettings from '../../modules/general/settings/Gensettings.svelte';

    export let menus;
    let selected= -1;    
    export let sidenavopen;
    

    let sidemenuStore = initSideMenuStore(menus);
    console.log(sidemenuStore);

    


</script>

<!-- SIDE NAV END-->
<transition name="slide">
    <div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <div class="flex flex-col w-full md:w-72 text-gray-700 bg-white justify-center dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data={sidenavopen}>
          
        


<nav class:block={sidenavopen} class:hidden={!sidenavopen} class="relative md:block md:pb-0 md:min-h-screen bg-white md:overflow-y-auto z-50 shadow-xl">                        
    
    <div class = "flex flex-col items-center">
        <!-- User photo -->
        <div class="mt-10 mb-0 md:mb-6 ">
            <a href="#">
              <img src="https://randomuser.me/api/portraits/women/76.jpg" class="rounded-full w-10 h-10 mb-3 mx-auto" />
            </a>        
        </div>

        <!-- Menu -->

            <div class="relative w-10/12 pb-5 mt-5">
                
                <!-- Selected item Highlighter -->
                <!--span  class:hidden={$sidemenuStore.postohiglight ===-1} class="absolute h-10 w-full bg-gray-100 rounded-lg shadow ease-out transition-transform transition-medium" style="transform: translateY(calc(100% *{$sidemenuStore.postohiglight}))"></span-->
          

                {#each menus as menu,index}
                        <Sidemenuitems bind:selected {menu} {index} level={1}/>
                {/each}


            </div>
    </div>
</nav>
</div>
    
<div class="px-16 py-4 text-gray-700 bg-white h-screen w-screen">
    <p>kdkdk</p>
    <!-- Content -->
    <Router>
        <Route path="test"> <Test/> </Route>
        <Route path="genset"><Gensettings/></Route>
     </Router>
    
  </div>
</div>
</transition>