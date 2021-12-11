<style>
  .default-notification-style {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 12px;
    background: #fff;
    color: #000;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    min-height: 0;
    overflow: hidden;
  }

  .default-notification-style-content {
    width: 210px;
    padding: 12px 6px 12px 12px;
    box-sizing: border-box;
    word-wrap: break-word;
  }

  .default-notification-style-button {
    display: block;
    width: 40px;
    padding: 0 0 2px;
    margin: 0;
    border: none;
    border-left: 1px solid #eee;
    outline: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
    color: #000;
    box-sizing: border-box;
  }

  .default-notification-style-button:hover {
    background: rgba(0, 0, 0, 0.01);
  }

  .default-notification-danger {
    background: #f3555a;
    color: #fff;
  }

  .default-notification-danger .default-notification-style-button {
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    color: #fff;
  }

  .default-notification-warning {
    background: #ffb900;
    color: #000;
  }

  .default-notification-warning .default-notification-style-button {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    color: #000;
  }

  .default-notification-success {
    background: #22ce6c;
    color: #fff;
  }

  .default-notification-success .default-notification-style-button {
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    color: #fff;
  }
</style>

<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let notification = {};
  export let withoutStyles = false;
  export let onRemove = null;
/*
  const {
    text,
    type,
  } = notification;
*/
  let color = null;
    let clor_all;
    let clor_rb;
    let clor_txt;
    let title;
    let text;
    let type;
    let disableClose;
    let counter;
    let percent;
    $: clor_all;
    $:  clor_rb;
    $:  clor_txt;
    $: title;
    $: text;
    $: type;
    $: disableClose;
    $: counter;
    //$: percent;
    
    title = notification.title;
    text = notification.text;
    type = notification.type;
    disableClose = notification.disableClose;
    counter = notification.removeAfter/100;
    let or_counter = notification.removeAfter/100;
    percent = 100 - ((counter/or_counter)*100);
    console.log(notification.removeAfter);
    let origcount = notification.removeAfter/10;


  let timeout = null;

if (origcount) {
  
 timeout = setTimeout(countDown, origcount);
 //timeout = setTimeout(countDown, removeAfter);
}

function countDown()
{
  
  counter = counter - 1;
  if (counter == 0)
  {
       clearTimeout( timeout );
       timeout = null;
       console.log("inside if --", counter);
       removeAlert();
  }
  else
  {
    percent = 100 - ((counter/or_counter)*100);
    timeout = setTimeout(countDown, origcount);
    console.log("inside else --", counter);
    console.log(percent);
  }
  

}

    onMount( () => {
      getClass();
    });

  const getClass = (suffix) => {
    const defaultSuffix = suffix ? `-${suffix}` : '';
    const defaultNotificationClass = ` default-notification-style${defaultSuffix}`;
    const defaultNotificationType = type && !suffix ? ` default-notification-${type}` : '';
    if(!color){
        switch(type){
          case('success'): {
            color ='green';
            break;
          }
          case('warning'): {
            color ='yellow';
            break;
          }
          case('error'): {
            color ='red';
            break;
          }
          case('info'): {
            color ='blue';
            break;
          }
          default:{
            color ='green';
          }
        }
      }

       clor_all = `flex max-w-sm w-full mx-auto shadow-md rounded-lg overflow-hidden bg-${color}-100 relative`;        
        clor_rb = `flex justify-center items-center w-12 bg-${color}-500`;      
        clor_txt = `text-${color}-500 font-semibold`; 
    return `notification${defaultSuffix}${withoutStyles ? '' : defaultNotificationClass}${defaultNotificationType}`;
  };

  function removeAlert(event,data={closed:true}){   
    clearTimeout( timeout );
       timeout = null; 
      console.log('djkdj');
      console.log(notification);
        let d = {notiobj:notification.myobj,data:data}
        onRemove(d);
    }
</script>




<div>

  <div class={clor_all}>
  <div class={clor_rb}>
      <svg class="h-6 w-6 fill-current text-white" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
      </svg>
  </div>
  
  <div class="-mx-3 py-2 px-4">
    <div class="w-full bg-gray-200 rounded-lg h-1 dark:bg-gray-700">
      <div class="bg-blue-600 h-1 rounded-lg dark:bg-gray-300" style="width: {percent}%"></div>
    </div>
      <div class="mx-3">
          <span class={clor_txt}>{title || 'Success'}</span>
          <p class="text-gray-600 text-sm">{text}</p>
      </div>
  </div>
  {#if !disableClose}
    <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="times"
    class="svg-inline--fa fa-times fa-w-11 absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-gray-800 cursor-pointer"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352 512"
    on:click|preventDefault={removeAlert}
  >
    <path
      fill="currentColor"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    ></path>
  </svg>  
  {/if}

</div>
</div>

<!--
<div
  class={getClass()}
  role="status"
  aria-live="polite"
  in:fade
  out:fade
>
  <div class={getClass('content')}>
    <slot>{text}</slot>
  </div>
  <button
    class={getClass('button')}
    on:click|preventDefault={removeAlert}
    aria-label="delete notification"
  >
    &times;
  </button>
</div>


-->