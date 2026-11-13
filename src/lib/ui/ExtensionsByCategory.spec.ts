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

import type { CatalogExtensionInfo, ExtensionByCategoryInfo } from '#lib/api/extensions-info.js';

import ExtensionsByCategory from './ExtensionsByCategory.svelte';

beforeEach(() => {
  vi.resetAllMocks();
  window.open = vi.fn();
});

test('check content', async () => {
  const extensionByCategoryInfo: ExtensionByCategoryInfo = {
    category: 'category1',
    extensions: [{ id: 'dummy1', displayName: 'My Display Name' } as unknown as CatalogExtensionInfo],
  };
  render(ExtensionsByCategory, { extensionByCategoryInfo });
  // check region
  const region = screen.getByRole('region', { name: 'Category name' });
  expect(region).toBeInTheDocument();

  // check block of extensions
  const regionExtensions = screen.getByRole('region', { name: 'Extensions of category category1' });
  expect(regionExtensions).toBeInTheDocument();

  // check extension dummy1 is there
  const extensionDummy1 = screen.getByText('My Display Name');
  expect(extensionDummy1).toBeInTheDocument();
});
