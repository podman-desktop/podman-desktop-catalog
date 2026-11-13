<script lang="ts">
import { Button } from '@podman-desktop/ui-svelte';

import type { CatalogExtensionInfo } from '#lib/api/extensions-info.js';

import ExtensionIcon from './ExtensionIcon.svelte';

const { extension }: { extension: CatalogExtensionInfo } = $props();

function install(): void {
  window.open(`podman-desktop:extension/${extension.id}`);
}
</script>

<div class="flex flex-row items-center justify-between text-[var(--pd-card-text)] w-2/3">
	<div class="flex flex-row items-center">
		<ExtensionIcon {extension} size="xl" />
		<div class="pl-4">
			<div class="text-xl">{extension.displayName}</div>
			<div class="">{extension.shortDescription}</div>
		</div>
	</div>
	<div>
		<Button on:click={install}>Install</Button>
	</div>
</div>
