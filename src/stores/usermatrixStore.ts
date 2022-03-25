import { writable, get } from 'svelte/store'

const INITIAL_USERMATRIX_STORE =        {                              
   // "Availablemodules": [] , //Delte this as this is not required                             
   // "Selectedmodules": [],
    //"Unselectedmodules": [],
    "Listallmatrix":[],
    "Livematrix":{},
    "Livematrixindex":null,  //This has the index of the "Livematrix" item from "Listallmatrix" array
    "LiveAvailbranch":[],    
    "LiveAvailrole":[],
    //"LiveAvailmatrix":[],
    "LiveSelectmatrix":{},
    "ChangeDetails" :{profiledefaul: {userid : "NEW",Userstatus:"Active"},
                        profile:{},matrix:[],orgprofile:{},orgmatrix:[],audit:{},
                        profilechanged: false, matrixchanged: false, Somechanged:false},
    "mode": "list",
  };

export const initUserMatrixStore = (initialStore = INITIAL_USERMATRIX_STORE) => {

    let store = writable({
     ...initialStore
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

interface Changestruct {
    changval: Boolean;
    changtype: "profile"|"matrix"    
  }

let calcChange = (self,val:Changestruct) =>{
    
    switch(val.changtype){
        case("profile"): {
            self.ChangeDetails.profilechanged = val.changval;
            break;
        }
        case("matrix"): {
            self.ChangeDetails.matrixchanged = val.changval;
            break;
        }
    }

    if(self.ChangeDetails.profilechanged &&  self.ChangeDetails.matrixchanged) {
        self.ChangeDetails.Allchanged = true;
    } else {
        self.ChangeDetails.Allchanged = false;
    }

 }


 let selection_reset = (self) => {
    self.Livematrix = JSON.parse(JSON.stringify(INITIAL_USERMATRIX_STORE.Livematrix));
    self.LiveAvailmatrix = (INITIAL_USERMATRIX_STORE.LiveAvailmatrix).slice();
    self.LiveSelectmatrix = JSON.parse(JSON.stringify(INITIAL_USERMATRIX_STORE.LiveSelectmatrix));
    self.ChangeDetails = JSON.parse(JSON.stringify(INITIAL_USERMATRIX_STORE.ChangeDetails));
 }



     const MyUserMatrixStore = {
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
       reset_All: () => set(INITIAL_USERMATRIX_STORE),
       reset_Selection: () => selection_reset(self),
       changeStat: (value:Changestruct) => calcChange(self,value), 
     }

     
     
     return MyUserMatrixStore;
   
}


