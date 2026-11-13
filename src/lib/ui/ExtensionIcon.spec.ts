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

import type { CatalogExtensionInfo } from '#lib/api/extensions-info.js';

import ExtensionIcon from './ExtensionIcon.svelte';

beforeEach(() => {
  vi.resetAllMocks();
});

test('check icon', async () => {
  const version = {
    files: [
      {
        assetType: 'icon',
        data: 'http://fake-podman-desktop/my.icon.png',
      },
    ],
  };
  const extension: CatalogExtensionInfo = { id: 'dummy1', versions: [version] } as unknown as CatalogExtensionInfo;

  render(ExtensionIcon, { extension });

  const icon = screen.getByRole('img', { hidden: true });
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('src', 'http://fake-podman-desktop/my.icon.png');
  expect(icon).toHaveClass('w-8');
  expect(icon).toHaveClass('h-8');
});

test('check large size', async () => {
  const version = {
    files: [
      {
        assetType: 'icon',
        data: 'http://fake-podman-desktop/my.icon.png',
      },
    ],
  };
  const extension: CatalogExtensionInfo = { id: 'dummy1', versions: [version] } as unknown as CatalogExtensionInfo;

  render(ExtensionIcon, { extension, size: 'xl' });

  const icon = screen.getByRole('img', { hidden: true });
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('src', 'http://fake-podman-desktop/my.icon.png');
  expect(icon).toHaveClass('w-20');
  expect(icon).toHaveClass('h-20');
});
