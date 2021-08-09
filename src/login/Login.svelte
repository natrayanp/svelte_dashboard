<script>
//import Modals from../common/notifications/components/modals/DefaultModal.sveltete';
import {formValidator} from '../common/formvalidators/formvalidator';
import {onMount, onDestroy} from 'svelte';

import { getNotificationsContext } from '../common/notifications';
//import { navigate } from "svelte-routing";

const { addNotification } = getNotificationsContext();
import { goto } from '@roxi/routify';

import {installation as ins} from '../environment/production';


//import {authapi_services} from '../services/authservice/authapi';
import {authInit,signupHandler,dosignout,sessionexist,providerlogin,activateListener} from '../services/authservice/authservice';
import {authStore, authVal} from '../stores/stores';
import {providertype} from '../services/authservice/authModals';


//import Router, { push } from 'svelte-spa-router'

	//import { initAuth} from '../services/authservice';
	import Alerts from '../common/notifications/components/alerts/Alerts.svelte';
import { get } from 'svelte/store';
	//import { fade } from 'svelte/transition';

	let sign_up_mode = false;

	//import Test from '../test/Test.svelte';

	// Form Validator usuage starts
	let mform;
	let sform;
	let loginform;	
	let loginstore;
	let logindata;
	let logindata_init;	
	$: logindata;
	logindata_init = {email: '',password:''};
	logindata = JSON.parse(JSON.stringify(logindata_init));

	let signupform;
	let signupstore;
	let signupdata;
	let signupdata_init;	
	$: signupdata;
	signupdata_init = {name: '',email:'',password:''};
	signupdata = JSON.parse(JSON.stringify(signupdata_init));

	loginform = formValidator(logindata);
	loginstore = loginform.data;	
	$loginstore = logindata;

	let login_alert;
	let signin_alert;
	
	console.log(loginstore);
	

	const loginunsub = loginstore.subscribe(value => {		
		console.log(value)	;
		logindata = value;		
	});

	signupform = formValidator(signupdata);
	signupstore = signupform.data;	
	$signupstore = signupdata;
	
	console.log(signupstore);

	const signupunsub = signupstore.subscribe(value => {		
		console.log(value)	;
		signupdata = value;		
	});


	onMount(async() => {		
		mform = document.getElementById("loginform");		
		loginform.initVal(mform);

		sform = document.getElementById("signupform");		
		signupform.initVal(sform);	
		let redirfor = sessionStorage.getItem('acredirfor');
		if(redirfor === 'signup') toggle_signup();
		
	});

	onDestroy(async () => {
		// await activateListener();
	});
	

	// Form Validator usuage Ends

	console.log('start of authservice init');
	let dd = authInit(true);
	console.log('end of authservice init');
	console.log(dd);


	const restFormh = () => {
		
		if(sign_up_mode) {
			signupdata =  JSON.parse(JSON.stringify(signupdata_init));
			$signupstore = signupdata;
			signupform.reset();			
		} else {			
			logindata = JSON.parse(JSON.stringify(logindata_init));
			$loginstore = logindata;
			loginform.reset();
		}
	}


	const loginprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-no-action',  	
				//comp:Modals				
			});
	}

	const sessionConfmodal = (val) => {
			return addNotification({
				title : 'Checking your account',
				text: 'You are logging in as '+ val.user.email + ' and may have existing session.  Accept if you are '+ val.user.email + ' and to invalidate all other logins' ,
				notificationtype: 'modal',   
				rejectbtntxt:'Cancel',
				acceptbtntxt:'Proceed',				
				modaltype:'modal-accept-reject',  	
				//comp:Modals				
			});
		}


	const allAlerts = (val) => {
		return addNotification({
				targetid: sign_up_mode?'signup': 'login',
				title : sign_up_mode?'Signup Alert': 'Login Alert',				
				//text: 'dkdkdk',
				text: val.detail.data.message,
				type:val.detail.error?'error': 'success',										
				notificationtype: 'alert',     
				disableClose: false,        
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
	}

	let mymodal = null;
	const unsub =  authStore.subscribe(async val => { 
		console.log(val);
		if(['redirectchkstart','FBUsrEmailStart','FBUsrCrStart','FBloginStart','FBLogoutStart','FBredirectStart','FBAuthChkStart'].includes(val.stage)) {
			console.log('Open only Modal');
			if(!mymodal){
				mymodal = loginprogressmodal();
			}
		} else if (['SessionConf'].includes(val.stage)) {
			console.log('sessionconif ');
			if(mymodal) {
				console.log('sessionconif mymod');
				mymodal.close();
				mymodal=null;
			}
			if(!mymodal){
				console.log("opening modal");
				mymodal = sessionConfmodal(val);
			}			
			console.log(mymodal);
			mymodal.returneddata.then((val) => {
				mymodal=null;
				sessionConf(val); 
				console.log('making modal as null');
				//mymodal=null;
				//mymodal.close();
			});
		} else if (['FBAuthChkFail','FBLogoutSuc','FBTokenFail'].includes(val.stage)) {
			console.log('Just close the Modal');			
			if(mymodal) {
				restFormh();
				console.log('FBAuthChkFail mymod');
				mymodal.close();
				mymodal=null;
			}
		} else if (['FBUsrCrFail','signupemailFail','signupemailSuc','signupFail','loginFail','FBUsrEmailFail','redirectloginFail','redirectsignupFail','redirectsignupSuc'].includes(val.stage)) {
			console.log('close Modal & show alert');
			if(mymodal) {
				restFormh();
				console.log('FBUsrCrFail mymod');
				mymodal.close();
				mymodal=null;
			}			
			let myerror = allAlerts(val);
		} else if(['loginSuc','redirectloginSuc'].includes(val.stage)) {
			console.log('Just close the Modal and navigate to secure page');				
			if(mymodal) {
				restFormh();
				console.log('loginSuc mymod');
				mymodal.close();
				mymodal=null;
			}
			activateListener();
			//navigate("/dash", { replace: true });
			//push('/landing');
			//if(val.detail.data[0].isurlcreated) {
				console.log(val)
			
			/*if(val.detail.data.havedomain) {			
				//authStore.update(dd => ({...dd,stage:'done',session:(val.detail.data.sessionid),siteid:(val.detail.data[0].siteid)}));
				authStore.update(dd => ({...dd,stage:'done',session:(val.detail.data.sessionid),siteid:ins.siteid}));
				//authStore.update(dd => ({...dd,siteid:(val.detail.data[0].siteid)}));
				$goto('/landing');
				console.log()
			} else {
				//authStore.update(dd => ({...dd,stage:'done',session:(val.detail.data[0].sessionid),siteid:(val.detail.data[0].siteid)}));
				authStore.update(dd => ({...dd,stage:'done',session:(val.detail.data.sessionid),siteid:ins.siteid}));				
				$goto('/landing/subdomain');
			}*/
			console.log(val.detail.data.nextaction);
			console.log(val.detail);
			switch (val.detail.data.nextaction){				
				case 'LANDING':					
					authStore.update(dd => ({...dd,
											  	stage:'done',
											  	session:(val.detail.session),
											  	siteid:ins.siteid,
											  	menus:val.detail.data.menu,
											  	activepack:val.detail.data.menu[0],
												allcompany: val.detail.data.company,
												activecompany: getactiveEntity(val.detail.data.company),
												allbranch:val.detail.data.branch,
												activebranch: getactiveEntity(val.detail.data.branch),}));  
					$goto('/landing');
					break;
				case 'DOMAINREGIS':
					authStore.update(dd => ({...dd,
												stage:'done',
												session:(val.detail.session),
												siteid:ins.siteid,
												detail:val.detail.data}));	
					$goto('/landing/subdomain');			
					break;
				case 'ADDPACKS':
					authStore.update(dd => ({...dd,
												stage:'done',
												session:(val.detail.session),
												siteid:ins.siteid,
												detail:val.detail.data}));	
					$goto('/landing/pricing');	
					break;
				case 'ADDCOMPANY':
					console.log(val.detail.data.menu[0].submenu);
					authStore.update(dd => ({...dd,
												stage:'done',
												session:(val.detail.session),
												siteid:ins.siteid,
												menus:val.detail.data.menu,
												activepack:val.detail.data.menu[0]}));				
					sessionStorage.setItem('cpyfirst', true);
					$goto('./landing/companysettings');	
					break;
				case 'ADDBRANCH':
					await authStore.update(dd => ({...dd,
												stage:'done',
												session:val.detail.session,
												siteid:ins.siteid,
												menus:val.detail.data.menu,
												activepack:val.detail.data.menu[0],
												allcompany: val.detail.data.company,
												activecompany: getactiveEntity(val.detail.data.company),}));
					console.log(authVal);
					sessionStorage.setItem('brnfirst', true);
					$goto('/landing/branchsettings');
					break;					
			}
	
		}
				
	});

	let sessionConf = async (val) => {
		console.log("inside d");
		console.log(val);
		if (val.accept) {
			await sessionexist();
		} else {
			await dosignout();
			//send('LOGOUT');
		}
	}
	

	const googleSignup = async () => {	
			await providerlogin(sign_up_mode,providertype.GOOGLE);
	}

	const emailSignup = async () => {
		console.log(signupdata);
			
		let formvalid = false;
		let data_to_api = null;

		if (sign_up_mode) {	
			const {name,email,password}=signupdata;			
			if (signupform.status()) formvalid = true;
			data_to_api = {name:name,email:email,password:password};
		} else {
			const {email,password}=logindata;	
			if (loginform.status()) formvalid = true;
			data_to_api = {email:email,password:password};
			console.log(data_to_api)
		}		
		if(formvalid) {
			await signupHandler(sign_up_mode,providertype.EMAILPASSWORD,data_to_api);		
		}
	}

	
	
	$: container = 'container';
	
	function toggle_signup() {
		console.log('test');
		sign_up_mode=!sign_up_mode;
		container = sign_up_mode?'container sign-up-mode':'container sign-in-mode';
		//if(sign_up_mode) signupform.reset();
		//if(!sign_up_mode) loginform.reset();
		restFormh();
		
	}

	function todel(){
		console.log('kdjdf');
		//authapi_services.signupApiwemail();
		
		let myerror = addNotification({
				targetid:'login',
				title : 'alert test',				
				text: 'myerre sadfafafsd asfasdfasdf asdfasdfasd fsfasd fasfasdf asfasdfasdf asdf fasdfasdf',
				notificationtype: 'alert',      
				type: 'success',     
				disableClose: false, 
				singleton:true,
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
			
	}


function getactiveEntity(entityArray) {
	console.log(entityArray);
	let activeentity;
	entityArray.forEach(ele => {
		if(ele.isdefault === "Y"){
			activeentity = ele;
		}
	});
	return activeentity;
}


</script>


<!---
<button on:click={loginHandler}>nat</button>
<button on:click={logoutHandler}>logout</button>
	
	<p> I am in login</p>
	{JSON.stringify($state.value)}
	<p></p>
	{JSON.stringify($state.context)}

<p></p>
{JSON.stringify($authStore)}

<p>Login form</p>
<prev>{JSON.stringify($loginstore)}</prev>
<p></p>
<prev>{JSON.stringify(logindata)}</prev>
<p>Sign form</p>
<prev>{JSON.stringify($signupstore)}</prev>
<p></p>
<prev>{JSON.stringify(signupdata)}</prev>

-->

<div class="flex items-center justify-center">


	<div class="{container}">
		<div class="forms-container">			
		  <div class="signin-signup">
			<div class="al">
			
			</div>
			<form id="loginform" action="#xxx" class="sign-in-form" on:submit|preventDefault={emailSignup}>
			  <h2 class="title">Sign in</h2>
			  <div class="ale">			  
			  <Alerts targetid="login" />
			  </div>
			  <div class="form-group pristine-form-group">
				<!--div class="input-field"-->
				<div>
					<i class="fas fa-user"></i>
					<input type="text" required placeholder="Username" bind:value={$loginstore.email}
					class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"		
					/>
				</div>
				<div class="pristine-error-group"></div>
			  </div>
			  <div class="form-group pristine-form-group">
				<!--div class="input-field"-->
				<div>
					<i class="fas fa-lock"></i>
					<input type="password" required placeholder="Password" bind:value={$loginstore.password}
					class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"		
					/>
				</div>
				<div class="pristine-error-group"></div>
				</div>				
			  <div class="form-group">
			  <input type="submit" value="Login" class="btn solid" />
			  </div>
			  <p class="social-text">Or Sign in with social platforms</p>
			  <div>
				<a href="#" class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:no-underline hover:bg-gray-100"
				on:click={googleSignup}
				>
					<div class="px-4 py-3">
						<svg class="h-6 w-6" viewBox="0 0 40 40">
							<path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
							<path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
							<path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
							<path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
						</svg>
					</div>
	
					<span class="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</span>
				</a>
				</div>
				<br/>
			  <div class="social-media">
				<a href="#" class="social-icon" >
				  <i class="fab fa-facebook-f"></i>
				</a>
				<a href="#" class="social-icon">
				  <i class="fab fa-twitter"></i>
				</a>
				<!--a href="#" class="social-icon">
				  <i class="fab fa-google"></i>
				</a-->
				<a href="#" class="social-icon" on:click={todel}>
				  <i class="fab fa-linkedin-in"></i>
				</a>
			  </div>
			</form>
			
			<form id = "signupform" action="#" class="sign-up-form" on:submit|preventDefault={emailSignup}>
			  <h2 class="title">Sign up</h2>
			  <div class="ale">
				<Alerts targetid="signup" />				
				</div>
			  <!--div class="input-field"-->
			  <div class="pristine-form-group">
				<i class="fas fa-user"></i>
				<input type="text" required placeholder="Username" bind:value={$signupstore.name}
				class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"		
				/>
				<div class="pristine-error-group"></div>  
			</div>
			  
			  <!--div class="input-field"-->
			  <div class="pristine-form-group">
				<i class="fas fa-envelope"></i>
				<input type="email" required placeholder="Email" bind:value={$signupstore.email}
				class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"		
				/>
				<div class="pristine-error-group"></div>
			  </div>
			  
			  <!--div class="input-field"-->
			  <div class="pristine-form-group">
				<i class="fas fa-lock"></i>
				<input type="password" required placeholder="Password" bind:value={$signupstore.password}
				class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"		
				/>
				<div class="pristine-error-group"></div>
			  </div>
			  
			  <input type="submit" class="btn" value="Sign up"/>
			
			  <p class="social-text">Or Sign up with social platforms</p>
			  <div>
				<a href="#" class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:no-underline hover:bg-gray-100"
				on:click={googleSignup}
				>
					<div class="px-4 py-3">
						<svg class="h-6 w-6" viewBox="0 0 40 40">
							<path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
							<path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
							<path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
							<path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
						</svg>
					</div>
	
					<span class="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</span>
				</a>
				</div>
				<br/>
			  <div class="social-media">
				<a href="#" class="social-icon">
				  <i class="fab fa-facebook-f"></i>
				</a>
				<a href="#" class="social-icon">
				  <i class="fab fa-twitter"></i>
				</a>
				<!--a href="#" class="social-icon">
				  <i class="fab fa-google"></i>
				</a-->
				<a href="#" class="social-icon">
				  <i class="fab fa-linkedin-in"></i>
				</a>
			  </div>
			</form>
		  </div>
		</div>
	
		<div class="panels-container">
		  <div class="panel left-panel">
			<div class="content">
			  <h3>New here ?</h3>
			  <p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
				ex ratione. Aliquid!
			  </p>
			  <button class="btn transparent" id="sign-up-btn" on:click={toggle_signup} >
				Sign up
			  </button>
			</div>
			<img src="img/log.svg" class="image" alt="" />
		  </div>
		  <div class="panel right-panel">
			<div class="content">
			  <h3>One of us ?</h3>
			  <p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
				laboriosam ad deleniti.
			  </p>
			  <button class="btn transparent bg-red-500" id="sign-in-btn" on:click={toggle_signup} >
				Sign in
			  </button>
			</div>
			<img src="img/register.svg" class="image" alt="" />
		  </div>
		</div>
	  </div>
	
	</div>


		
	
	  
	<style>
	@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
	
	
	
	input {
	  font-family: "Poppins", sans-serif;
	}
	
	.container {
	  position: relative;
	  width: 100%;
	  background-color: white;
	  min-height: 100vh;
	  overflow: hidden;
	  
	}
	
	.forms-container {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  top: 0;
	  left: 0;
	}
	
	.signin-signup {
	  position: absolute;
	  top: 50%;
	  transform: translate(-50%, -50%);
	  left: 75%;
	  width: 50%;
	  transition: 1s 0.7s ease-in-out;
	  display: grid;
	  grid-template-columns: 1fr;
	  z-index: 5;
	}

	.al {
		grid-column:1/2;
		grid-row:1/2;
	}

	.ale{
		width: 100%;
	}
	
	form {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
	  padding: 0rem 5rem;
	  transition: all 0.2s 0.7s;
	  overflow: hidden;
	  grid-column: 1 / 2;
	  grid-row: 2 / 3;
	}
	
	form.sign-up-form {
	  opacity: 0;
	  z-index: 1;
	}
	
	form.sign-in-form {
	  z-index: 2;
	}
	
	.title {
	  font-size: 2.2rem;
	  color: #444;
	  margin-bottom: 10px;
	}
	
	.input-field {
	  max-width: 380px;
	  width: 100%;
	  background-color: #f0f0f0;
	  margin: 10px 0;
	  height: 55px;
	  border-radius: 55px;
	  display: grid;
	  grid-template-columns: 15% 85%;
	  padding: 0 0.4rem;
	  position: relative;
	}
	
	.input-field i {
	  text-align: center;
	  line-height: 55px;
	  color: #acacac;
	  transition: 0.5s;
	  font-size: 1.1rem;
	}
	
	.input-field input {
	  background: none;
	  outline: none;
	  border: none;
	  line-height: 1;
	  font-weight: 600;
	  font-size: 1.1rem;
	  color: #333;
	}
	
	.input-field input::placeholder {
	  color: #aaa;
	  font-weight: 500;
	}
	
	.social-text {
	  padding: 0.7rem 0;
	  font-size: 1rem;
	}
	
	.social-media {
	  display: flex;
	  justify-content: center;
	}
	
	.social-icon {
	  height: 46px;
	  width: 46px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  margin: 0 0.45rem;
	  color: #333;
	  border-radius: 50%;
	  border: 1px solid #333;
	  text-decoration: none;
	  font-size: 1.1rem;
	  transition: 0.3s;
	}
	
	.social-icon:hover {
	  color: #4481eb;
	  border-color: #4481eb;
	}
	
	.btn {
	  width: 150px;
	  background-color: #5995fd;
	  border: none;
	  outline: none;
	  height: 49px;
	  border-radius: 49px;
	  color: #fff;
	  text-transform: uppercase;
	  font-weight: 600;
	  margin: 10px 0;
	  cursor: pointer;
	  transition: 0.5s;
	}
	
	.btn:hover {
	  background-color: #4d84e2;
	}
	.panels-container {
	  position: absolute;
	  height: 100%;
	  width: 100%;
	  top: 0;
	  left: 0;
	  display: grid;
	  grid-template-columns: repeat(2, 1fr);
	}  
	
	
	.container:before {
	  content: "";
	  position: absolute;
	  height: 2000px;
	  width: 2000px;
	  top: -10%;
	  right: 48%;
	  transform: translateY(-50%);  
	  transition: 1.8s ease-in-out;
	  border-radius: 60%;
	  z-index: 6;
	   
	}
	
	.image {
	  width: 100%;
	  transition: transform 1.1s ease-in-out;
	  transition-delay: 0.4s;
	}
	
	.panel {
	  display: flex;
	  flex-direction: column;
	  align-items: flex-end;
	  justify-content: space-around;
	  text-align: center;
	  z-index: 6;
	}
	
	.left-panel {
	  pointer-events: all;
	  padding: 3rem 17% 2rem 12%;
	}
	
	.right-panel {
	  pointer-events: none;
	  padding: 3rem 12% 2rem 17%;
	}
	
	.panel .content {
	  color: black;
	  transition: transform 0.9s ease-in-out;
	  transition-delay: 0.1s;
	}
	
	.panel h3 {
	  font-weight: 600;
	  line-height: 1;
	  font-size: 1.5rem;
	}
	
	.panel p {
	  font-size: 0.95rem;
	  padding: 0.7rem 0;
	}
	
	.btn.transparent {
	  margin: 0;
	  background: none;
	  border: 2px solid #fff;
	  background-color: #5995fd;
	  width: 130px;
	  height: 41px;
	  font-weight: 600;
	  font-size: 0.8rem;
	}
	
	.right-panel .image,
	.right-panel .content {
	  transform: translateX(800px);
	}
	
	/* ANIMATION */
	
	.container.sign-up-mode:before {
	  transform: translate(100%, -50%);
	  right: 52%;
	  animation: pulse 5s ease-out 1;  
	}
	
	.container.sign-in-mode:before {
	  animation: pulse1 5s ease-out 1;  
	}
	
	
	.container.sign-up-mode .left-panel .image,
	.container.sign-up-mode .left-panel .content {
	  transform: translateX(-800px);
	  
	}
	
	.container.sign-up-mode .signin-signup {
	  left: 25%;
	}
	
	.container.sign-up-mode form.sign-up-form {
	  opacity: 1;
	  z-index: 2;
	}
	
	.container.sign-up-mode form.sign-in-form {
	  opacity: 0;
	  z-index: 1;
	}
	
	.container.sign-up-mode .right-panel .image,
	.container.sign-up-mode .right-panel .content {
	  transform: translateX(0%);
	  
	}
	
	.container.sign-up-mode .left-panel {
	  pointer-events: none;
	  
	}
	
	.container.sign-up-mode .right-panel {
	  pointer-events: all;
	}
	
	@keyframes pulse {
	  0% {
		background-color: #FFF;
	  }
	  100% {
		background-color: #FFF;
	  }
	}
	
	@keyframes pulse1 {
	  0% {
		background-color: #FFF;
	  }
		100% {
		background-color: #FFF;
	  }
	}
	
	@media (max-width: 870px) {
	  .container {
		min-height: 800px;
		height: 100vh;
	  }
	  .signin-signup {
		width: 100%;
		top: 95%;
		transform: translate(-50%, -100%);
		transition: 1s 0.8s ease-in-out;
	  }
	
	  .signin-signup,
	  .container.sign-up-mode .signin-signup {
		left: 50%;
	  }
	
	  .panels-container {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 2fr 1fr;
	  }
	
	  .panel {
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 2.5rem 8%;
		grid-column: 1 / 2;
	  }
	
	  .right-panel {
		grid-row: 3 / 4;
	  }
	
	  .left-panel {
		grid-row: 1 / 2;
	  }
	
	  .image {
		width: 200px;
		transition: transform 0.9s ease-in-out;
		transition-delay: 0.6s;
	  }
	
	  .panel .content {
		padding-right: 15%;
		transition: transform 0.9s ease-in-out;
		transition-delay: 0.8s;
	  }
	
	  .panel h3 {
		font-size: 1.2rem;
	  }
	
	  .panel p {
		font-size: 0.7rem;
		padding: 0.5rem 0;
	  }
	
	  .btn.transparent {
		width: 110px;
		height: 35px;
		font-size: 0.7rem;
	  }
	
	  .container:before {
		width: 1500px;
		height: 1500px;
		transform: translateX(-50%);
		background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
		left: 30%;
		bottom: 68%;
		right: initial;
		top: initial;
		transition: 2s ease-in-out;
	  }
	
	  .container.sign-up-mode:before {
		transform: translate(-50%, 100%);
		bottom: 32%;
		right: initial;
	  }
	
	  .container.sign-up-mode .left-panel .image,
	  .container.sign-up-mode .left-panel .content {
		transform: translateY(-300px);
	  }
	
	  .container.sign-up-mode .right-panel .image,
	  .container.sign-up-mode .right-panel .content {
		transform: translateY(0px);
	  }
	
	  .right-panel .image,
	  .right-panel .content {
		transform: translateY(300px);
	  }
	
	  .container.sign-up-mode .signin-signup {
		top: 5%;
		transform: translate(-50%, 0);
	  }
	}
	
	@media (max-width: 570px) {
	  form {
		padding: 0 1.5rem;
	  }
	
	  .image {
		display: none;
	  }
	  .panel .content {
		padding: 0.5rem 1rem;
	  }
	  .container {
		padding: 1.5rem;
	  }
	
	  .container:before {
		bottom: 72%;
		left: 50%;
	  }
	
	  .container.sign-up-mode:before {
		bottom: 28%;
		left: 50%;
	  }
	}
	</style>