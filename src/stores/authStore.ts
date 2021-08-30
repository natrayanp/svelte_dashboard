import { writable } from "svelte/store";

const INITIAL_AUTH_STORE = {
    auth:null,
    user: null,
    stage: 'logout',
    detail: null,   //This will be overritten
    listener:null,
    session:null,
    siteid:null,
    allentity:[],
    activeentity:null,
    allcompany:[],
    activecompany:null,
    allbranch:[],
    activebranch:null,
    allowedops:[],
    allpack:[],
    activepack:null,
    selectedpack:null, 
};



export const initAuthStore = (initialStore = INITIAL_AUTH_STORE) => {

    let store = writable({
     ...INITIAL_AUTH_STORE
   })
   
   const { subscribe, set, update } = store;
    /*
     const { subscribe, set, update } = writable({
       ...INITIAL_ENT_STORE
     })
   */

     let companyset_replace = (str,val) => {
        str.activecompany = val;

        str.allcompany = str.allcompany.filter( (cpy,i) => {
            return cpy.companyId !== val.companyId;
        })
        str.allcompany.push(val);
     }  


     let branchset_replace = (str,val) => {      
      if(str.activebranch !== undefined && str.activebranch.branchId == val.branchId) {
        str.activebranch = JSON.parse(val);
      }

      if(str.allbranch !== undefined) {
      str.allbranch = str.allbranch.filter( (bran) => {
          return bran.branchId !== val.branchId;
      })
      } else if(str.allbranch === undefined){
        str.allbranch = [];  
      }
      str.allbranch.push(val);
   }  


     const MyAuthStore = {
       store: store,
       subscribe,
       set,
       update,       
       reset: () => set(INITIAL_AUTH_STORE),
       setCompany: (value) => update(self => {
        companyset_replace(self,value);
        return self;
      }),  
      setBranch: (value) => update(self => {
        branchset_replace(self,value);
        return self;
      }),  
   
     }
   
     return MyAuthStore;
   
   }


