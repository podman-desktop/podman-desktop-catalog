/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import { beforeEach, describe, expect, test, vi } from 'vitest';

import catalogOfExtensions from '../../static/api/extensions.json';
import type { CatalogExtensionInfo } from './api/extensions-info';
import { catalogExtensions, getCurrentExtension, initCatalog, setCurrentExtension } from './extensions.svelte';

const fetchMock = vi.fn();

// same rule as the targetPlatforms of the Podman Desktop extension manifest schema
const TARGET_PLATFORM_PATTERN = /^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*$/;

describe('check catalog', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    catalogExtensions.length = 0;
    window.fetch = fetchMock;
  });

  test('check fetch', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ extensions: catalogOfExtensions.extensions }),
    });
    await initCatalog();

    expect(vi.mocked(fetch)).toHaveBeenCalledWith('https://registry.podman-desktop.io/api/extensions.json');

    // check we have extensions in the catalog
    expect(catalogExtensions.length).toBeGreaterThan(0);
  });

  test('check targetPlatforms', () => {
    const invalid: string[] = [];
    for (const extension of catalogOfExtensions.extensions) {
      const targetPlatforms = (extension as { targetPlatforms?: unknown }).targetPlatforms;
      if (targetPlatforms === undefined) {
        continue;
      }
      if (!Array.isArray(targetPlatforms) || targetPlatforms.length === 0) {
        invalid.push(`${extension.extensionName}: targetPlatforms must be a non-empty list`);
        continue;
      }
      for (const targetPlatform of targetPlatforms) {
        if (typeof targetPlatform !== 'string' || !TARGET_PLATFORM_PATTERN.test(targetPlatform)) {
          invalid.push(`${extension.extensionName}: invalid targetPlatform ${JSON.stringify(targetPlatform)}`);
        }
      }
    }

    expect(invalid).toEqual([]);
  });

  test('reads targetPlatforms', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        extensions: [
          {
            publisher: { publisherName: 'podman-desktop' },
            extensionName: 'apple-container',
            targetPlatforms: ['darwin/arm64'],
            versions: [],
          },
          {
            publisher: { publisherName: 'podman-desktop' },
            extensionName: 'kind',
            versions: [],
          },
        ],
      }),
    });
    await initCatalog();

    expect(catalogExtensions[0]?.targetPlatforms).toEqual(['darwin/arm64']);
    expect(catalogExtensions[1]).not.toHaveProperty('targetPlatforms');
  });
});

test('check current extension', () => {
  const currentExtension = getCurrentExtension();
  expect(currentExtension.value).toBeUndefined();
  setCurrentExtension({ id: 'dummy' } as unknown as CatalogExtensionInfo);

  // check again the value
  expect(currentExtension.value).toEqual({ id: 'dummy' });

  // unset
  setCurrentExtension(undefined);
  expect(currentExtension.value).toBeUndefined();
});
