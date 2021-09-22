<script>
import { onMount,createEventDispatcher } from 'svelte';
//import { options } from '../../../../../routify/routes';
import { authStore, roleStore, roleVal } from '../../../../stores/stores';
import Roleselectdetails from './Roleselectdetails.svelte';
import {flip} from 'svelte/animate';
import { goto } from '@roxi/routify';
import { getNotificationsContext } from '../../../../common/notifications';
const { addNotification,subscribe } = getNotificationsContext();

//export let roledata_init;	
$roleStore.LiveSelectmod.Modules=[];
let showe = [];
let patharray = [];
let hoveringOverBasket;
let firstvisit = false;

let mymodl = null;
let avs= [];

onMount(async() => {  
    Initialise();
});

function Initialise(){
    console.log("Initialising");
    /*
    console.log(JSON.stringify(roledata_init));
    console.log(roledata_init.length);
    if(JSON.stringify(roledata_init)=== JSON.stringify([{}])) mymodl = 'new';
    if (mymodl !== 'new') $roleStore.LiveSelectmod = JSON.parse(JSON.stringify((roledata_init.slice())[0]));
    */
    $roleStore.LiveSelectmod = JSON.parse(JSON.stringify(($roleStore.Liverole)));
    let td= $roleStore.Availablemodules.slice();   
    $roleStore.LiveAvailmod = td.slice();

    if(JSON.stringify($roleStore.LiveSelectmod) !== JSON.stringify({})){
        $roleStore.LiveSelectmod.Modules.forEach ( (mod) => {             
            console.log(mod);
             avs = $roleStore.LiveAvailmod.filter(av => !(av.packid === mod.packid));
             $roleStore.LiveAvailmod = avs.slice();

        })
    }
}


    function removemodule_d(data) {               
        $roleStore.LiveSelectmod.Modules = $roleStore.LiveSelectmod.Modules.filter(x => !(x.packid === data.packid));

        //Check if the removedmodule is in Liverole (To retain values got from DB)
        let mynewv = $roleStore.Liverole.Modules.filter(y => y.packid === data.packid);
        let datas;
        if (mynewv.length > 0 ){
            //If yes, take the value from Liverole
            datas= JSON.parse(JSON.stringify(mynewv[0]))
        } else {
            //If no, this means we don't have data in db for this pack so show the fresh value
            let intarget = $roleStore.Availablemodules.filter(x => x.packid === data.packid);
            datas= JSON.parse(JSON.stringify(intarget[0]))
        }
        $roleStore.LiveAvailmod.push({...datas,basketname:"Availablemodules"});
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
        console.log("Drop");
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const data = JSON.parse(json);   
        console.log(JSON.stringify(data));
        
        
        if(data.basketname !== basket.basketname) {
            if(data.basketname === "Availablemodules" && basket.basketname === "Selectedmodules"){                
                let mynewv = $roleStore.LiveAvailmod.filter(x => x.packid === data.packid);
                $roleStore.LiveAvailmod = $roleStore.LiveAvailmod.filter(x => !(x.packid === data.packid));
                $roleStore.LiveSelectmod.Modules.push({...JSON.parse(JSON.stringify(mynewv[0])),basketname:"Selectedmodules"});
            }
        }
    hoveringOverBasket = null;   
    }


    const dispatch = createEventDispatcher();

    const sendcardaction = async (btnpressed) => {
        
        if(firstvisit) {
          $goto('/login');
          resetst();
          return;
        }else if(['Save','Update'].includes(btnpressed)) {            
          console.log(respdata);
        }        
        dispatch('editresult',{
        action: btnpressed
        });
        resetst();
	}


function resetst(){
    $roleStore.LiveAvailmod = [];
    $roleStore.Liverole = {};
    $roleStore.LiveSelectmod = {};
}


const RoleDel = () => {
		return addNotification({
				title : 'Data Loss Alert',
				text: 'Your changes will be lost.  Do you want to proceed?' ,
				notificationtype: 'modal',            
				modaltype:'modal-accept-reject',  	
        //comp : Circularprogress,				
			});
	}

    function removemodule(data) {               
        mymodl =  RoleDel();
        mymodl.returneddata.then(d => {
        if(d.accept) removemodule_d(data);
        });               
    }


</script>

<div class="shadow rounded-lg flex flex-col  bg-white">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
        <h2 class="text-2xl text-black text-gray-700 font-bold">New Role</h2>  
        <span class="flex-grow"></span>  
       <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Save</button>
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md" on:click={()=>sendcardaction('cancel')}>Cancel</button>      
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
          
            {#if $roleStore.LiveAvailmod.length === 0}
            <div class ="h-52 flex-grow"> All Available modules assigned </div>
        {/if}
        {#each $roleStore.LiveAvailmod as basket, basketIndex (basket)} 
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

    {#if $roleStore?.LiveSelectmod?.Modules?.length === 0}
        <div class ="h-96 flex-grow">Nothing selected yet</div>
    {/if}

    {#each $roleStore.LiveSelectmod.Modules as basket, basketIndex (basket)} 
        <div class="shadow rounded-lg p-3  bg-green-100 w-full md:w-9/19">
            <div class="flex flex-row justify-center">
                <b class="m-3 ">{basket.name}</b>
                <span class="flex flex-1 "></span> 
                <span on:click={()=>removemodule(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
              </div>
              <div class="container">
                            <table class="min-w-full divide-y divide-gray-200 ">  
                                
                                    <Roleselectdetails  bind:basketsd = {$roleStore.LiveSelectmod.Modules} basket={basket} {basketIndex} {patharray}/>                                
                                
                            </table>
              </div>

        </div>
    {/each}

</div>



</div>
</div>

