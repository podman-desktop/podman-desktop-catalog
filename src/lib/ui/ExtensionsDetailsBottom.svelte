<script lang="ts">
import moment from 'moment';

import type { CatalogExtensionInfo, CatalogExtensionVersionInfo } from '$lib/api/extensions-info';
import Markdown from '$lib/Markdown.svelte';

const { extension }: { extension: CatalogExtensionInfo } = $props();

// hide preview versions
const versions: CatalogExtensionVersionInfo[] = $derived(extension.versions?.filter(v => v.preview === false));

let readmeContent: string | undefined = $state(undefined);

$effect(() => {
  const fetchReadme = async (): Promise<void> => {
    const readmeUrl = extension.versions?.[0]?.files.find(file => file.assetType === 'README')?.data;
    if (!readmeUrl) {
      return;
    }
    const response = await fetch(readmeUrl);
    const data = await response.text();
    readmeContent = data;
  };

  fetchReadme().catch((e: unknown) => {
    console.error(e);
  });
});
</script>

<div class="w-full min-h-full overflow-y-visible leading-6 text-[var(--pd-details-body-text)] p-4">
	<div class="bg-[var(--pd-invert-content-card-bg)] p-4 rounded-sm">
		{#if readmeContent}
			<Markdown markdown={readmeContent} />
		{:else}
			<div>Loading...</div>
		{/if}
	</div>

	<!-- List all versions -->
	<div class="flex flex-col items-center mt-4 bg-[var(--pd-invert-content-card-bg)] rounded-sm">
		<!-- table with 2 columns, version, date of the release-->
		<table class="table-fixed">
			<thead>
				<tr class="uppercase">
					<th>Version</th>
					<th>Released</th>
				</tr>
				{#each versions as version (version.version)}
					<tr>
						<td>{version.version}</td>
						<td>{moment(version.lastUpdated).format('YYYY-MM-DD')}</td>
					</tr>
				{/each}
			</thead>
		</table>
	</div>
</div>
