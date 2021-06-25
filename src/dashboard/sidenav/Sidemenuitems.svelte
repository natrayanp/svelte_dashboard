<script>
    import {sidemenuStore} from './sidemenustore';
    import { goto } from '@roxi/routify'

    //import { navigate } from "svelte-routing";

    export let menu;
    export let index;
    export let secondaryMenu = false;
    export let level = 1;
    let selected;
    
           
    let openli = false;
    function changesel(n) {
        selected = n;
        console.log(menu);
        sidemenuStore.selectionUpdate(n);
        //navigate(menu.link, { replace: false });
        $goto(menu.link);
    }

    function openLink(index){
        console.log('idiie');
        console.log(index);
        console.log(secondaryMenu);
        console.log(menu);
        //(!secondaryMenu) ? menu.open = !menu.open : menu.open = menu.open;
        menu.open = !menu.open;
       //sidemenuStore.openmenuupdate(index);
       
    }
</script>

<style>
    .natsvg:hover {
        fill: red;
    }
</style>

    <ul class="relative">

        <!-- This is the menu header -->
        {#if menu.link === null}
            <li>
                <button type="button"  on:click={()=> openLink(index)} class="focus:bg-none border-none py-2 w-full flex items-center focus:outline-none focus-visible:underline" style = "padding-left: {(level==1? `0.75rem` : (1.6*level +`rem`))}">

                    <i class="{menu.icon}"></i>
            
                    <!-- Text - menu item text -->
                    <span class="ml-2 text-sm font-medium transition-all ease-out transition-medium">
                        {menu.name}
                    </span>
        
                    <!-- Drop Down arrow -->
                    <span class="flex flex-grow justify-end">
                            <svg                
                                class="h-4 w-4 transition-all ease-out transition-medium natsvg"                                
                                viewBox="0 0 24 24"
                                fill="black">
                                <!--https://git.blivesta.com/flexicon/#modal-chevron-top-->
                                    {#if menu.open}
                                        <path d="M15.997 13.374l-7.081 7.081L7 18.54l8.997-8.998 9.003 9-1.916 1.916z"/>    

                                    {:else}
                                        <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z"/>    
                                    {/if}
                            </svg>
                    </span>

                </button>
            </li>
        {/if}

        {#if menu.link !== null}
            <li>
                <!-- Selection item Highlighter -->
                <span  class:hidden={$sidemenuStore.selected !== index} class="absolute h-10 w-full bg-gray-100  py-2 px-10  rounded-lg shadow ease-out transition-transform transition-medium" style = "padding-left: {level*1.6}rem">
                
                    
                    <i class="{menu.icon} text-indigo-700"></i>
        
                    <!-- Text - menu item text -->
                    <span class="text-indigo-700 ml-2 text-sm font-medium transition-all ease-out transition-medium">
                        {menu.name}
                    </span> 

                </span>

                <!-- button is shown if it is not selected -->
                <button type="button"  on:click={()=> changesel(index)} aria-selected= {$sidemenuStore.selected === index} 
                    class="focus:bg-none border-none py-2 px-10 w-full flex items-center focus:outline-none focus-visible:underline" style = "padding-left: {level*1.6}rem">
                    <i class="{menu.icon}"></i>
            
        
                    <!-- Text - menu item text -->
                    <span class="{$sidemenuStore.selected === index ? 'text-indigo-700' : 'text-gray-700'} ml-2 text-sm font-medium transition-all ease-out transition-medium">
                        {menu.name}
                    </span>                    
            
                </button>

            </li>
        {/if}
        
        {#if menu.submenu && menu.open}
            {#each menu.submenu as menu,index1}
        
                <svelte:self {menu} index={index + '_' + index1} secondaryMenu={true} level={level+1}/>
            {/each}
        {/if}
    </ul>
