
<script>
	

	import { onMount } from "svelte";
	import Notifications from './common/notifications';
	//import routes from './routes'
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	import { createAppServices } from "./stores/services";
	

	
	// Used for SSR. A falsy value is ignored by the Router.
	//export let url = "";
	onMount(async ()=>{
		createAppServices();
		//masterStore.initAppLevelStore();
		//let tt = session;
		//const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		//photos = await res.json();

	});


  </script>
  <Notifications>
	
  <!--
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
  -->

  <Router {routes}/>


</Notifications>