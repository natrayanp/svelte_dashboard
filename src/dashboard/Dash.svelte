<script>
import {authStore} from '../stores/stores';
import Sidemenu from './sidenav/Sidemenu.svelte';

let sidenavopen = false;
let topnavopen = false;
let downclicks = true;
let togg = true;
//let selected;
$: selected = null

// link is false then it is header
export const menus = [
{
    'name': 'dashboard',
    'icon': 'fa-tachometer-alt',
    'link': false,
    'open': false,
    'chip': { 'value': 1, 'color': 'accent' },
    'sub': [
        {
            'name': 'dashboard',
            'link': './settings/companysettings',
            'icon': 'fa-cog',
            'chip': false,
            'open': false,
        }
    ]
},
{
    'name': 'Material Widget',
    'icon': 'widgets',
    'link': false,
    'open': false,
    'sub': [
        {
            'name': 'Buttons',
            'link': 'buttons',
            'icon': 'indeterminate_check_box',
            'chip': false,
            'open': false,
        },
        {
            'name': 'List',
            'link': false,
            'icon': 'list',
            'chip': false,
            'open': false,
            'sub': [
        {
            'name': '/dashboard',
            'link': '/dash/genset',
            'icon': 'fa-cog',
            'chip': false,
            'open': false,
        }
        ]
        },
        {

            'name': 'Stepper',
            'link': '/dash/test',
            'icon': 'view_week',
            'chip': false,
            'open': false,

        },
        {
            'name': 'Expansion',
            'link': '/dash/genset',
            'icon': 'web_aaset',
            'chip': false,
            'open': false,
        },

        {
            'name': 'Cards',
            'link': '/dash/cards',
            'icon': 'crop_16_9',
            'chip': false,
            'open': false,
        },
        {
            'name': 'Icons',
            'link': '/dash/icons',
            'icon': 'gif',
            'chip': false,
            'open': false,
        },
        {

            'name': 'AutoComplete',
            'link': '/dash/autocomplete',
            'icon': 'get_app',
            'chip': false,
            'open': false,
        },
        {
            'name': 'CheckBox',
            'link': '/dash/checkbox',
            'icon': 'check_box',
            'chip': false,
            'open': false,
        },
        {
            'name': 'DatePicker',
            'link': '/dash/datepicker',
            'icon': 'date_range',
            'chip': false,
            'open': false,
        },

        {
            'name': 'Slider',
            'link': '/dash/slider',
            'icon': 'keyboard_tab',
            'chip': false,
            'open': false,
        },
        {
            'name': 'Slide Toggle',
            'link': '/dash/slide-toggle',
            'icon': 'album',
            'chip': false,
            'open': false,
        },
        {
            'name': 'Menu',
            'icon': 'menu',
            'link': '/dash/menu',
            'chip': false,
            'open': false,
        },
        {
            'name': 'Input',
            'icon': 'input',
            'link': '/dash/input',
            'open': false,
        },
        {
            'name': 'Radio',
            'icon': 'radio_button_checked',
            'link': '/dash/radio',
            'chip': false,
            'open': false,
        },
        {
            'name': 'Select',
            'icon': 'select_all',
            'link': '/dash/select',
            'open': false,
        },
    ]
},

];

function toggle_sidenav() {
    sidenavopen = !sidenavopen;
    if (sidenavopen) topnavopen = false;
}

function toggle_topnavopen() {
    topnavopen = !topnavopen;
    if(topnavopen) sidenavopen = false;
}

function downclick(){
  downclicks = !downclicks;
  selected = -1;
  
}

function returnselected() {
  console.log('oprieie');
  return 4;
}

function changesel(n) {
  selected = n-1;  
}

$: selected = -1;

//https://codepen.io/narwy/pen/poowmdj



</script>



<!--prev>{JSON.stringify($authStore)}</prev-->

