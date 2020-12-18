import { writable } from "svelte/store";

const INITIAL_STORE = {
    user: null,
    auth:null,
    state: 'logout'
};

export const initAuthStore = (initialStore = INITIAL_STORE) => {
    let authStore = writable(INITIAL_STORE);    
    return authStore;
}