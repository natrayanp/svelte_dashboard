<script>
import { onMount,createEventDispatcher } from 'svelte';
//import { options } from '../../../../../routify/routes';
import { authStore, roleStore, roleVal } from '../../../../stores/stores';
import Roleselectdetails from './Roleselectdetails.svelte';
import {flip} from 'svelte/animate';
import { goto } from '@roxi/routify';
import { getNotificationsContext } from '../../../../common/notifications';
const { addNotification,subscribe } = getNotificationsContext();
import {diffJson} from 'diff';
import Switch from '../../../../common/components/Switch.svelte';
import { createForm } from "svelte-forms-lib";
import * as yup from 'yup';

//export let roledata_init;	
export let mymod;
$roleStore.LiveSelectmod.Modules=[];

let patharray = [];
let hoveringOverBasket;
let firstvisit = false;

let mymodl = null;
let avs= [];
let modtext = '';
let mystyle ='';
let btntxt = '';
let uno = false;

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
    
    if(mymod === 'display') {
        modtext = 'View';        
        mystyle ='pointer-events:none';
    } else if (mymod === 'new') {
        modtext = 'New';
        btntxt = "Save";
    } else if (mymod === 'edit') {
        modtext = 'Update';
        btntxt = "Update";
    }
    
}



const {
      // observables state
      form,
      errors,
      state,
      touched,
      isValid,
      isSubmitting,
      isValidating,
      // handlers
      handleBlur,
      handleChange,
      handleSubmit
    } = createForm({
      initialValues:JSON.parse(JSON.stringify(($roleStore.Liverole))),
      validationSchema: yup.object().shape({
        name: yup.string().required(),
        email: yup
          .string()
          .email()
          .required()
      }),
      onSubmit: values => {
        return makeRequest().then(() => {
          alert(JSON.stringify(values, null, 2));
        });
      }
    });


