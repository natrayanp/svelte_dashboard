
//import { createErrorStore } from "./error";
import { createAuthStore } from "../services/authservice1/authstore";
import { createSessionStore } from "./session";
import { writable } from "svelte/store"
import { initAuthStore } from './authStore';


//*Auth Store - START

export const authStore = initAuthStore();
export var authVal: any;
let unsub = authStore.subscribe((val) => authVal=val);

//*Auth Store - END