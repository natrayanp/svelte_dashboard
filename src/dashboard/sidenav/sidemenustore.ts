import { readable, writable } from "svelte/store";

export let sidemenuStore;

const initStore = (menus) => {

    let initialStore = {
        ...menus,
        selected: -1,
        postohiglight: -1,
    }

    let updateStore = JSON.parse(JSON.stringify(initialStore));

    let setm;

    function selectionUpdate(index) {  
        updateStore.selected = index;
        //calcHighlighPosition(index);
        setm({...updateStore});               
    }

    /*
    function openmenuupdate(index) {
        updateStore[index].open = !updateStore[index].open;
        setm({...updateStore});  
    }

    function calcHighlighPosition(itemindex) {        
        let myd = itemindex.split("_").map(Number);
        console.log(myd);
        console.log(typeof(myd[0]));
        console.log(updateStore);

        let mytot = 0;

            for (let i=0;i < myd[0];i++) {
                if (updateStore[i].link === false) {
                    if (updateStore[i].open) {
                        console.log(updateStore[i]);
                        mytot = mytot + updateStore[i].sub.length + 1;
                    } else {
                        mytot = mytot ;
                    }     
                } else {
                    mytot = mytot;
                }
            }            
            mytot = mytot + myd[1] + 1;

        //if(mytot === 0) mytot = -1;
        console.log(mytot);
        updateStore.postohiglight = mytot;
    }

*/

    const { subscribe } = readable(initialStore, (set) => {
        setm = set;               
    });

    
    return {
        subscribe,
        selectionUpdate,    
      //  openmenuupdate
    };
}


export const initSideMenuStore = (menus) {
    sidemenuStore = initStore(menus);
    return sidemenuStore;
}