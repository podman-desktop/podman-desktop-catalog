<script lang="ts">
import type { CatalogExtensionInfo } from '../api/extensions-info';
import { setCurrentExtension } from '../extensions';
import ExtensionIcon from './ExtensionIcon.svelte';

const { extension }: { extension: CatalogExtensionInfo } = $props();

const latestVersion = $derived.by(() => {
  const version = extension.versions?.[0]?.version ?? '';
  // add a "v" in front of the version number if it's not there
  return version.startsWith('v') ? version : `v${version}`;
});

function hideDetails(): void {
  setCurrentExtension(extension);
}
</script>

<button
	onclick={hideDetails}
	class="rounded-lg border border-[var(--pd-invert-content-bg)] flex flex-row grow bg-[var(--pd-invert-content-card-bg)] hover:bg-[var(--pd-content-card-selected-bg)] hover:border-[var(--pd-content-card-border-selected)] min-h-20 max-h-20 p-2"
>
	<div class="w-12 h-full items-center justify-center flex flex-row">
		<ExtensionIcon {extension} />
	</div>
	<div class="flex flex-col text-left h-full justify-center pl-1">
		<div>
			{extension.displayName}
		</div>
		<div class="font-thin text-sm">
			{extension.shortDescription}
		</div>
	</div>
	<div class="flex flex-col h-full grow items-end justify-end">
		<div class="text-sm font-thin">
			{latestVersion}
		</div>
	</div>
</button>
