import { createMachine, assign } from 'xstate';


const config = {
  id: 'auth',
  // we want to start by checking if
  // user is logged in when page loads
  initial: 'redirecting',
  // context is where you keep state
  context: {
    auth: null,
    user: null,
    error: null,   
    apimsg: null, 
    email:null,
    isredir: false,
    issignup: false,
    islogin: false,    
  },
  // all possible authentication states
  states: {
    redirecting: {
      invoke: {
        id: 'redirectChecker',
        src: 'redirectChecker',
        onDone: [{ target: 'authenticating', cond: 'searchValid' },
                 { target: 'signedOut' }],
      },
      entry: ['openValidationModal']
    },
    authenticating: {
      // when entering a state invoke
      // the authChecker service
      invoke: {
        id: 'authChecker',
        src: 'authChecker',
        onDone: { target: 'loading', actions: 'setAuth' },
        onError: { target: 'signedOut' }
      }
    },
    // we will enrich the user profile
    // with additional data
    loading: {
      invoke: {
        id: 'loader',
        src: 'loader',
        onDone: [ { target: 'signupDB', cond: (ctx) => ctx.issignup },
                  { target: 'loginDB', cond: (ctx) => ctx.isredir || ctx.islogin},                                                         
                  { target: 'sessionConf'}],
        onError: {
          target: 'signedOut.failure',
          actions: ['setError', 'clearAuth','toggleRedir']
        }
      },
      exit: ['setUser'],
    },
    sessionConf: { 
      on: {
            LOGIN : {target: 'loginDB',actions: 'toggleLogin'},
            LOGOUT : {target: 'signingOut' }
      }
      /*
      on:{
        '': {target : 'signedIn'}
      }
      */
    },
    signupDB: {            
      invoke: {
        id: 'signupDBUpdate',
        src: 'signupDBUpdate',
        onDone: {target:'setSilentMsg',actions: 'setApiMsgr'},
        onError: {target:'setSilentMsg',actions: 'setApiError'}
      }      
      /*on:{'':{target:'signingOut'}}*/
    },
    loginDB: {     
      
      invoke: {
        id: 'loginDBUpdate',
        src: 'loginDBUpdate',
        onDone: {target:'signedIn', action: 'setSession'},
        onError: {target:'setSilentMsg',actions: 'setApiError'}
      }
      /*on:{'':{target:'signedIn'}}*/
    },
    signedIn: {       
      // Register to Authchange Listener
      invoke: {
        id: 'authchangelistener',
        src: 'authChangeObjserver',
        onDone: 'signingOut',
      },
      // when receiving 'LOGOUT' event
      // transition to singingOut state
      on: { LOGOUT: { target: 'signingOut' },
            LOGOUTA: { target: 'signingOut', cond: 'searchValid' } 
          }
    },
    // signedOut has two sub-states
    // we will transition to failure in
    // case of wrong password, username
    // or network error
    signedOut: {
      entry:['clearAll'],
      initial: 'ok',
      states: {
        ok: { type: 'final' },
        failure: {}
      },
      on: {
        LOGIN: { target: 'signingIn' , actions: 'toggleLogin'},
        SIGNUP: { target: 'signingIn', actions: 'toggleSignup' }
      }
    },
    signingIn: {
      entry: ['setEmail'],
      invoke: {
        id: 'authenticator',
        src: 'authenticator',
        onDone: {
          target: 'authenticating',
          // clear error if successful login
          actions: 'clearError'
        },
        onError: [/*{
          // transition to failure state
          // and set an error
          target: 'signedOut.failure',
          actions: 'setError',
          cond: (ctx) => !ctx.issignup
        },*/
        {target:'validateError',actions: 'setError'}
      ]
      }
    },
    validateError:{
      invoke : {
        id : 'errorvalidator',
        src : 'errorvalidator',
        //onDone: { target: 'signedOut.failure'}        
      },
      on: {
        // Registration completed in firebase but not in our local DB
        SIGNUPV :  { target: 'signupApint' },
        ERRORV  :  {target: 'setSilentFBEr'}                  
      }
    },
    setSilentFBEr: {
      on: {DONE: {target:'signingOut'} },
      exit:['clearError','clearApiMsg']
    },
    setSilentMsg: {
      on: {DONE: {target:'signingOut'} },
      exit:['clearError','clearApiMsg']
    },
    signupApint: { 
      // "Signup API with no token" as the user is already created in firebase
      // but still not created in our DB
      invoke: {
        id: 'signupApiwemail',
        src: 'signupApiwemail',
        onDone: {target:'setSilentMsg',actions: 'setApiMsgr'},
        onError: {target:'setSilentMsg',actions: 'setApiError'}
      }
      /*on:{'':{target:'signingOut'}}*/
    },
    signingOut: {
      invoke: {
        id: 'logout',
        src: 'logout',
        onDone: {
          target: 'signedOut',
          actions: ['clearError']
        },
        onError: {
          target: 'signedOut.failure',
          actions: ['clearAuth', 'setError']
        }
      }
    },
  }
};



export const initAuthMachine = services => {
  // define XState actions so that we can
  // refer to them by name in machine config
  const actions = {
    clearAll: assign({auth: null, user: null, error: null, apimsg: null, email:null, isredir: false, issignup: false, islogin: false}),
    // clear user info on logout
    clearAuth: assign({ user: null, auth: null }),
    clearError: assign({ error: null }),    
    clearApiMsg: assign({ apimsg: null }),    
    // put Firebase auth object on context
    setAuth: assign({ auth: (_, event) => event.data }),
    // put user on context in loading service
    setUser: assign({ user: (_, event) => event.data }),
    setError: assign({
      error: (_, event) => event.data,
    }),
    setApiMsgr: assign({
      apimsg: (_, event) => {
        console.log(event);
        console.log('0909090909 inside api msg');
        return JSON.parse(event.data.data);   
      }
    }),   
    setApiError: assign({apimsg: (_, event) => {
      console.log("iweuijk89798kl");
      console.log(JSON.parse(event.data.response.data).detail);
     return JSON.parse(event.data.response.data).detail;
    
    }
    }),
    toggleRedir: assign({isredir:(ctx,_) => !(ctx.isredir)}),
    toggleSignup: assign({issignup:(ctx,_) => true}),
    toggleLogin: assign({islogin:(ctx,_) => true}),
    setEmail: assign({email:(ctx,event)=> (ctx.issignup)?event.email:null }),
    setSession: assign({ user : (ctx,event) => ({...ctx.user,session:event.data.sessionid})),
    singupdbstart:assign({apimsg: (ctx,event) => {console.log('start db'); console.log(JSON.stringify(ctx))} })
    singupdbstart1:assign({apimsg: (ctx,event) => {console.log('start db exit'); console.log(JSON.stringify(ctx))} })
  };


	const guards = {
		searchValid: (ctx, event) => {
      // Checks if user details exists in the event (NOT NULL)
      //if no then user is logged out, we need to move our state as well
      console.log(event);
      if(!event.auth) return true;
      ctx.isredir = true;      
      return false;
    } 
	  }



  // create an options object containing
  // actions and services
  const options = {
    actions,
    services,
    guards
  };

  return createMachine(config, options);
};
