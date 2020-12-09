import { writable } from "svelte/store"




export class authVal {
    constructor(public user:firebase.default.User = null, public useridToken:string ='', public authInProgress:Boolean = true) {}
    
    public get _user(){return this.user};
    public get _usertoken(){return this.useridToken};
    public get _inprogress(){return this.authInProgress};
    public get _authAll(){return {'user':this.authInProgress,'userToken':this.useridToken,'inprogress':this.authInProgress}};
}





export const createAuthStore = (initialStore = new authVal()) => {

    const { subscribe, set, update } = writable(initialStore);

    return {
        subscribe,
        set,
        update        
    };
};  

