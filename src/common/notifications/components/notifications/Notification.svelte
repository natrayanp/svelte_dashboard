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

  const removeNotificationHandler = (event) => {
    console.log("-------");
      console.log(event);
      let d = {notiobj:notification.myobj,data:""};
      console.log(d);
      removeNotification(d.notiobj,d.data);
  }



/*
  let timeout = null;

  if (removeAfter) {
    counter = removeAfter/100;
   // timeout = setTimeout(removeNotificationHandler, removeAfter);
   timeout = setTimeout(countDown, removeAfter);
  }

  function countDown( )
{
    counter = counter - 1;   
    if (counter == 0)
    {
      removeNotificationHandler();
         clearTimeout( timeout );
         timeout = null;
         console.log("inside if --", counter);
    }
    else
    {
      //  timer = window.setTimeout( "countDown()", 1000);
      console.log("inside else --", counter);
    }
}
*/

  onDestroy(() => {
   // if (removeAfter && timeout) clearTimeout(timeout);
  });
</script>

<svelte:component
  this={item}
  {notification}
  {withoutStyles}
  onRemove={removeNotificationHandler}
/>