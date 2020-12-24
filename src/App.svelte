
<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login2 from './login/Login.svelte';
	import Home from "./home/Home.svelte";
	import Dash from './dashboard/Dash.svelte';
	import Test from './test/Test.svelte';
	import { onMount } from "svelte";
	//import { session } from './stores/stores';
	import Notifications from './common/notifications';





	
	// Used for SSR. A falsy value is ignored by the Router.
	export let url = "";
	onMount(async ()=>{
		//let tt = session;
		//const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		//photos = await res.json();

	});


  </script>
  <Notifications>
	
  
  <Router url="{url}">
	<nav>
		
		<Link to="home">Home</Link>
		<Link to="login">login</Link>
		<Link to="dash">Dash</Link>
		
	  </nav>
	<div>
		<Route path="/" component="{Home}" />
		<Route path="/login" component="{Login2}" />
		<Route path="/test" component="{Test}" />
		<Route path="/dash/*" component="{Dash}" />		
	  
	</div>
  </Router>
</Notifications>