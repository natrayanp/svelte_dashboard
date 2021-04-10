import { readable, writable } from 'svelte/store';
import Pristine from './pristine/pristine';
import  read_write_form  from './formdiasable';

export const formValidator = (fieldconf) => {

  //let ValInit=false;
    //config = {};
    //live = true;
  //Add any custom validators that are added
  
  /*
  for (var i = 0; i < customval.length; i++) {    
    if (customval[i] && !(customval[i]==={})){
      let {name,fn,msg,priority,halt} = customval[i];
      Pristine.addValidator(name,fn,msg,priority,halt);
    } 
  }
*/
  let pristine;
  //let isValInit = () => ValInit;
  //Create Pristine instance
  let initValidator = (form,customval=[]) => {
    pristine = new Pristine(form,{},true);
    //ValInit=true;
  };
  //Get status of the form
  let isformValid =() => {return pristine.validate()};  
  
  let formReset = () => pristine.reset();
  
  let refreshFields = (form) =>  pristine.refreshFields(form);
  
  //let doInitIfNotDone = () 
  
  let disableform = (form) => read_write_form(form);
  let enableform = (form) => read_write_form(form,false);
  
  console.log("---------------");
  console.log(fieldconf);
  // wrap in a svelte store
  let store = writable(set => set(fieldconf));  
  
  // return a custom Svelte store
  return {
    data: store,
    status: isformValid,
    reset: formReset,
    initVal:initValidator,
    disable: disableform,
    enable: enableform,
   // isValInit:isValInit,
    refreshFields:refreshFields,
  };
};


