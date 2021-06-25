<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);

    let selected = "px-4 py-2 font-semibold  rounded-t text-black -mb-px border-b-4 border-blue-800 focus:outline-none";
    let unselected = "px-4 py-2 font-semibold text-gray-800 rounded-t  opacity-50 focus:outline-none";


</script>

<style>

</style>

<button class ="{$selectedTab === tab ? selected : unselected}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>