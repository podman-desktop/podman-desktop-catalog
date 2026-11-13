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

import ExtensionsDetailsBottom from './ExtensionsDetailsBottom.svelte';

const fetchMock = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  window.fetch = fetchMock;
});

test('check content', async () => {
  const version = {
    version: '1.0.0',
    files: [
      {
        assetType: 'README',
        data: 'http://fake-podman-desktop/my.readme',
      },
    ],
  };
  const extension: CatalogExtensionInfo = {
    id: 'dummy1',
    displayName: 'My Display Name',
    shortDescription: 'My Description',
    versions: [version],
  } as unknown as CatalogExtensionInfo;

  // mock readme
  fetchMock.mockResolvedValue({
    ok: true,
    text: async () => '## hello world',
  });

  render(ExtensionsDetailsBottom, { extension });

  // check readme is there
  await vi.waitFor(() => expect(screen.getByText('hello world')).toBeInTheDocument());

  // should be formatted as h2
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('hello world');

  // check the click
  expect(fetchMock).toHaveBeenCalledWith('http://fake-podman-desktop/my.readme');
});