<!-- Top NAV START-->
<nav class="flex flex-wrap items-center z-50 bg-indigo-700 shadow-2xl">
    
    <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between md:hidden">      
    <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" on:click={toggle_sidenav }>
      <svg fill="white" viewBox="0 0 20 20" class="w-6 h-6">
        {#if sidenavopen}
            <path x-show="sidenavopen" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>    
        {:else}
            <path x-show="!sidenavopen" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>            
        {/if}
      </svg>
    </button>
  </div>
<!-- logo -->
<!--img src="http://acmelogos.com/images/logo-1.svg" alt="ACME" width="120" class="text-white text-3xl font-bold "/-->
<a href="#" class="text-white text-3xl font-bold p-5 ">WEB ZONE</a>

<span class="flex-grow"></span>
<!-- hamburger -->
<div class="flex md:hidden">

    <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" on:click={toggle_topnavopen}>
       
            <svg fill="white" viewBox="0 0 20 20" class="w-6 h-6">
              {#if topnavopen}
                  <path x-show="topnavopen" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>    
              {:else}
                  <path x-show="!topnavopen" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>            
              {/if}
            </svg>
          </button>
    <!--
  <button id="hamburger" on:click={()=> topnavopen = !topnavopen} class="border-none">
    {#if topnavopen}
    <img  src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40"/>
    {:else}-->
    <!--img  src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" /-->
  <!--   <svg fill="white" viewBox="0 0 20 20" class="w-6 h-6">
        <path fill="white" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"/>
        <path fill="white" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"/>
        <path fill="white" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"/>
      </svg>
    
    {/if}
  </button>
-->
</div>

<!-- links -->

<div class:hidden={!topnavopen}  class="hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
  <a href="#" class="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-blue-900 md:border-none">Home</a>
  <a href="#" class="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-blue-900 md:border-none">Products</a>
  <a href="#" class="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-blue-900 md:border-none">Pricing</a>
  <a href="#" class="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-blue-900 md:border-none">Contact</a>
</div>

<!-- cta -->
<a href="#" class:hidden={!topnavopen} class="md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-200 text-white md:rounded">Create Account</a>
</nav>
<!-- Top NAV END-->

<Sidemenu {menus} {sidenavopen}><slot/></Sidemenu>

<!-- SIDE NAV END-->
      <!--
<transition name="slide">
<div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
    <div class="flex flex-col w-full md:w-72 text-gray-700 bg-white justify-center dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data={sidenavopen}>
      <Sidemenu {menus} {sidenavopen}/>
    
    </div>

    <div class="px-16 py-4 text-gray-700 bg-white h-screen w-screen">
        <p>kdkdk</p>
        <!-- Content -->
              <!--
      </div>
</div>
</transition>
      <!--
      <nav class:block={sidenavopen} class:hidden={!sidenavopen} class="relative md:block md:pb-0 md:min-h-screen bg-white md:overflow-y-auto z-50 shadow-xl">            
            
        <div class = "flex flex-col items-center">
            <div class="mt-10 mb-0 md:mb-6 ">
                <a href="#">
                  <img src="https://randomuser.me/api/portraits/women/76.jpg" class="rounded-full w-10 h-10 mb-3 mx-auto" />
                </a>
            </div>


                <div class="relative w-10/12 pb-5 mt-5">
                
                    <span  class:hidden={selected===-1} class="absolute h-10 w-full bg-gray-100 rounded-lg shadow ease-out transition-transform transition-medium" style="transform: translateY(calc(100% *{selected}))"></span>


                <ul class="relative">


                    <li>
                        <button type="button"  on:click={()=> changesel(1)} aria-selected= {selected === 1} class="focus:bg-none border-none py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline">
                      
                      <!-- Preceding Icon -->
       <!--                  <svg                
                        class="{selected === 1 ? 'text-indigo-500' : 'text-gray-500'} h-6 w-6 transition-all ease-out transition-medium"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                        />
                      </svg>
                  
                      <!-- Text - menu item text -->
          <!--               <span                
                        class="{selected === 1 ? 'text-indigo-700' : 'text-gray-700'} ml-2 text-sm font-medium transition-all ease-out transition-medium"
                      >
                        Home
                      </span>
                  
                      <!-- Drop Down arrow -->
            <!--             <span class="flex flex-grow justify-end">
                        <svg                
                        class="{selected === 1 ? 'text-indigo-500' : 'text-gray-500'} h-4 w-4 transition-all ease-out transition-medium"
                        viewBox="0 0 24 24"
                        fill="black"
                      >                       
                        <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z"/>
                      </svg>
                      </span>
                    
                    
                    </button>

                      </li>
                    
                    
                      <li >
                      <button on:click={downclick}   type="button" aria-selected= {selected === 2} class="border-none py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline">
                        <svg                          
                          class="{selected === 2 ? 'text-indigo-500' : 'text-gray-500'} h-6 w-6 transition-all ease-out transition-medium"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                          />
                        </svg>
                        <span
                          
                          class="{selected === 2 ? 'text-indigo-700' : 'text-gray-700'} ml-2 text-sm font-medium transition-all ease-out transition-medium"
                        >
                          Homeasdfa
                        </span>
                        <span class="flex flex-grow justify-end ">
                          <svg         
                               
                          class="{selected === 2 ? 'text-indigo-500' : 'text-gray-500'} h-4 w-4 transition-all ease-out transition-medium "
                          viewBox="0 0 24 24"
                          fill="black"
                        >
                         
                          <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z"/>
                        </svg>
                        </span>
                        </button>
                      
                        </li>

                        
                        <li class:hidden={downclicks}>
                          <button type="button" on:click={()=> changesel(3)} aria-selected= {selected === 3} class="border-none py-2 px-10 w-full flex items-center focus:outline-none focus-visible:underline">
                            <svg                          
                              class="{selected === 3 ? 'text-indigo-500' : 'text-gray-500'} h-6 w-6 transition-all ease-out transition-medium"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                              />
                            </svg>
                            <span
                              
                              class="{selected === 3 ? 'text-indigo-700' : 'text-gray-700'}  text-sm font-medium transition-all ease-out transition-medium"
                            >
                              Homeasdfa
                            </span>
                          </button>
                            </li>
                          

                            <li >
                              <button type="button" on:click={()=> changesel(4)} aria-selected= {selected === 4} class="border-none py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline">
                                <svg                          
                                  class="{selected === 4 ? 'text-indigo-500' : 'text-gray-500'} h-6 w-6 transition-all ease-out transition-medium"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                                  />
                                </svg>
                                <span
                                  
                                  class="{selected === 4 ? 'text-indigo-700' : 'text-gray-700'}  text-sm font-medium transition-all ease-out transition-medium"
                                >
                                  Homeasdfa
                                </span>
                              </button>
                                </li>


                </ul>


            </div>




            </div>
            
        </nav>
      --> 






<!--


        <span class="absolute h-10 w-full bg-white  rounded-lg mt-24 shadow ease-out transition-transform transition-medium" style="transform: translateY(calc(100% *{selected}))"></span>

                <div class="mt-11 mb-11">
                <a href="#">
                  <img src="https://randomuser.me/api/portraits/women/76.jpg" class="rounded-full w-10 h-10 mb-3 mx-auto" />
                </a>
            </div>
        <ul class="relative ">
            <li>
                <button type="button" on:click={()=> selected = 0} aria-selected= {selected === 0} class="focus:bg-none border-none py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline">
              <svg                
                class="{selected === 0 ? 'text-indigo-500' : 'text-gray-500'} h-6 w-6 transition-all ease-out transition-medium"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                />
              </svg>
              <span                
                class="{selected === 0 ? 'text-indigo-700' : 'text-gray-700'} ml-2 text-sm font-medium transition-all ease-out transition-medium"
              >
                Home
              </span>
            </button>
              </li>
              <li>
              <button type="button" on:click={()=> selected = 1} aria-selected= {selected === 1} class="border-none py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline">
                <svg
                  :class="selected === 1 ? 'text-indigo-400' : 'text-gray-500'"
                  class="h-6 w-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                  />
                </svg>
                <span
                  :class="selected === 1 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                >
                  Homeasdfa
                </span>
              </button>
                </li>
        </ul>

-->