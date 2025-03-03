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

import { fireEvent, render, screen } from '@testing-library/svelte';
import { beforeEach, expect, test, vi } from 'vitest';

import type { CatalogExtensionInfo } from '$lib/api/extensions-info';
import { getCurrentExtension } from '$lib/extensions';

import ExtensionByCategoryCard from './ExtensionByCategoryCard.svelte';

beforeEach(() => {
  vi.resetAllMocks();
});

test('check content', async () => {
  const version = {
    version: '1.0.0',
    files: [
      {
        assetType: 'icon',
        data: 'http://fake-podman-desktop/my.icon.png',
      },
    ],
  };
  const extension: CatalogExtensionInfo = {
    id: 'dummy1',
    displayName: 'My Display Name',
    shortDescription: 'My Description',
    versions: [version],
  } as unknown as CatalogExtensionInfo;

  render(ExtensionByCategoryCard, { extension });

  // check icon is there
  const icon = screen.getByRole('img', { hidden: true });
  expect(icon).toBeInTheDocument();

  // check display name is there
  const displayName = screen.getByText('My Display Name');
  expect(displayName).toBeInTheDocument();

  // check description is there
  const description = screen.getByText('My Description');
  expect(description).toBeInTheDocument();

  // check latest version is there
  const latestVersion = screen.getByText('v1.0.0');
  expect(latestVersion).toBeInTheDocument();

  // check click on the card
  // no current version
  expect(getCurrentExtension().value).toBeUndefined();
  const card = screen.getByRole('button');
  expect(card).toBeInTheDocument();
  await fireEvent.click(card);

  //check the click
  expect(getCurrentExtension().value).toEqual(extension);
});

test('check version with v prefix', async () => {
  const version = {
    version: 'v2.0.0',
    files: [
      {
        assetType: 'icon',
        data: 'http://fake-podman-desktop/my.icon.png',
      },
    ],
  };
  const extension: CatalogExtensionInfo = {
    id: 'dummy1',
    displayName: 'My Display Name',
    shortDescription: 'My Description',
    versions: [version],
  } as unknown as CatalogExtensionInfo;

  render(ExtensionByCategoryCard, { extension });

  // check we don't add another v prefix
  const latestVersion = screen.getByText('v2.0.0');
  expect(latestVersion).toBeInTheDocument();
});
