<script lang="ts">
import { micromark } from 'micromark';
import { directive } from 'micromark-extension-directive';

let html: string | undefined = $state(undefined);

// content to use in the markdown
const { markdown }: { markdown: string } = $props();

$effect(() => {
  const tempHtml = micromark(markdown, {
    extensions: [directive()],
    htmlExtensions: [],
  });

  if (!tempHtml) {
    return;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(tempHtml, 'text/html');
  const links = doc.querySelectorAll('a');
  for (const link of links) {
    const currentHref = link.getAttribute('href');
    // remove and replace href attribute if matching
    if (currentHref?.startsWith('#')) {
      // get current value of href
      link.removeAttribute('href');

      // remove from current href the #
      const withoutHashHRef = currentHref.substring(1);

      // add an attribute to handle onclick
      link.setAttribute('data-pd-jump-in-page', withoutHashHRef);

      // add a class for cursor
      link.classList.add('cursor-pointer');
    }
  }

  // for all h1/h2/h3/h4/h5/h6, add an id attribute being the name of the attibute all in lowercase without spaces (replaced by -)
  const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  for (const header of headers) {
    const headerText = header.textContent;
    const headerId = headerText?.toLowerCase().replace(/\s/g, '-');
    if (headerId) {
      header.setAttribute('id', headerId);
    }
  }

  html = doc.body.innerHTML;
});
</script>

<section class="markdown" aria-label="markdown-content">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</section>

<!-- The markdown rendered has it's own style that you'll have to customize / check against podman desktop
UI guidelines -->
<style lang="postcss">
  @reference "tailwindcss";

	.markdown > :global(p) {
		line-height: normal;
		padding-bottom: 8px;
		margin-bottom: 8px;
	}

	.markdown > :global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5) {
		font-size: revert;
		line-height: normal;
		font-weight: revert;
		border-bottom: 1px solid #444;
		margin-bottom: 20px;
	}

	.markdown > :global(ul) {
		line-height: normal;
		list-style: revert;
		margin: revert;
		padding: revert;
	}

	.markdown > :global(b),
	:global(strong) {
		font-weight: 600;
	}
	.markdown > :global(blockquote) {
		opacity: 0.8;
		line-height: normal;
	}
	.markdown :global(a) {
		color: theme(colors.purple.500);
		text-decoration: none;
	}
	.markdown :global(a):hover {
		color: theme(colors.purple.400);
		text-decoration: underline;
	}
</style>
