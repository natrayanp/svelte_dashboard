<style>
  .default-position-style-top-left,
  .default-position-style-top-center,
  .default-position-style-top-right,
  .default-position-style-bottom-left,
  .default-position-style-bottom-center,
  .default-position-style-bottom-right {
    position: fixed;
    width: 270px;
  }

  .default-position-style-top-left {
    top: 0;
    left: 0;
  }

  .default-position-style-top-center {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .default-position-style-top-right {
    top: 0;
    right: 0;
  }

  .default-position-style-bottom-left {
    bottom: 0;
    left: 0;
  }

  .default-position-style-bottom-center {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .default-position-style-bottom-right {
    bottom: 0;
    right: 0;
  }
</style>
<script>
  import { setContext } from 'svelte';


  import Notification from './notifications/Notification.svelte';
  import DefaultNotification from './notifications/DefaultNotification.svelte';

  import Modal from './modals/Modal.svelte';
  import DefaultModal from './modals/DefaultModal.svelte';
  

  import context from '../context';
  import store from '../store';
  import {positions} from '../modals';

  export let item = null;
  export let withoutStyles = false;

  const getClass = (position = '') => {
    const defaultPositionClass = ` default-position-style-${position}`;

    return `position-${position}${withoutStyles ? '' : defaultPositionClass}`;
  };

  setContext(context, store);
  let mynoti;
  let mymodal;

  const unsubscribe = store.subscribe(value => {
	  mynoti = value.filter((n) => (n.notificationtype === 'notification'));
    mymodal = value.filter((n) => (n.notificationtype === 'modal'));        
  });

  function seleselectmynct(n) {
    if(n.comp) return n.comp;
    if(n.modaltype = 'modal-no-action') return DefaultModal;
  }

</script>



<slot></slot>
{#if mynoti.length > 0}
<div class="notifications">
  {#each positions as position}
    <div class={getClass(position)}>
      {#each mynoti as notification (notification.id)}        
          {#if notification.position === position}
            <Notification
              {notification}
              {withoutStyles}
              item={item || DefaultNotification}
            />
          {/if}                 
      {/each}
    </div>
  {/each}
</div>
{/if}

{#if mymodal.length > 0}
{mymodal.length} {JSON.stringify(mymodal)}
  {#each mymodal as notification (notification.id)}

      <Modal
      {notification}
      item={seleselectmynct(notification) }
      />

  {/each}
{/if}
