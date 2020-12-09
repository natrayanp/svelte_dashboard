<script>
import Modals from '../common/notifications/components/modals/CustomModals.svelte';

import { getNotificationsContext } from '../common/notifications';

const { addNotification } = getNotificationsContext();

	import { initAuth} from '../services/authservice';
	//import { fade } from 'svelte/transition';

	console.log('dd');

	// use custom auth machine store
	const { state, send } = initAuth();

	const loginHandler = async event => {
		//const { email, password } = event.target.elements;
		// send login event
		send('LOGIN', {
			provider: 'google',
			//email: 'natrayan[@gmail..com',
			//password: 'password.value'
		});
	};

	const logoutHandler = async event => {
		//const { email, password } = event.target.elements;
		// send login event
		send('LOGOUT');
	};

	let mymodal = null;


	const unsubscribe = state.subscribe(value => {

		if(!['sessionConf','signedIn', 'signedOut'].some(value.matches)) { 
			if(!mymodal){
				mymodal = addNotification({
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-no-action',      
				comp:Modals
			});
		}
		}  else {		
			console.log(mymodal);
			mymodal.close();
			mymodal=null;
		}
	});

	// we don't want to be explicit about signingIn state
    $: displayLoginForm = ['signingIn', 'signedOut'].some($state.matches);
</script>



<button on:click={loginHandler}>nat</button>
<button on:click={logoutHandler}>logout</button>

	<p> I am in login</p>
	{JSON.stringify($state.value)}
	<p></p>
	{JSON.stringify($state.context)}
	