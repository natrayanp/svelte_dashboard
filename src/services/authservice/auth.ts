
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import {authStore} from '../../stores/stores';
    import {providertype} from './authModals';
    import {environment as env} from '../../environment/production';   
    
  
   
    // Firebase user
    let user = null;
  
    // expose property on the component that we can use
    // to choose if we want use popup or redirect
    export let useRedirect = false;
  
    // small mapper function
    const userMapper1 = claims => ({
      id: claims.user_id,
      name: claims.name,
      email: claims.email,
      picture: claims.picture
    });

    const userMapper = tokens => ({
	id:      tokens.claims.user_id,
	name:    tokens.claims.name,
	email:   tokens.claims.email,
	picture: tokens.claims.picture,
	phonenumber: tokens.claims.phonenumber,
	signInProvider: tokens.signInProvider,	
	emailverified: tokens.claims.email_verified,
	token: tokens.token,
	session:null
    });


export const initAuth = (useRedirect = false) => {

    //Initialise the firebase
	const firebaseConfig = env.firebase;
	firebase.initializeApp(firebaseConfig);
	
	const auth = firebase.auth();
  
    const loginWithEmailPassword = (email, password) => {  
        let userCred;
        authStore.update(dd => ({...dd,stage:'FBUsrEmailStart'}));      
        let dd = {};
        return new Promise(async (resolve,reject) => {
            try{
                userCred = await auth.signInWithEmailAndPassword(email, password);            
            } catch (err) {
                dd = await fbErrorHandle('FBUsrEmailFail',err);
                reject(dd);
                return;
            }
            console.log(userCred);
            dd = await fbSuccessHandle('FBUsrEmailSuc',userCred.user)    
            console.log(dd)        ;

            if(dd.detail) {
                if(dd.detail.error) reject(dd);
             }

            resolve(dd);                
        });
    }

    const signupWithEmailPassword = (email, password) => {
        authStore.update(dd => ({...dd,stage:'FBUsrCrStart'}));
        let userCred;
        let dd = {};
        return new Promise(async (resolve,reject) => { 
            try{
                console.log("strarting sign up");
                userCred = await auth.createUserWithEmailAndPassword(email, password);   
                console.log(userCred);
            } catch (err) {
                console.log(err);
                if (err.code === 'auth/email-already-in-use') {
                   let dd =  {
                        auth:null,
                        user:null,
                        stage: 'FBUsrCrEmailExist',
                        detail: {error:false,message:email}                          
                    };
                    resolve(dd);
                    return;
                } else {
                    let dd = await fbErrorHandle('FBUsrCrFail',err);              
                    reject(dd);
                    return;
                }
            }

            dd = await fbSuccessHandle('FBUsrCrsuc',userCred.user)            

            if(dd.detail) {
               if(dd.detail.error) reject(dd);
            }
            resolve(dd);      
        });     
    }


    const loginWithProviders = (prov,isSignup) => {
        authStore.update(dd => ({...dd,stage:'FBloginStart'}));
        let dd ={};
        let userCred;
        const provider = getSigninProvider(prov);
        return new Promise(async (resolve,reject) => {
            try{
                if(useRedirect) {                    
                    try{
                        let myStorage = window.sessionStorage;
                        myStorage.setItem('acredirfor', (isSignup)?'signup':'login');
                    } catch (err) {
                        dd = await fbErrorHandle('FBloginSessStoErr',{code:'sessionstore',message:'Please enable session storage to proceed'});
                        reject(dd);                            
                    }                   

                    userCred = await auth.signInWithRedirect(provider);     

                } else {
                    userCred = await auth.signInWithPopup(provider);
                }
            } catch (err) {
                let x = isSignup?'FBSignupFail':'FBloginFail';
                dd = await fbErrorHandle(x,err);
                reject(dd);
            }

            let x = isSignup?'FBSignupSuc':'FBloginSuc';
            dd = await fbSuccessHandle(x,userCred);        

            if(dd.detail) {
                if(dd.detail.error) reject(dd);
            }

            resolve(dd);
        });      
    };

    const logout = async () => {        
        authStore.update(dd => ({...dd,stage:'FBLogoutStart'}));
        let dd = {};
        return new Promise((resolve,reject) => {
            auth.signOut()
            .then (async () => { 
                dd =  {
                        auth:null,
                        user:null,
                        stage: 'FBLogoutSuc',
                        detail: null,                        
                    };
            authStore.set(dd);
            resolve;
            })
            .catch( (err) => {
                authStore.update(dd => ({...dd,stage:'FBLogoutFail'}));
                console.log(err);
                reject(err);
            })
        });   
    };


    const redirectChecker = async () => {
        let dd = {};
        authStore.update(dd => ({...dd,stage:'FBredirectStart'}));
        let userCred = null;
        return new Promise(async (resolve,reject) => {
            console.log(useRedirect);
            if(useRedirect){
                try{
                    userCred = await auth.getRedirectResult();
                    console.log(userCred);
                    if(!userCred.user) {
                        console.log('going in');
                        throw {code:'FBredirectFail',message:'Redirect fail'}
                    }
                } catch (err) {
                    console.log("got error");
                    console.log(err);
                    dd = await fbErrorHandle('FBredirectFail',err);
                    console.log("before reject");
                    reject(dd);
                    return;
                }
                console.log('why i am coming here');
                dd = await fbSuccessHandle('FBredirectSuc',userCred.user);         
                console.log(dd);
                if(dd.detail && dd.detail.error) {
                    reject(dd)
                }

                resolve(dd);                
            } else {
                dd = await fbErrorHandle('FBredirectNA',{code:'redirNA',message:''});
                reject(dd);
            }            
        });                
    }


    const fbSuccessHandle = async (stage,userCred) => {
        let dd = {};
        let token;
        try {
            token = await userCred.getIdTokenResult(); // getIdToken is a method of user
            console.log(token);
        } catch (err) {
            dd = await fbErrorHandle('FBTokenFail',{code:'token',message:'Unable to get Token'});
            return dd;
        }
            
        let userd = userMapper(token);
        console.log(userd);
        dd = {
                auth:userCred,
                user:userd,
                stage: stage,
                detail:null
        };
        authStore.set(dd);
        return dd;
    }


    const fbErrorHandle = async (stage,err) => {   
        
        let cust_msg = null;

        if (err.code === 'auth/account-exists-with-different-credential') {
            cust_msg = 'You have already signed up with a different auth provider for that email.';
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        }     

        let dd =  {
                    auth:null,
                    user:null,
                    stage: stage,
                    detail: {error:true,message:(cust_msg)?cust_msg:err.message}
                };
        authStore.set(dd);
        return dd;
    }

    const getUserDetails = async (userCred) => { 
        const token = await userCred.getIdTokenResult();        
        return userMapper(token.claims);
      };


    const authChecker = () => {
      // wrap the onAuthStateChanged hook in a promise and
      // immediately unsubscribe when triggered
      let dd = {};
      authStore.update(dd => ({...dd,stage:'FBAuthChkStart'}));
      return new Promise((resolve, reject) => {
          const unsubscribe = firebase.auth().onAuthStateChanged(async (userCred) => {
              unsubscribe();
              //return auth ? resolve(auth) : reject();
              console.log(userCred);
              if(userCred) {                
                    dd = await fbSuccessHandle('FBAuthChkSuc',userCred);
                    resolve(dd);
              } else{
                    dd = await fbErrorHandle('FBAuthChkFail',{code:'authchk',message:'Unable to get Token'});
                    reject(dd);
              }
          });
      });
    }



    const authStateListener = () => {
    // will be fired every time auth state changes
    return auth.onAuthStateChanged(async fireUser => {
      if (fireUser) {
        // in here you might want to do some further actions
        // such as loading more data, etc.
  
        // if you want to set custom claims such as roles on a user
        // this is how to get them because they will be present
        // on the token.claims object
        const token = await fireUser.getIdTokenResult();
        user = userMapper(token);
      } else {
        user = null;
      }
    });
    }

    const getSigninProvider = (prov) => {
        if (prov === providertype.EMAILPASSWORD) {
            return new firebase.auth.EmailAuthProvider();            
        }
        else if (prov === providertype.GOOGLE){
            return new firebase.auth.GoogleAuthProvider();            
        }
        else if (prov === providertype.FACEBOOK){
            return new firebase.auth.FacebookAuthProvider();            
        }
    }  
    
    return {
        loginWithProviders,
        signupWithEmailPassword,
        loginWithEmailPassword,
        logout,
        redirectChecker,
        authChecker,
        authStateListener
    }

};
    // reactive helper variable
   // $: loggedIn = user !== null;


  
