import { expect, test, type Page } from '@playwright/test'

const DISENO = 1920

async function abrir(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
}

test.beforeEach(async ({ page }) => {
  await abrir(page)
})

test('escala el diseño al ancho de la ventana sin scroll horizontal', async ({ page }) => {
  const { zoom, ancho, scrollAncho } = await page.evaluate(() => ({
    zoom: Number(getComputedStyle(document.documentElement).getPropertyValue('--zoom')),
    ancho: document.documentElement.clientWidth,
    scrollAncho: document.documentElement.scrollWidth,
  }))

  expect(zoom).toBeCloseTo(ancho / DISENO, 3)
  expect(scrollAncho).toBeLessThanOrEqual(ancho)
})

test('el hero muestra el título y el subtítulo dentro de la primera pantalla', async ({ page }) => {
  const viewport = page.viewportSize()!
  // Espera a que termine la animación de entrada de los textos
  await page.evaluate(() =>
    Promise.all([...document.querySelectorAll('.hero__reveal')].flatMap((el) => el.getAnimations().map((a) => a.finished))),
  )
  for (const selector of ['.hero__title', '.hero__subtitle', '.hero__note']) {
    const box = (await page.locator(selector).boundingBox())!
    expect(box.y + box.height, selector).toBeLessThanOrEqual(viewport.height)
  }
})

test('el header queda fijo y los enlaces llevan a cada sección', async ({ page }) => {
  const header = page.locator('.header')
  const nav = page.getByRole('navigation', { name: 'Principal' })

  for (const [link, id] of [
    ['Visión', 'vision'],
    ['Modelo', 'modelo'],
    ['Licencia', 'licencia'],
    ['Inversión', 'inversion'],
  ]) {
    await nav.getByRole('link', { name: link }).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))

    const headerBox = (await header.boundingBox())!
    await expect
      .poll(async () => Math.round((await page.locator(`#${id}`).boundingBox())!.y))
      .toBe(Math.round(headerBox.height))
    expect(headerBox.y).toBe(0)
  }
})

test('el slider de fases cambia con las flechas y las pestañas', async ({ page }) => {
  const fase = page.locator('.metodo__phase')
  await page.locator('#modelo').scrollIntoViewIfNeeded()

  await expect(fase).toHaveText('Diagnóstico')
  await page.getByRole('button', { name: 'Fase siguiente' }).click()
  await expect(fase).toHaveText('Convocatoria')
  await page.getByRole('button', { name: 'Fase anterior' }).click()
  await page.getByRole('button', { name: 'Fase anterior' }).click()
  await expect(fase).toHaveText('Compromisos')
  await page.getByRole('button', { name: /Deliberación/ }).click()
  await expect(fase).toHaveText('Deliberación')
})

test('el acordeón abre un punto a la vez', async ({ page }) => {
  const items = page.locator('.escalable__list button')
  await expect(items.nth(0)).toHaveAttribute('aria-expanded', 'true')

  await items.nth(2).click()
  await expect(items.nth(2)).toHaveAttribute('aria-expanded', 'true')
  await expect(items.nth(0)).toHaveAttribute('aria-expanded', 'false')
})

test('todas las imágenes cargan', async ({ page }) => {
  // Recorre la página (el slider cambia de foto solo, así que se revisa todo junto al final)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 50))
    }
  })
  await expect
    .poll(() => page.evaluate(() => [...document.images].filter((img) => !img.complete || !img.naturalWidth).length))
    .toBe(0)
})

test('el botón de WhatsApp queda en la base y no tapa el footer', async ({ page }) => {
  const boton = page.locator('.whatsapp')
  const viewport = page.viewportSize()!

  const arriba = (await boton.boundingBox())!
  expect(viewport.height - (arriba.y + arriba.height)).toBeLessThanOrEqual(40)

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
  const footer = (await page.locator('footer').boundingBox())!
  await expect
    .poll(async () => {
      const b = (await boton.boundingBox())!
      return b.y + b.height <= footer.y
    })
    .toBe(true)
})

test('el fondo de "¿Qué es el Foro?" tiene parallax de ±25px sin mostrar bordes', async ({ page }) => {
  const medir = async (posicion: 'entrando' | 'centro' | 'saliendo') => {
    await page.evaluate((pos) => {
      const s = document.querySelector('.que-es')!
      const top = s.getBoundingClientRect().top + window.scrollY
      const vh = window.innerHeight
      const h = s.getBoundingClientRect().height
      const y = { entrando: top - vh + 1, centro: top + h / 2 - vh / 2, saliendo: top + h - 1 }[pos]
      window.scrollTo({ top: y, behavior: 'instant' })
    }, posicion)
    await page.waitForTimeout(100)
    return page.evaluate(() => {
      const capa = document.querySelector<HTMLElement>('.que-es__bg')!
      const seccion = document.querySelector('.que-es')!.getBoundingClientRect()
      return {
        y: new DOMMatrix(getComputedStyle(capa).transform).m42,
        sinBorde: capa.getBoundingClientRect().top <= seccion.top + 0.5,
      }
    })
  }

  const entrando = await medir('entrando')
  const centro = await medir('centro')
  const saliendo = await medir('saliendo')

  expect(entrando.y).toBeCloseTo(-25, 0)
  expect(Math.abs(centro.y)).toBeLessThan(3)
  expect(saliendo.y).toBeCloseTo(25, 0)
  expect([entrando, centro, saliendo].every((m) => m.sinBorde)).toBe(true)
})
