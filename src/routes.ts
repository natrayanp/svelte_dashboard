import {wrap} from 'svelte-spa-router/wrap';

// Components: only Home, Loading and NotFound are statically included in the bundle
import Router from 'svelte-spa-router'


import Home from "./home/Home.svelte";
import Dash from './dashboard/Dash.svelte';
import Test from './test/Test.svelte';
import { onMount } from "svelte";
//import { session } from './stores/stores';
import Notifications from './common/notifications';
import NotFound from './routes/notfound/NotFound.svelte';
import Loading from './routes/Loading.svelte';



// Export the route definition object
export default {
    // Exact path
    '/': Home,
    '/login': wrap({
        // Note that this is a function that returns the import
        asyncComponent: () => import('./login/Login.svelte'),
        // Show the loading component while the component is being downloaded
        loadingComponent: Loading,
        // Pass values for the `params` prop of the loading component
        loadingParams: {
            message: 'Loading the Name route…'
        }
    }),   
    '/login/*': wrap({
        // Note that this is a function that returns the import
        asyncComponent: () => import('./login/Login.svelte'),
        // Show the loading component while the component is being downloaded
        loadingComponent: Loading,
        // Pass values for the `params` prop of the loading component
        loadingParams: {
            message: 'Loading the Name route…'
        }
    }),   
/*
    // Wildcard parameter
    // This matches `/wild/*` (with anything after), but NOT `/wild` (with nothing after)
    // This is dynamically imported too
    '/wild/*': wrap({
        // Note that this is a function that returns the import
        // We're adding an artificial delay of 5 seconds so you can experience the loading even on localhost
        // Note that normally the modules loaded with `import()` are cached, so the delay exists only on the first request.
        // In this case, we're adding a delay every time the component is loaded
        asyncComponent: () => import('./routes/Wild.svelte')
            .then((component) => {
                return new Promise((resolve) => {
                    // Wait 5 seconds before returning
                    setTimeout(() => resolve(component), 5000)
                })
            }),
        // Show the loading component while the component is being downloaded
        loadingComponent: Loading,
        // Pass values for the `params` prop of the loading component
        loadingParams: {
            message: 'Loading the Wild route…'
        }
    }),
*/
    // Catch-all, must be last
    '*': NotFound,
}