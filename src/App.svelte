
<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from './login/Login.svelte';
	import Home from "./home/Home.svelte";
	import { onMount } from "svelte";
	import { session } from './stores/stores';
	import Notifications from './common/notifications';




	
	// Used for SSR. A falsy value is ignored by the Router.
	export let url = "";
	onMount(async ()=>{
		let tt = session;
		//const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		//photos = await res.json();

	});


  </script>
  <Notifications>
	
  
  <Router url="{url}">
	<nav>
		<Link to="home">Home</Link>
			
	  </nav>
	<div>
		<Route path="/d" component="{Home}" />
		<Route path="/" component="{Login}" />
	  
	</div>
  </Router>
</Notifications>