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

import { catalogExtensions } from '$lib/extensions';

import catalogOfExtensions from '../../static/api/extensions.json';
import Page from './+page.svelte';

const fetchMock = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  catalogExtensions.length = 0;
  window.fetch = fetchMock;
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
});

test('check fetch', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ extensions: catalogOfExtensions.extensions }),
  });
  render(Page);

  expect(vi.mocked(fetch)).toHaveBeenCalledWith('https://registry.podman-desktop.io/api/extensions.json');

  // at least 4 categories should be displayed
  await vi.waitFor(() => expect(screen.getAllByRole('region', { name: 'Category name' }).length).toBeGreaterThan(4));
});
