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
    activecompany:null,  //This has the company selected by user
    allbranch:[],
    activebranch:null,   //This has the company selected by user
    allowedops:[],
    allpack:[],
    activepack:null,
    selectedpack:null, 
    livepack:{},
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
          console.log(val);
          console.log(cpy);
          console.log(i);
            return cpy.companyId !== val.companyId;
        });
        str.allcompany.push(val);
        

     }  


     let branchset_replace = (str,val) => {  

      console.log(str.activebranch);
      console.log(val);

      
      if(str.activebranch !== undefined && str.activebranch.branchId == val.branchId) {
        console.log("appada1");
        str.activebranch = JSON.parse(JSON.stringify(val));
        console.log("appada2");
      }
      console.log("appada");
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
        console.log("going inside companyset start");
        companyset_replace(self,value);
        console.log("going inside companyset end");
        return self;
      }),  
      setBranch: (value) => update(self => {
                console.log("going inside companyset start");

        branchset_replace(self,value);
        console.log("going inside companyset end");
        return self;
      }),  
   
     }
   
     return MyAuthStore;
   
   }


