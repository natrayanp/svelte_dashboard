import { writable, get } from 'svelte/store'

const INITIAL_ENT_STORE = {
    company: [],
    refdata: {},
    branch:[],
}




export const initEntityStore = (initialStore = INITIAL_ENT_STORE) => {

 let store = writable({
  ...INITIAL_ENT_STORE
})

const { subscribe, set, update } = store;
 /*
  const { subscribe, set, update } = writable({
    ...INITIAL_ENT_STORE
  })
*/
  const MyEntityStore = {
    store: store,
    subscribe,
    set,
    update,
    
    setCompany: value => update(self => {
      // ... write all your function's code here
      // self is a reference to your object
      self.company = value.slice();
      //self.company.push(value);
      return self  //!\\ this is important! Don't forget it
    }),
    setRef: value => update(self => {
      // ... write all your function's code here
      // self is a reference to your object
      self.refdata = value
      return self  //!\\ this is important! Don't forget it
    }),
    setBranch: value => update(self => {
      self.branch = value.slice();
      // self.branch =  value
      return self
    }),
    
    reset: () => set(INITIAL_ENT_STORE)

  }

  return MyEntityStore;

}