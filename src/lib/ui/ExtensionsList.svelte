<script lang="ts">
import type { ExtensionByCategoryInfo, CatalogExtensionInfo } from '$lib/api/extensions-info';
import ExtensionsByCategory from './ExtensionsByCategory.svelte';
import ExtensionByCategoryCard from './ExtensionByCategoryCard.svelte';

export let extensionsByCategories: ExtensionByCategoryInfo[];

let filteredExtensions: CatalogExtensionInfo[] = [];
let showCategories = true;

// Get the query from the URL
function getQueryLimit(): number | null {
  const query = new URLSearchParams(window.location.search).get('query');
  return query ? parseInt(query, 10) : null;
}

// Sort extensions based upon the last updated date based upon what's in .versions array
function getSortedExtensions(extensions: CatalogExtensionInfo[]): CatalogExtensionInfo[] {
  return extensions.sort((a, b) => {
    const aLastUpdated = a.versions?.[a.versions.length - 1]?.lastUpdated ?? 0;
    const bLastUpdated = b.versions?.[b.versions.length - 1]?.lastUpdated ?? 0;
    return Number(bLastUpdated) - Number(aLastUpdated);
  });
}

$: {
  const limit = getQueryLimit();
  showCategories = !limit;

  if (limit) {
    const allExtensions = extensionsByCategories.flatMap(({ extensions }) => extensions);
    filteredExtensions = getSortedExtensions(allExtensions).slice(0, limit);
  }
}
</script>

<div class="flex flex-col h-full">
	{#if showCategories}
		{#each extensionsByCategories as extensionByCategoryInfo}
			<ExtensionsByCategory {extensionByCategoryInfo} />
		{/each}
	{:else}
		<div
		class="mt-2 grid min-[920px]:grid-cols-2 min-[1180px]:grid-cols-3 gap-3"
		role="region"
		aria-label="Queried extensions"
		>
			{#each filteredExtensions as extension}
				<ExtensionByCategoryCard {extension} />
			{/each}
		</div>
	{/if}
</div>
