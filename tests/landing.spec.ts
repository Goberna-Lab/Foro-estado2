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

test('la foto de "¿Qué es?" hace parallax sin dejar ver el fondo por arriba', async ({ page }) => {
  const posiciones = () =>
    page.evaluate(() => ({
      seccion: document.querySelector('.que-es')!.getBoundingClientRect().top,
      foto: document.querySelector('.que-es__bg')!.getBoundingClientRect().top,
    }))
  // El scroll programa la actualización para el siguiente frame: se esperan dos
  const irA = (dy: number) =>
    page.evaluate(async (dy) => {
      const top = document.querySelector('.que-es')!.getBoundingClientRect().top + scrollY
      window.scrollTo({ top: top - innerHeight + dy, behavior: 'instant' })
      for (let i = 0; i < 2; i++) await new Promise(requestAnimationFrame)
    }, dy)

  await irA(100)
  const antes = await posiciones()

  await irA(400)
  const despues = await posiciones()

  // La foto debe recorrer bastante menos que el contenido
  const scroll = antes.seccion - despues.seccion
  expect(antes.foto - despues.foto).toBeLessThan(scroll * 0.7)
  // Mientras se ve el borde superior de la sección, la foto no queda por debajo de él
  expect(despues.foto).toBeLessThanOrEqual(despues.seccion + 0.5)
})

test('los fondos con .px-bg se mueven sin dejar ver sus bordes', async ({ page }) => {
  const fondos = page.locator('.px-bg')
  expect(await fondos.count()).toBeGreaterThan(0)

  for (const fondo of await fondos.all()) {
    const medir = () =>
      fondo.evaluate((el) => {
        // El recorte lo hace el primer ancestro con overflow hidden
        let clip = el.parentElement!
        while (getComputedStyle(clip).overflow !== 'hidden') clip = clip.parentElement!
        const b = el.getBoundingClientRect()
        const c = clip.getBoundingClientRect()
        return { top: b.top - c.top, bottom: c.bottom - b.bottom, y: b.top }
      })
    const pasos = []
    for (const avance of [0.1, 0.5, 0.9]) {
      await fondo.evaluate(async (el, avance) => {
        const s = el.closest('section')!.getBoundingClientRect()
        window.scrollTo({ top: scrollY + s.top - innerHeight + (innerHeight + s.height) * avance, behavior: 'instant' })
        for (let i = 0; i < 2; i++) await new Promise(requestAnimationFrame)
      }, avance)
      pasos.push(await medir())
    }
    const clase = await fondo.evaluate((el) => el.closest('section')!.className)
    for (const p of pasos) {
      expect(p.top, clase).toBeLessThanOrEqual(1)
      expect(p.bottom, clase).toBeLessThanOrEqual(1)
    }
    // Relativo a su recorte, el fondo baja mientras la página sube
    expect(pasos[2].top - pasos[0].top, clase).toBeGreaterThan(0)
  }
})

test('con movimiento reducido los fondos quedan quietos', async ({ browser }) => {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  await abrir(page)
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'instant' }))
  const transforms = await page.$$eval('.px-bg, .px-lento', (els) => els.map((el) => getComputedStyle(el).transform))
  expect(transforms.every((t) => t === 'none')).toBe(true)
  await page.close()
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
