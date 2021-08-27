import { writable, get } from 'svelte/store'

const INITIAL_ROLE_STORE =        {                              
    "Availablemodules": [] ,                              
    "Selectedmodules": [],
    "Unselectedmodules": []
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
     }

     
     
     return MyRoleStore;
   
}


