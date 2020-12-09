<script >

import Modals from '../common/notifications/components/modals/CustomModals.svelte';
import {Alerts} from '../common/notifications'
import { getNotificationsContext } from '../common/notifications';

const { addNotification } = getNotificationsContext();

function add() {
    let dd = addNotification({
      text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
      notificationtype: 'modal',            
      modaltype:'modal-no-action',      
      comp:Modals
  });
  console.log(dd);  
  dd.then((val)=> console.log(val));
}




</script>

<p> you are inside home</p>
<Alerts/>



<button
  on:click={add} >
  Add notification
</button>


