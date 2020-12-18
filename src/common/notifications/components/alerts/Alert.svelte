<script>
    import { onDestroy } from 'svelte';
  
    import { getNotificationsContext } from '../../context';
  
    export let item;
    export let notification = {};
    export let withoutStyles = false;
  
    const { removeNotification } = getNotificationsContext();
    const {
      id,
      removeAfter,
    } = notification;
    
    /*
    const removeNotificationHandler = () => { 
      console.log('inside close');
      removeNotification(id);
    };
  */
    const removeNotificationHandler = (event) => {
      console.log("-------");
      console.log(event);
      removeNotification(event.notiobj,event.data);

    }
    let timeout = null;
    
    if (removeAfter) {
      timeout = setTimeout(removeNotificationHandler, removeAfter);
    }
  
    onDestroy(() => {
      if (removeAfter && timeout) clearTimeout(timeout);
    });
  </script>
  
  <svelte:component
    this={item}
    {notification}
    {withoutStyles}
    onRemove={removeNotificationHandler}
  />  