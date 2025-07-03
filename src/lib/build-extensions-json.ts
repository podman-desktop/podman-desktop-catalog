import { writeFileSync } from 'node:fs';

import { extensions } from './catalogExtensions';

const extensionsJson = JSON.stringify({ extensions });

// Catalog will be exposed to Podman Desktop users
writeFileSync('static/api/extensions.json', extensionsJson);
