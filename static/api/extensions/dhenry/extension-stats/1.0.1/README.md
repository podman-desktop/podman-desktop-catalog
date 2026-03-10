# Podman Desktop Stats Plugin

A Podman Desktop extension that provides real-time container and host system statistics monitoring.

## Features

- **Per-Container Metrics**: CPU usage, memory consumption, network I/O, block I/O, and process counts
- **Host System Overview**: CPU usage, memory utilization, core count, and uptime
- **Real-Time Updates**: Configurable refresh interval (1-60 seconds)
- **Clean Dashboard UI**: Built with Svelte 5 and Tailwind CSS
- **Zero Configuration**: Works out of the box with Podman 4.x and 5.x

## Installation

### Method 1: Local Folder (Recommended for Development)

This is the easiest method for local development and testing.

1. **Enable Development Mode** in Podman Desktop:
   - Open **Preferences/Settings**
   - Enable **Development Mode** (or **Developer Mode**)

2. **Build the extension**:
   ```bash
   git clone https://github.com/djhenry/extension-stats.git
   cd extension-stats
   npm install
   npm run build
   ```

3. **Add to Podman Desktop**:
   - Go to **Extensions**
   - Click **"Add local folder extension"**
   - Select the folder: `packages/backend`
   - The extension should load immediately

See [INSTALL-SIMPLE.md](INSTALL-SIMPLE.md) for detailed instructions.

### Method 2: OCI Image (Recommended for Users)

Install directly from the published OCI image:

1. Open Podman Desktop
2. Go to **Extensions** → **Install custom...**
3. Enter:
   ```
   ghcr.io/djhenry/extension-stats:latest
   ```
4. Click **Install**

See [INSTALLATION.md](INSTALLATION.md) for advanced installation methods

## Development

### Prerequisites

- Node.js 20+
- npm 10+
- Podman Desktop 1.0+

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format

# Build all packages
npm run build

# Watch mode (auto-rebuild)
npm run watch
```

### Project Structure

```
extension-stats/
├── packages/
│   ├── shared/          # Shared types and utilities
│   ├── backend/         # Extension backend (Node.js)
│   └── frontend/        # Dashboard UI (Svelte 5)
├── docs/                # Architecture and development specs
└── .github/workflows/   # CI/CD pipeline
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run backend tests only
npx vitest run packages/backend packages/shared

# Run frontend tests only
cd packages/frontend && npm test
```

## Architecture

This extension follows hexagonal architecture with clear separation of concerns:

- **Adapters**: Port/adapter pattern for Podman Desktop API and Node.js OS module
- **Collectors**: Stats collection for containers and host system
- **Orchestration**: Stats manager with configurable polling
- **RPC Bridge**: Backend-to-frontend communication via postMessage
- **Frontend**: Reactive Svelte stores and components

For detailed architecture information, see [docs/ARCHITECTURE-1_0_0.md](docs/ARCHITECTURE-1_0_0.md).

## Configuration

Configure the refresh interval in Podman Desktop settings:

1. Go to **Settings** → **Extensions** → **Container Stats**
2. Set **Refresh Interval** (1-60 seconds, default: 3s)
3. Changes apply immediately

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

- All code changes require tests (TDD approach)
- Coverage target: > 80% global
- Follow TypeScript strict mode
- Use conventional commits
- Ensure `npm run lint` passes
- Ensure `npm test` passes

## License

Apache-2.0 License - see [LICENSE](LICENSE) file for details

## Support

- **Issues**: https://github.com/djhenry/extension-stats/issues
- **Discussions**: https://github.com/djhenry/extension-stats/discussions
- **Podman Desktop Docs**: https://podman-desktop.io/docs

## Acknowledgments

Built with:
- [Podman Desktop Extension API](https://podman-desktop.io/docs/extensions)
- [Svelte 5](https://svelte.dev/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [TypeScript](https://www.typescriptlang.org/)
