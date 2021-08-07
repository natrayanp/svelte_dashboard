import { writable } from "svelte/store";

const INITIAL_STORE = {
    auth:null,
    user: null,
    stage: 'logout',
    detail: null,   //This will be overritten
    listener:null,
    session:null,
    siteid:null,
    menus:null,
    activepack:null,
    allcompany:null,
    activecompany:null,
    allbranch:null,
    activebranch:null,
};

let authStore;

export const initAuthStore = () => {
   // authStore = writable(INITIAL_STORE);    
    return initAuthStore1();
}


export const initAuthStore1 = (initialStore = INITIAL_STORE) => {

    let store = writable({
     ...INITIAL_STORE
   })
   
   const { subscribe, set, update } = store;
    /*
     const { subscribe, set, update } = writable({
       ...INITIAL_ENT_STORE
     })
   */
     const MyAuthStore = {
       store: store,
       subscribe,
       set,
       update,       
       reset: () => set(INITIAL_STORE)
   
     }
   
     return MyAuthStore;
   
   }