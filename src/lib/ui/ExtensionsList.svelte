<script lang="ts">
import type { ExtensionByCategoryInfo } from '$lib/api/extensions-info';

import ExtensionsByCategory from './ExtensionsByCategory.svelte';

const { extensionsByCategories }: { extensionsByCategories: ExtensionByCategoryInfo[] } = $props();
</script>

<div class="flex flex-col h-full">
	{#each extensionsByCategories as extensionByCategoryInfo (extensionByCategoryInfo.category)}
		<ExtensionsByCategory {extensionByCategoryInfo} />
	{/each}
</div>
