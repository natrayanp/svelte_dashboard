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
    isredir: false,
    issignup: false,
    islogin: false,
    mmodal:null
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
        onDone: [ { target: 'signupDB', actions: 'setUser', cond: (ctx) => ctx.issignup },
                  { target: 'loginDB', actions: 'setUser', cond: (ctx) => ctx.isredir || ctx.islogin},                                                         
                  { target: 'sessionConf'}],
        onError: {
          target: 'signedOut.failure',
          actions: ['setError', 'clearAuth','toggleRedir']
        }
      }
    },
    sessionConf: { 
      on: {
            LOGIN : {target: 'signingIn'},
            LOGOUT : {target: 'signingOut'}
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
        onDone: 'signingOut',
      }
    },
    loginDB: {
      /*
      invoke: {
        id: 'loginDBUpdate',
        src: 'loginDBUpdate',
        onDone: 'signedIn',
      }*/
      on:{
        '': {target : 'signedIn'}
      }
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
      invoke: {
        id: 'authenticator',
        src: 'authenticator',
        onDone: {
          target: 'authenticating',
          // clear error if successful login
          actions: 'clearError'
        },
        onError: {
          // transition to failure state
          // and set an error
          target: 'signedOut.failure',
          actions: 'setError'
        }
      }
    },
    signingOut: {
      invoke: {
        id: 'logout',
        src: 'logout',
        onDone: {
          target: 'signedOut',
          actions: ['clearAuth', 'clearError']
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
    // clear user info on logout
    clearAuth: assign({ user: null, auth: null }),
    clearError: assign({ error: null }),
    // put Firebase auth object on context
    setAuth: assign({ auth: (_, event) => event.data }),
    // put user on context in loading service
    setUser: assign({ user: (_, event) => event.data }),
    setError: assign({
      error: (_, event) => event.data,
    }),
    toggleRedir: assign({isredir:(ctx,event) => !(ctx.isredir)}),
    toggleSignup: assign({issignup:(ctx,event) => !(ctx.issignup)}),
    toggleLogin: assign({islogin:(ctx,event) => !ctx.islogin}),

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
