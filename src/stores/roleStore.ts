import { writable, get } from 'svelte/store'


  const  INITIAL_ROLE_STORE =        {                              
    "Availablemodules": [] ,                              
    "Selectedmodules": [],
    "Unselectedmodules": [],
    "Liverole":{},
    "LiveAvailmod":[],
    "LiveSelectmod":{},
    "ChangeDetails" :{masterdefaul: {rolemasterid : "NEW",rolename : "",roledisplayname : "",roledescription : ""},
                        profile:{},orgdetail:[],orgprofile:{},detail:[],audit:{},ischanged:false},
  };

export const initRoleStore = (initialStore = INITIAL_ROLE_STORE) => {

    let store = writable({
     ...INITIAL_ROLE_STORE
   })
   
   const { subscribe, set, update } = store;


   let modulesetvals = (self,val,ops) => {                    

                switch(val.modname){                      
                    case "Availablemodules": {                        
                        if (ops === "set") {
                            self.Availablemodules = val.value.slice();
                        } else {
                            self.Availablemodules.push(val.value);
                        }
                        
                        break; 
                    }
                    case "Selectedmodules": {
                        if (ops === "set") {
                            self.Selectedmodules = val.value.slice();
                        } else {
                            self.Selectedmodules.push(val.value);
                        }
                        
                        break; 
                    }
                    case "Unselectedmodules": {
                        if (ops === "set") {
                            self.Unselectedmodules = val.value.slice();
                        } else {
                            self.Unselectedmodules.push(val.value);                            
                        } 
                        break;    
                    }                   
                     
                }
 }  


 let selection_reset = (self) => {
    self.Liverole = JSON.parse(JSON.stringify(INITIAL_ROLE_STORE.Liverole));
    self.LiveAvailmod = (INITIAL_ROLE_STORE.LiveAvailmod).slice();
    self.LiveSelectmod = JSON.parse(JSON.stringify(INITIAL_ROLE_STORE.LiveSelectmod));
    self.ChangeDetails = JSON.parse(JSON.stringify(INITIAL_ROLE_STORE.ChangeDetails));    
 }



     const MyRoleStore = {
       store: store,
       subscribe,
       set,
       setModVal: (value) => update(self => {
        modulesetvals(self,value,"set");
        return self;
      }), 
      updateModVal: (value) => update(self => {
        modulesetvals(self,value,"update");
        return self;
      }), 
       update,       
       reset: () => set(INITIAL_ROLE_STORE),
       reset_Selection: () => selection_reset(self),
     }

     return MyRoleStore;
   
}


