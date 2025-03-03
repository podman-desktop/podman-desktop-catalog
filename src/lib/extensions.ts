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

import type {
  CatalogExtensionInfo,
  CatalogExtensionVersionFileInfo,
  CatalogExtensionVersionInfo,
} from './api/extensions-info';

const REGISTRY_URL = 'https://registry.podman-desktop.io/api/extensions.json';

// a list of all extensions in the catalog
export const catalogExtensions: CatalogExtensionInfo[] = $state([]);

// the current extension that is being viewed for details
// undefined means no extension is being viewed
let currentExtension: CatalogExtensionInfo | undefined = $state(undefined);

export function getCurrentExtension(): { value: CatalogExtensionInfo | undefined } {
  return {
    get value(): CatalogExtensionInfo | undefined {
      return currentExtension;
    },
  };
}

export function setCurrentExtension(extension: CatalogExtensionInfo | undefined): void {
  currentExtension = extension;
}

export async function initCatalog(): Promise<void> {
  // grab JSON from the registry
  const response = await fetch(REGISTRY_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch extensions from ${REGISTRY_URL}`);
  }
  // parse the JSON
  let data: unknown;
  try {
    data = await response.json();
  } catch (error: unknown) {
    throw new Error(`Failed to parse JSON from ${REGISTRY_URL}: ${String(error)}`);
  }
  const extensions: CatalogExtensionInfo[] = [];
  if (typeof data === 'object' && data && 'extensions' in data) {
    const rawExtensions = data.extensions;

    if (Array.isArray(rawExtensions)) {
      for (const rawExtension of rawExtensions) {
        if (typeof rawExtension === 'object' && rawExtension) {
          const versions: CatalogExtensionVersionInfo[] = [];
          if (Array.isArray(rawExtension.versions)) {
            for (const rawVersion of rawExtension.versions) {
              if (typeof rawVersion === 'object' && rawVersion) {
                const files: CatalogExtensionVersionFileInfo[] = [];
                if (Array.isArray(rawVersion.files)) {
                  for (const rawFile of rawVersion.files) {
                    if (typeof rawFile === 'object' && rawFile) {
                      files.push({
                        assetType: String(rawFile.assetType) as 'icon' | 'LICENSE' | 'README',
                        data: String(rawFile.data),
                      });
                    }
                  }
                }
                const version: CatalogExtensionVersionInfo = {
                  version: String(rawVersion.version),
                  podmanDesktopVersion: String(rawVersion.podmanDesktopVersion),
                  ociUri: String(rawVersion.ociUri),
                  preview: Boolean(rawVersion.preview),
                  lastUpdated: new Date(String(rawVersion.lastUpdated)),
                  files,
                };
                versions.push(version);
              }
            }
          }

          const extension: CatalogExtensionInfo = {
            id: `${rawExtension.publisher?.publisherName}.${rawExtension.extensionName}`,
            publisherName: String(rawExtension.publisher?.publisherName),
            publisherDisplayName: String(rawExtension.publisher?.displayName),
            keywords: Array.isArray(rawExtension.keywords) ? rawExtension.keywords.map(String) : [],
            unlisted: Boolean(rawExtension.unlisted),
            shortDescription: String(rawExtension.shortDescription),
            displayName: String(rawExtension.displayName),
            extensionName: String(rawExtension.extensionName),
            categories: Array.isArray(rawExtension.categories) ? rawExtension.categories.map(String) : [],
            versions,
          };
          extensions.push(extension);
        }
      }
    }
  }

  // update the catalog
  catalogExtensions.length = 0;
  catalogExtensions.push(...extensions);
}
