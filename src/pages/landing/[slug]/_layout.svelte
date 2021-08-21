<script>
    import Dash from '../../../dashboard/Dash.svelte';
    import { params } from '@roxi/routify'
    import { metatags } from '@roxi/routify';
    metatags.title = 'My Routify app';
    metatags.description = 'Description coming soon...';
    import {authStore} from '../../../stores/stores';
    

</script>

<!-- routify:options bundle=true -->

{$params.slug}

<Dash menus={$authStore.selectedpack.submenu} >    
    <slot/>
</Dash>
