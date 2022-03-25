<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	
	export let changeonselect = false;
	
	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>


{#if changeonselect}
	{#if $selectedPanel === panel}
		<slot></slot>
	{/if}
{:else}
	<div hidden={$selectedPanel !== panel}>
	    <slot></slot>
	</div>
{/if}


