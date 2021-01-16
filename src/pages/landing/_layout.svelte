<script>
import Alert from '../../common/notifications/components/alerts/Alert.svelte';
import {authStore} from '../../stores/stores';
import {url} from '@roxi/routify';


</script>




{#if $authStore.user} 
    <!--slot scoped={{menus: menus}} /-->    
        <slot/>
{:else}

        <p>Not loged in yet.  Loading......</p>
        <a href={$url('../login')}>Login</a>

{/if}

