
//import { createErrorStore } from "./error";
//import { createAuthStore } from "../services/authservice/authstore";
import { createSessionStore } from "./session";
import { writable, derived } from "svelte/store"
import { initAuthStore } from './authStore';
import { initEntityStore } from './entityStore';


//*Auth Store - START
export const authStore = initAuthStore();
export var authVal: any;
let authUnsub = authStore.subscribe((val) => authVal=val);

//*Auth Store - END


//*Enitity Store - START

export const entityStore = initEntityStore();
export var enityVal: any;
let entyUnsub = entityStore.subscribe((val) => enityVal=val);

//*Enitity Store - END


const restAllStore = () => {
    authStore.reset();
    entityStore.reset();
}

export const masterStore = {
    resetAll:() => {
        restAllStore();
    },
    authStore:authStore,
    authVal: authVal,
    entityStore: entityStore.store,
    entityVal: enityVal,
}


export const appStore1 = derived(
    authStore,   
    $authStore => {},
    );
   
     
   