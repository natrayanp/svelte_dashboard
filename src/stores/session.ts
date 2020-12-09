import { writable } from "svelte/store";

const INITIAL_STORE = {
    token: null    
};

export const createSessionStore = (initialStore = INITIAL_STORE) => {

    const { subscribe, set } = writable(new Map());

    const coo = 1;
/*    const fetchSession = async () => {
        // loading.set(true);

        try {
            otherStores.loading && otherStores.loading.set(true);
            const response = await fetch("MY_API_ENDPOINT/auth/token", {
                method: "POST",
            });

            if (!response.ok) {
                const err = new Error("Network response was not ok.");

                otherStores.error && otherStores.error.set(err);
                otherStores.loading && otherStores.loading.set(false);
                return;
            }

            const data = await response.json();

            set(data.token);
        } catch (err) {
          otherStores.error && otherStores.error.set(err);
          otherStores.loading && otherStores.loading.set(false);
        }
    };*/

    const reset = () => {
        set(new Map());
    };

    let otherStores = new Map();
    const setOtherStores = (storename,stores) => {
        if (otherStores.has(storename)) {otherStores.delete(storename)};                   
        otherStores.set(storename,stores);
        console.log(otherStores);
        console.log(this);
        //console.log(st);
        set(otherStores);
        return;
    };

    let ms = () => {return otherStores};


    return {
        subscribe,
        //fetchSession,
        reset,
        setOtherStores,
        ms        
    };
}; 