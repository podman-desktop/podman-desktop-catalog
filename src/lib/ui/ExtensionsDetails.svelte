<script lang="ts">
import { CloseButton } from '@podman-desktop/ui-svelte';

import type { CatalogExtensionInfo } from '$lib/api/extensions-info';
import { setCurrentExtension } from '$lib/extensions';

import ExtensionsDetailsBottom from './ExtensionsDetailsBottom.svelte';
import ExtensionsDetailsTop from './ExtensionsDetailsTop.svelte';

const { extension }: { extension: CatalogExtensionInfo | undefined } = $props();

function onclose(): void {
  setCurrentExtension(undefined);
}
</script>

<div class="flex flex-col h-full">
	<div class="flex flex-col w-full items-end">
		<CloseButton class="m-2 text-lg" on:click={onclose} />
	</div>
	<div class="flex flex-col items-center">
		{#if extension}
			<!-- first, banner with the install button-->
			<ExtensionsDetailsTop {extension} />

			<!-- then, the readme -->
			<ExtensionsDetailsBottom {extension} />
		{/if}
	</div>
</div>
