<script>
    import {isActive, url} from '@roxi/routify';
    import {authStore} from '../../stores/stores';
    import { http } from '../../stores/services';

    async function get_modules(){
        let dd = await http.post('getmenus',{});
        console.log(dd);
        return dd;
    }

</script>


<p>inside landing</p>


{#await get_modules()}
    <p>Loading menu......</p>
{:then menus}
    <a href={$url('./POS')}>POS</a>
    <a href={$url('./SETTINGS')}>SETTINGS</a>
{/await}