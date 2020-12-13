<script>
	//import Pristine from '../common/formvalidators/pristine/pristine1';
	import {formValidator} from '../common/formvalidators/formvalidator';
	//import {user, getUser} from './store.js';
	import {onMount, beforeUpdate,afterUpdate, tick} from 'svelte';
	import {testfor} from '../common/reactiveforms/form';
	//import Pristine from '../common/formvalidators/pristine/pristine1';
	var mpristine;
	var mform;
	let storeee;
	let fconf;
	$: fconf;
	fconf = {nome: 'Joana',address:[{city:'singapore'}]};
	
	// required only in case of array form to hold array form element
	let canvas = [];  

	let objForm;	

	mpristine = formValidator(fconf);
	storeee = mpristine.data;	
	$storeee = fconf;
	
	const unsubscribe = storeee.subscribe(value => {		
		console.log(value)	;
		fconf = value;
		//checkForVal();
	});

	onMount(async() => {
		//await tick();
		mform = document.getElementById("loginform");		
		mpristine.initVal(mform);
		//await checkForVal();	
	});

    // create the pristine instance
//    

   /* form.addEventListener('submit', function (e) {
      // e.preventDefault();
       
       // check if the form is valid
      // var valid = pristine.validate(); // returns true or false

    });*/

	function reset(){
		mpristine.formReset();
		//checkForVal();
	}


	async function checkForVal(){	
		console.log('coming inside');
	await tick();
	mform = document.getElementById("loginform");		
	mpristine.initVal(mform);
	/*
	if (!mpristine.isValInit()){
			mform = document.getElementById("loginform");						
			if(!(mform === undefined || mform === null)) mpristine.initVal(mform);
		}
	*/
	}

	let fields = Array(1);
	function handleSubmit(event) {	
		//checkForVal();	
		var valid = mpristine.formStatus();
		console.log(valid);
		const formData = new FormData(event.target)
		const formUser = {}
		for (const [k, v] of formData.entries()) {
			formUser[k] = v
		}
		console.log('valor no form', formUser)
		//console.log('valor no store', getUser())
	}
	
	async function addde(d) {
		
		fconf.address.push({city:''});
		$storeee = fconf;		
		await tick();
		mpristine.refreshFields(canvas[d+1]);
	}

	function removeee(d) {
		fconf.address.splice(d,1);
		//$storeee.address.splice(d,1);				
		$storeee = fconf;
		
		console.log(mpristine.refreshFields(canvas[d]));
		console.log(canvas);
		console.log(canvas[d]);
	}


</script>

<form action="#xxx" id="loginform" on:submit|preventDefault={handleSubmit}>		
	<div class="pristine-form-group mygroup md-xs focus:md-5">
		<label for="nome"><b>Nome</b></label>
		<input type="text" name="nome" bind:value={$storeee.nome} required
		class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue-300 hover:border-b">		
		<div class="pristine-error-group"></div>
	</div>

	
	{#each fconf.address as add,i}
		<div class="pristine-form-group mygroup md-xs focus:md-5" 	bind:this={canvas[i]}>
			<label for="nome"><b>City {i}</b></label>
			<input type="text" name="nome" bind:value={$storeee.address[i].city} required>		
			<div class="pristine-error-group"></div>
			{#if i>0}
			<button on:click|preventDefault={() => removeee(i)}>remove!!!</button>
			{/if}
			{#if i === fconf.address.length - 1}
			<p>showning</p>
			<button on:click|preventDefault={() => addde(i)}>Add!!!</button>
			{/if}
		</div>			
		
	{/each}

	
	<button type="submit">Go!!!</button>
	<p></p>
	<button on:click="{reset}">Reset!!!</button>
</form>


	<prev>{JSON.stringify($storeee)}</prev>
	<p></p>
	<prev>{JSON.stringify(fconf)}</prev>

