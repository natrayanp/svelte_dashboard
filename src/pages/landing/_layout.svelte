<script>
import Alert from '../../common/notifications/components/alerts/Alert.svelte';
import {authStore} from '../../stores/stores';
import {isActive, url} from '@roxi/routify';
import { http } from '../../stores/services';


async function get_menu(){
    let dd = await http.post('regisdomain',{siteid:domain});
    return dd;
}


</script>



<!--
{#if $authStore.user} 
-->
    <!--slot scoped={{menus: menus}} /-->    
        <slot/>
<!--
{:else}
-->
        <p>Not loged in yet.  Loading......</p>
        <a href={$url('../login')}>Login</a>
<!--
{/if}
-->
