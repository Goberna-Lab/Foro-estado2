import { test } from '@playwright/test'

// Genera capturas de página completa por resolución en ./capturas para revisión visual.
// Uso: npm run capturas
test('captura de página completa @capturas', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)

  // Recorre la página para que carguen todas las imágenes
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 50))
    }
    window.scrollTo(0, 0)
  })

  await page.screenshot({ path: `capturas/${testInfo.project.name}.png`, fullPage: true })
})
