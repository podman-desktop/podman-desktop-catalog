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

import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/svelte';
import { beforeEach, expect, test, vi } from 'vitest';

import type { CatalogExtensionInfo, ExtensionByCategoryInfo } from '$lib/api/extensions-info';

import ExtensionsList from './ExtensionsList.svelte';

beforeEach(() => {
  vi.resetAllMocks();
});

test('check categories', async () => {
  const extensionsByCategories: ExtensionByCategoryInfo[] = [
    {
      category: 'category1',
      extensions: [{ id: 'dummy1' } as unknown as CatalogExtensionInfo],
    },
    {
      category: 'category2',
      extensions: [{ id: 'dummy2' } as unknown as CatalogExtensionInfo],
    },
  ];

  render(ExtensionsList, { extensionsByCategories });

  const category1 = screen.getByText('category1');
  expect(category1).toBeInTheDocument();

  const category2 = screen.getByText('category2');
  expect(category2).toBeInTheDocument();
});

test('if per_page is passed into window.location.search then it should be used to filter extensions', async () => {
  // Mock query to be last 1
  vi.spyOn(window, 'location', 'get').mockReturnValue({
    search: '?per_page=1',
  } as unknown as Location);

  const extensionsByCategories: ExtensionByCategoryInfo[] = [
    {
      category: 'category1',
      extensions: [
        {
          displayName: 'dummy1',
          versions: [
            {
              version: '1.0.0',
              // Todays date minus 1 day, to make sure it is NOT the most recent one (we want to show dummy2)
              lastUpdated: new Date(new Date().setDate(new Date().getDate() - 1)),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
      ],
    },
    {
      category: 'category2',
      extensions: [
        {
          displayName: 'dummy2',
          versions: [
            {
              version: '1.0.0',
              lastUpdated: new Date(),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
      ],
    },
  ];

  render(ExtensionsList, { extensionsByCategories });

  // Make sure that displayname dummy2 is shown, as it is the "most" up to date one.
  const dummy2 = screen.getByText('dummy2');
  expect(dummy2).toBeInTheDocument();

  // Dummy1 should NOT be shown
  const dummy1 = screen.queryByText('dummy1');
  expect(dummy1).not.toBeInTheDocument();

  // Categories category1 and category2 should be NOT shown
  const category1 = screen.queryByText('category1');
  expect(category1).not.toBeInTheDocument();

  const category2 = screen.queryByText('category2');
  expect(category2).not.toBeInTheDocument();
});

test('if per_page is passed in with 4, it should show last 4 extensions even if there is 5 in the list', async () => {
  // Mock query to be last 4
  vi.spyOn(window, 'location', 'get').mockReturnValue({
    search: '?per_page=4',
  } as unknown as Location);

  const extensionsByCategories: ExtensionByCategoryInfo[] = [
    {
      category: 'category1',
      extensions: [
        {
          displayName: 'dummy1',
          versions: [
            {
              version: '1.0.0',
              lastUpdated: new Date(new Date().setDate(new Date().getDate() - 1)),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
        {
          displayName: 'dummy2',
          versions: [
            {
              version: '1.0.0',
              lastUpdated: new Date(new Date().setDate(new Date().getDate() - 2)),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
        {
          displayName: 'dummy3',
          versions: [
            {
              version: '1.0.0',
              lastUpdated: new Date(new Date().setDate(new Date().getDate() - 3)),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
        {
          displayName: 'dummy4',
          versions: [
            {
              version: '1.0.0',
              lastUpdated: new Date(new Date().setDate(new Date().getDate() - 4)),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
        {
          displayName: 'dummy5',
          versions: [
            {
              version: '1.0.0',
              lastUpdated: new Date(new Date().setDate(new Date().getDate() - 5)),
              files: [],
            },
          ],
        } as unknown as CatalogExtensionInfo,
      ],
    },
  ];

  render(ExtensionsList, { extensionsByCategories });

  // Make sure that displayname dummy4 is shown, as it is the "most" up to date one.
  const dummy4 = screen.getByText('dummy4');
  expect(dummy4).toBeInTheDocument();

  // Dummy5 should NOT be shown, as it's the "oldest" one.
  const dummy5 = screen.queryByText('dummy5');
  expect(dummy5).not.toBeInTheDocument();

  // Categories category1 should be NOT shown
  const category1 = screen.queryByText('category1');
  expect(category1).not.toBeInTheDocument();
});
