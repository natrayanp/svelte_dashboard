<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import {authStore} from '../stores/stores';
  
    const auth = firebase.auth();
  
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


  
    export const loginWithEmailPassword = (email, password) => {

        return new Promise((resolve,reject) => {
            auth.signInWithEmailAndPassword(email, password)
            .then(async (userCred) => {
                let dd = await authentication('FBauthsuc',userCred);   
                resolve (dd);
            })
            .catch((err) => {
                let dd = fbErrorHandle('FBauthFail',err);              
                reject(dd);                
            
            })
        }
        )};

    export const signupWithEmailPassword = (email, password) => {

        return new Promise((resolve,reject) => {
            auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCred) => {
                let dd = await authentication('FBUsrCrsuc',userCred);
                resolve (dd);
            })
            .catch((err) => {
                console.log(err);
                if (err === 'auth/email-already-in-use') {
                   let dd =  {
                        auth:null,
                        user:null,
                        stage: 'FBUsrCrEmailExist',
                        detail: {email}                          
                    };
                    resolve(dd);
                } else {
                    let dd = fbErrorHandle('FBUsrCrErr',err);              
                    reject(dd);
                }
            
            })
        }
        )};
		
  
    export const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      return new Promise((resolve,reject) => {
        auth.signInWithPopup(provider)
        .then( async (userCred) => { 
            let dd = await authentication('FBloginsuc',userCred);
            resolve (dd);
        })
        .catch((err) => { 
            let dd = fbErrorHandle('FBloginErr',err);
            reject(dd);

        });

      });      
    };

    export const logout = async () => {
        return new Promise((resolve,reject) => {
            auth.signOut()
            .then (async () => { 
                let dd =  {
                        auth:null,
                        user:null,
                        stage: 'FBLogoutSuc',
                        detail: null,
                    };
            authStore.set(...dd);
                resolve;
            })
            .catch( () => {
                authStore.update(dd => ({...dd,stage:'FBLogoutFail'}));
                reject;
            })
        });   
    };


    const authentication = async (stage,userCred) => {
        let userd = await getUserDetails(userCred);
                let dd = {
                        auth:userCred,
                        user:userd,
                        stage: stage,
                        detail:null
                };
        authStore.set(...dd);
        return dd;
    }


    const fbErrorHandle = async (stage,err) => {
            err.message
            let dd =  {
                        auth:null,
                        user:null,
                        stage: stage,
                        detail: {error:true,message:err.message}
                    };
            authStore.set(...dd);
            return dd;
    }

    const getUserDetails = async (userCred) => { 
        const token = await userCred.getIdTokenResult();        
        return userMapper(token.claims);
      }


  
    // will be fired every time auth state changes
    auth.onAuthStateChanged(async fireUser => {
      if (fireUser) {
        // in here you might want to do some further actions
        // such as loading more data, etc.
  
        // if you want to set custom claims such as roles on a user
        // this is how to get them because they will be present
        // on the token.claims object
        const token = await fireUser.getIdTokenResult();
        user = userMapper(token.claims);
      } else {
        user = null;
      }
    });
  
    // reactive helper variable
    $: loggedIn = user !== null;
</script>