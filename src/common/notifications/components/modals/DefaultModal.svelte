

<script>
import { onMount } from "svelte";


//TODO for Modal
//export let disableClose = true;
//export let width=0;
//export let height=0;
//export let component=null;


export let notification;
export let onRemove = null;

onMount(async () => {
  if(notification.notificationtype === 'modal-accept'){

  }
});


//Data to return spec in modalas
function removeModal(event,data={closed:true}){    
  let sendevent = false;
  if (event.target.type ==='button') {    
    sendevent = true;
    (event.target.value ==='Reject')?data = {accept:false}: data = {accept:true};
  } else {    
    if(!notification.disableClose) sendevent = true;;
  }  
  let d = {notiobj:notification.myobj,data:data}
  if(sendevent) onRemove(d);
}


//on:click|capture={(event)=>removeModal(event,{accept:false})} 
//on:click|capture={(event)=>removeModal(event,{accept:true})}

</script>





<div class="fixed z-10 inset-0 overflow-y-auto" on:click={removeModal}>
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
        Background overlay, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        {#if notification.hasbackdrop }
          <div class="absolute inset-0 bg-gray-200 opacity-75 "></div>
        {:else}
          <div class="absolute inset-0 bg-gray-200 opacity-0 "></div>
        {/if}
      </div>
  
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <!--
        Modal panel, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full shadow-xl z-50" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div class="relative w-full bg-gray-200 rounded"></div>
          <div style="width: 100%" class="absolute top-0 h-2 shim-blue"></div>
        </div>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">{notification.title}</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">{notification.modaltype}{notification.text} We are checking your Credentials. Security is importance to us</p>                
              </div>
            </div>
          </div>
        </div>

        {#if notification.modaltype == 'modal-accept-reject'}
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          value='Reject'
          >
            {notification.rejectbtntxt ||'Reject'} 
          </button>
          <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          value ="Accept"
          >
            {notification.acceptbtntxt ||'Accept'}
          </button>
          <!--button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button-->
        </div>
        {/if}

      </div>
    </div>
  </div>


<style>

  .shim-red {
    position: relative;
    overflow: hidden;
    background-color: rgba(255, 0, 0, 0.7);
  }
  
  .shim-red::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(233, 233, 233, 1) 0,
      rgba(233, 233, 233, 0.9) 50%,
      rgba(233, 233, 233, 0.8) 100%
    );
    animation: shimmer 3s ease-out infinite;
    content: "";
  }
  
  .shim-blue {
    position: relative;
    overflow: hidden;
    background-color: rgba(0, 155, 255, 0.7);
  }
  .shim-blue::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(233, 233, 233, 1) 0,
      rgba(233, 233, 233, 0.9) 50%,
      rgba(233, 233, 233, 0.8) 100%
    );
    animation: shimmer 2.5s ease-out infinite;
    content: "";
  }
  
  
  @keyframes shimmer {
    100% {
      transform: translateX(0%);
      opacity: 0;
    }
  }
  
  </style>