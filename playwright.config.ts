import { defineConfig, devices } from '@playwright/test'

// La landing solo se trabaja en estas dos resoluciones.
export const RESOLUCIONES = {
  laptop: { width: 1366, height: 600 },
  desktop: { width: 1920, height: 1080 },
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
  },
  projects: Object.entries(RESOLUCIONES).map(([name, viewport]) => ({
    name,
    use: { ...devices['Desktop Chrome'], viewport },
  })),
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
})