function edgeloop(inx){
    //$authStore.activepack.branchlevel[inx].submen
    $roleStore.LiveAvailmod.Modules.forEach ( (mod) => {             

if(mod.menulevel !== 'COMPANY') {            
    if($authStore.activepack.branchlevel !== null || $authStore.activepack.branchlevel.length > 0) {

        $authStore.activepack.branchlevel.forEach((br,inx)=>{
            if(br.packid === mod.packid) {
                
            }
        });
    }
} else if(mod.menulevel === 'COMPANY') {
    if($authStore.activepack.companylevel !== null || $authStore.activepack.companylevel.length > 0) {


    }            
}
})
}


    function removemodule_d(data) {               
        $roleStore.LiveSelectmod.Modules = $roleStore.LiveSelectmod.Modules.filter(x => !(x.packid === data.packid));
        let mynewv =[];
        //Check if the removedmodule is in Liverole (To retain values got from DB)
        if(JSON.stringify($roleStore.Liverole) !== JSON.stringify({})) {
            mynewv = $roleStore.Liverole.Modules.filter(y => y.packid === data.packid);
        }
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
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	function drop(event, basket) {
        console.log("Drop");
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const data = JSON.parse(json);   
        
        if(data.basketname !== basket.basketname) {
            if(data.basketname === "Availablemodules" && basket.basketname === "Selectedmodules"){                
                let mynewv = $roleStore.LiveAvailmod.filter(x => x.packid === data.packid);
                chk(mynewv);
                $roleStore.LiveAvailmod = $roleStore.LiveAvailmod.filter(x => !(x.packid === data.packid));
                console.log(JSON.stringify($roleStore.LiveSelectmod));
                if (JSON.stringify($roleStore.LiveSelectmod) === JSON.stringify({}) ) {
                    $roleStore.LiveSelectmod = {Rolemasterid: 'NewRole', Displayname: 'NewRole', Modules: [{...JSON.parse(JSON.stringify(mynewv[0])),basketname:"Selectedmodules"}]};
                }  else {
                    $roleStore.LiveSelectmod.Modules.push({...JSON.parse(JSON.stringify(mynewv[0])),basketname:"Selectedmodules"});
                }                
            }
        }

        

        hoveringOverBasket = null;
    }

    function chk(mynewv) {
        //TODO: Check and update the disable
       

        if(mynewv[0].menulevel !== 'COMPANY') {
            if($authStore.activepack.branchlevel !== null || $authStore.activepack.branchlevel.length > 0) {           
                $authStore.activepack.branchlevel.forEach( br => {
                    if(br.packid === mynewv[0].packid) {
                        mynewv[0].disablefunc = false;
                        looptofind(br,mynewv[0]);
                    }
                });
            }
        } else if(mynewv[0].menulevel === 'COMPANY') {
            if($authStore.activepack.companylevel !== null || $authStore.activepack.companylevel.length > 0) {

                $authStore.activepack.companylevel.forEach( br => {
                    console.log(br);
                    if(br.packid === mynewv[0].packid) {
                        mynewv[0].disablefunc = false;
                        looptofind(br,mynewv[0]);
                    }
                });            
            
            }            
        }

    }


    function looptofind(br,mynewvcpy) {
        /*
        let mynewvcpy;
        if(mynewv.type === 'pack') {
            mynewvcpy = mynewv[0];
        }
        */

        if(mynewvcpy.submenu !== null || mynewvcpy.submenu.length > 0){
            mynewvcpy.submenu.forEach( nbr => {
                br.submenu.forEach ( xbr => {
                    if(nbr.packid === xbr.packid) {
                        nbr.disablefunc = false;                      
                            looptofind(xbr,nbr);                      
                    }
                })
            });

        }       
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

    function saveaction(action){                
        let dd = diffJson($roleStore.Liverole,$roleStore.LiveSelectmod);
        console.log(dd);
    
    }

    let tog = true;
    function handleToggleActive() {
        tog = !tog;
    }
    

</script>


<style >
    /* CHECKBOX TOGGLE SWITCH */
    /* @apply rules for documentation, these do not work as inline style */
    .toggle-checkbox:checked {
      @apply right-0;
      @apply border-green-400;
      right: 0;
      border-color: #68D391;
    }
    .toggle-checkbox:checked + .toggle-label {
      @apply bg-green-400;
      background-color: #68D391;
    }
    </style>

<div class="shadow rounded-lg flex flex-col  bg-white">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
      
        <h2 class="text-2xl text-black text-gray-700 font-bold">{modtext } Role</h2>  
        <span class="flex-grow"></span>  
        {#if mymod !== 'display'}
       <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click|preventDefault={()=>saveaction(btntxt)}>{btntxt}</button>
       {/if}
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md" on:click|preventDefault={()=>sendcardaction('cancel')}>Cancel</button>      
    </div>
    {JSON.stringify($form)}
    <form class="px-10 py-1 rounded w-full my-5 inputs space-y-6"  style={mystyle}>
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
  

            
            <div class=" md:col-start-1 md:col-span-4">				  
             
                <label for="firstname"><b>Company : </b>{$authStore.activecompany.companyName}</label>
                
                    </div>


                    <div class=" md:col-span-4">				  
                        <label for="firstname"><b>Branch : </b>{$authStore.activebranch.branchName} </label>
             
                                
                            </div>




        </div>
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
            <div class="pristine-form-group md:col-span-3">			  
            <Switch bind:checked={uno}></Switch>
            </div>
            {#if uno}
            <div class="pristine-form-group md:col-span-3">				  
                <label for="firstname">Copy from Role</label>
                    <select required 
                    class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                    >dasdfasdf</select>
                    <div class="pristine-error-group"></div>
            </div>
            {:else}
                <div class="md:col-span-3">	
                    <label for="firstname">Creating Role from Scratch.  <p>Toggle button to Copy Existing Role</p></label>
                </div>
            {/if}
        
        </div>

        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
        
            <!--div class="pristine-form-group md:col-start-1 md:col-span-5">	-->		
            
              
            <label for="branchname">Branch Name</label>
                        <input  
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"
                        type = "text"
                        id = "branchname"
                        name = "branchName"
                        bind:value={$form.branchName}
                        />
            
            <!--
            <label for="branchname">Branch Short Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />

                        -->
                        <!--bind:value={$branchstore.branchShortName}-->
                        <!--div class="pristine-error-group"></div>
                    </div-->

                    <!--div class="pristine-form-group md:col-start-6 md:col-span-5"-->				  
                        <label for="branchname">Branch Short Name</label>
                        <!--bind:value={$branchstore.branchShortName}-->
                        <input required 
                                class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                        type = "text"
                        
        
                                />
                                <!--div class="pristine-error-group"></div>
                            </div-->



        
                </div>

        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
            <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                <label for="Addressline2">Address Line 2</label>
                <!--bind:value={$branchstore.branchAddLine2}-->
                <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
                    
        

    </div>
    </form> 

<div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">
{#if mymod !== 'display'}
<div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">

    <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">            
        <b class="m-3 p-5">Available modules</b>
        <div class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full">
          
        {#if  $roleStore.LiveAvailmod.length === 0}
            <div class ="h-52 flex-grow"> All Available modules assigned </div>
        {:else}
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
    {/if}
    </div>
    </div>
</div>

<div>kdkdkkd</div>
{/if}
<!-- on:dragenter={() => hoveringOverBasket = basket.name} -->
<div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3"
    on:dragenter={() => hoveringOverBasket = "Selectedmodules"}
    on:dragleave={() => null}
    on:drop={event => drop(event,{groupid:"mygroup",basketname:"Selectedmodules"})}     
    ondragover="return false"
    style={mystyle}
    
>

    {#if JSON.stringify($roleStore.LiveSelectmod) === JSON.stringify({}) || $roleStore.LiveSelectmod.Modules?.length === 0 }
        <div class ="h-96 flex-grow">Nothing selected yet</div>
    {:else}

    {#each $roleStore.LiveSelectmod.Modules as basket, basketIndex (basket)} 
        <div class="shadow rounded-lg p-3  bg-green-100 w-full md:w-9/19">
            <div class="flex flex-row justify-center">
                <b class="m-3 ">{basket.name}</b>
                <span class="flex flex-1 "></span> 
                {#if mymod !== 'display'}
                <span on:click={()=>removemodule(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
                {/if}
              </div>
              <div class="container">
                            <table class="min-w-full divide-y divide-gray-200">  
                                
                                    <Roleselectdetails  bind:basketsd = {$roleStore.LiveSelectmod.Modules} basket={basket} {basketIndex} {patharray}/>                                
                                
                            </table>
              </div>

        </div>
    {/each}
    {/if}
</div>



</div>
</div>

