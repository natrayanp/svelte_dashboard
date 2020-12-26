<script >

import Modals from '../common/notifications/components/modals/DefaultModal.svelte';
import {Alerts} from '../common/notifications'
import { getNotificationsContext } from '../common/notifications';
//import {push, pop, replace} from 'svelte-spa-router'
//import {link} from 'svelte-spa-router'
import {isActive, url} from '@roxi/routify'


const { addNotification } = getNotificationsContext();

function add() {
  //push('/book/42')

/*    let dd = addNotification({
      text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
      notificationtype: 'modal',            
      modaltype:'modal-no-action',      
      comp:Modals
  });
  console.log(dd);  
  dd.then((val)=> console.log(val));*/
}




</script>

<p> you are inside home</p>
<Alerts/>

<a href={$url('./login')}>Login</a>
<a href={$url('./landing')}>Dash</a>
<p>l8ilsld</p>



<button
  on:click={add} >
  Add notification
</button>


