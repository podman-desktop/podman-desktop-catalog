<script lang="ts">
import { onMount } from 'svelte';

import Appearance from '$lib/Appearance.svelte';
import { catalogExtensions } from '$lib/catalogExtensions';
import ExtensionsDetails from '$lib/ui/ExtensionsDetails.svelte';
import ExtensionsList from '$lib/ui/ExtensionsList.svelte';

import type { ExtensionByCategoryInfo } from '../lib/api/extensions-info';
import { getCurrentExtension } from '../lib/extensions.svelte';

const uniqueCategories: string[] = $state([]);
const extensionsByCategories: ExtensionByCategoryInfo[] = $state([]);

onMount(async () => {
  // collect all the categories of all the extensions
  const categories = catalogExtensions.flatMap(ext => ext.categories);
  // need to remove any duplicates from this array of string
  // so we can use a Set to do this
  uniqueCategories.push(...new Set(categories));

  // for each category, compute the extensions
  for (const category of uniqueCategories) {
    // how many extensions are in this category
    const extensions = catalogExtensions.filter(ext => ext.categories.includes(category));
    // sort extensions by name
    extensions.sort((a, b) => a.extensionName.localeCompare(b.extensionName));
    const extensionsByCategory: ExtensionByCategoryInfo = { category, extensions };
    extensionsByCategories.push(extensionsByCategory);
  }
  // sort them by the number of extensions in each category
  extensionsByCategories.sort((a, b) => b.extensions.length - a.extensions.length);
});
</script>
  <Appearance />
  
  <div class="flex flex-col w-screen h-screen bg-[var(--pd-content-card-bg)]">
    {#if getCurrentExtension().value}
      <ExtensionsDetails extension={getCurrentExtension().value} />
    {:else}
      <ExtensionsList {extensionsByCategories} />
    {/if}
  </div>
  