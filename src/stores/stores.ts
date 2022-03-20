
//import { createErrorStore } from "./error";
//import { createAuthStore } from "../services/authservice/authstore";
import { createSessionStore } from "./session";
import { writable, derived } from "svelte/store"
import { initAuthStore } from './authStore';
import { initEntityStore } from './entityStore';
import { initRoleStore } from './roleStore';
import { initUserMatrixStore } from './usermatrixStore';


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

//*Roles store - START
export const roleStore = initRoleStore();
export let roleVal;
/*
export const getRoleStore = () => { 
    console.log("nat");
    roleStore = initRoleStore();
    let roleUnsub = roleStore.subscribe((val) => roleVal=val);
    return roleStore;
};
*/
let roleUnsub = roleStore.subscribe((val) => roleVal=val);

//*Roles store - END


//*UserMatrix store - START             
export const usermatrixStore = initUserMatrixStore();
export let usermatrixVal;
/*
export const getRoleStore = () => { 
    console.log("nat");
    roleStore = initRoleStore();
    let roleUnsub = roleStore.subscribe((val) => roleVal=val);
    return roleStore;
};
*/
let usermatrixUnsub = usermatrixStore.subscribe((val) => usermatrixVal=val);

//*Roles store - END


const restAllStore = () => {
    authStore.reset();
    entityStore.reset();
    roleStore.reset();
    usermatrixStore.reset_All();
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
   
     
   