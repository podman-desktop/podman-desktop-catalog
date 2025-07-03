<script lang="ts">
import type { ExtensionByCategoryInfo } from '../api/extensions-info';
import ExtensionByCategoryCard from './ExtensionByCategoryCard.svelte';

const { extensionByCategoryInfo }: { extensionByCategoryInfo: ExtensionByCategoryInfo } = $props();
</script>

<div class="text-[var(--pd-card-text)] m-4 pb-2">
	<!-- category name-->
	<div role="region" aria-label="Category name">{extensionByCategoryInfo.category}</div>

	<!-- card of eaach extension -->
	<div
		class="mt-2 grid min-[920px]:grid-cols-2 min-[1180px]:grid-cols-3 gap-3"
		role="region"
		aria-label="Extensions of category {extensionByCategoryInfo.category}"
	>
		{#each extensionByCategoryInfo.extensions as extension}
			<ExtensionByCategoryCard {extension} />
		{/each}
	</div>
</div>
