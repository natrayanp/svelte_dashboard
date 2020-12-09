import firebase from 'firebase/app';
import 'firebase/auth';
import {environment as env} from '../../environment/production';
import readable from 'svelte';
import { writable } from 'svelte/store';
import { authVal } from './authstore';
import { session } from '../../stores/stores';

const firebaseConfig = env.firebase;
export var firApp:firebase.app.App; 
let firAppAuth: firebase.auth.Auth;
let authstore = session.ms().get('authstore');

enum provider {
  EMAILPASSWORD,
  GOOGLE,
  FACEBOOK
}

const initFireApp =  (applicationName?:string):void =>  {    
    if(applicationName){
        try {
            firApp = firebase.app(applicationName);    
          } catch (error) {
            firApp = firebase.initializeApp(firebaseConfig,applicationName);
          }        
    } else {
        try {
            firApp = firebase.app();    
          } catch (error) {
            firApp = firebase.initializeApp(firebaseConfig);
          }        
    }
    //return firApp;
};

export function signinGoogle(){}

function FireAuth(constd?:string) {
    initFireApp(constd);    
}


function signin(provier:provider) {
  let prov;
  switch(provier) {
    case(provider.EMAILPASSWORD) {
      prov = new firebase.auth.EmailAuthProvider();
      break;
    }
    case(provider.GOOGLE){
      prov = new firebase.auth.GoogleAuthProvider();
      break;
    }
    case(provider.FACEBOOK){
      prov = new firebase.auth.FacebookAuthProvider();
      break;
    }
  }
  firApp.auth().signInWithRedirect(prov);
}

 async function redirectCall() {
    console.log();
    authstore.set(new authVal());
    let dd = await initApp();    
}

export async function initApp(myappname?:string){
    FireAuth(myappname);
    console.log("redirect call start");
    await initApps();
    console.log("redirect call end");
}


async function initApps() {    
    
    return;
    
    // Result from Redirect auth flow.
    // [START getidptoken]
     await firApp.auth().getRedirectResult().then(function(result) {
        console.log("inside redirect");
      if (result.credential) {
        console.log("inside credential");

        console.log('user token');
        // [START_EXCLUDE]
        //document.getElementById('quickstart-oauthtoken').textContent = token;
      } else {
        console.log("inside credential else");
        //document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
      }
      // The signed-in user info.
      var user = result.user;
      console.log('user result of redirect');
      console.log(user);
    }).catch(function(error) {
        console.log('redirect error');
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END getidptoken]

    // Listening for auth state changes.
    await firApp.auth().onAuthStateChanged(function(user) {
        console.log("inside onauthchanged");
        console.log(authstore);
        //let user = user;
        let userIdToken = '';
      if (user) {
        console.log("inside onauthchanged user");
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        //var userIdToken:string;
        //await getToken(user).then((val)=> userIdToken= val);
        const n = async () => await user.getIdToken(true).then((val)=> userIdToken= val);                      
        console.log(authstore);
        console.log(user);
      } else {
        console.log("inside onauthchanged user else");
      }

      authstore.set(new authVal(user,userIdToken,false));
    });

    //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  }

  async function getToken(user:firebase.User): Promise<string>{
      let token: string;
    await user.getIdToken().then(
          (token) => {token =  token;},
          (err) => (console.log('error'))
      );
      return token;
  }


  export {
    signin,
    redirectCall
  };




