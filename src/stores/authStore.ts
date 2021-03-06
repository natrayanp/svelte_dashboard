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
};

export const initAuthStore = (initialStore = INITIAL_STORE) => {
    let authStore = writable(INITIAL_STORE);    
    return authStore;
}