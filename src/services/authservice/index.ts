import firebase from 'firebase/app';
import 'firebase/auth';

import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';


import {environment as env} from '../../environment/production';

import { useMachine } from './useMachine';
import { initAuthMachine } from './authMachine';

const userMapper = claims => ({
	id: claims.user_id,
	name: claims.name,
	email: claims.email,
	picture: claims.picture
});

//export const initAuth = () => {};



// construction function. need to call it after we
// initialize our firebase app
export const initAuth = (useRedirect = false) => {
	
	//Initialise the firebase
	const firebaseConfig = env.firebase;
	firebase.initializeApp(firebaseConfig);
	
	const auth = firebase.auth();

	const loginWithEmailPassword = (email, password) =>
		auth.signInWithEmailAndPassword(email, password);

	const  login = (provider) => {
		return useRedirect
		? auth.signInWithRedirect(provider)
		: auth.signInWithPopup(provider);
	} 

	const loginWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		return login(provider);
	};


	const services = {
		redirectChecker: async () => {			
			return firebase.auth().getRedirectResult().then(auth => (auth.user));
		},		
		authChangeObjserver: (_,event) =>{
			// Listening for Authstate and status change to signedout
			// change state to LOGOUT	
			// This is registered only on signedIn state.		
			return firebase.auth().onAuthStateChanged(auth => ({type: 'LOGOUTS',auth}));	
			},
		authChecker: () =>
			// wrap the onAuthStateChanged hook in a promise and
			// immediately unsubscribe when triggered
			new Promise((resolve, reject) => {
				const unsubscribe = firebase.auth().onAuthStateChanged(auth => {
					unsubscribe();
					return auth ? resolve(auth) : reject();
				});
			}),
		authenticator: (_, event) => {
			if (event.provider === 'email') {
				return loginWithEmailPassword(event.email, event.password);
			} else if (event.provider === 'google') {
				return loginWithGoogle();
			}
		},
		loader: (ctx, _) => {
			return new Promise(resolve => {
				setTimeout(() => {
					// auth object is already set on the app context
					// by authChecker service
					ctx.auth
						.getIdTokenResult()
						.then(({ claims }) => userMapper(claims))
						.then(resolve);
				}, 1500);
			});
		},
		logout: () => auth.signOut(),
		signupDBUpdate: () => {}
		
	};

	const authMachine = initAuthMachine(services);

	return useMachine(authMachine);

};

