
//import { createErrorStore } from "./error";
import { createAuthStore } from "../services/authservice1/authstore";
import { createSessionStore } from "./session";
import { writable } from "svelte/store"

export const error = writable(0);
export const authstore = createAuthStore();
export const session = createSessionStore();

session.setOtherStores('authstore',authstore);
session.setOtherStores('error',error);

console.log(session);
console.log("All done");
