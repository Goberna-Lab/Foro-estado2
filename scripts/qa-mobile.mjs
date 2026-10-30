// QA automático del mobile: hace build, sirve dist/ y recorre la landing en
// varios anchos de teléfono y tablet. Sale con error si encuentra algo.
//   npm run qa:mobile
import { spawn, execSync } from 'node:child_process'
import fs from 'node:fs'
import { chromium } from '@playwright/test'

const ANCHOS = [320, 360, 375, 390, 430, 768, 820, 1023]
const ALTO = 844
const PUERTO = 4319
const URL = `http://127.0.0.1:${PUERTO}/`
const SHOTS = 'qa-shots'

execSync('npm run build', { stdio: 'inherit' })
const server = spawn('npx', ['vite', 'preview', '--port', String(PUERTO), '--strictPort', '--host', '127.0.0.1'], {
  stdio: 'ignore',
})
for (let i = 0; ; i++) {
  try {
    await fetch(URL)
    break
  } catch {
    if (i > 50) throw new Error('vite preview no arrancó')
    await new Promise((r) => setTimeout(r, 200))
  }
}

fs.mkdirSync(SHOTS, { recursive: true })
const browser = await chromium.launch()
const problemas = []
const fallo = (ancho, msg) => problemas.push(`[${ancho}px] ${msg}`)

async function abrir(ancho, reducedMotion = 'no-preference') {
  const page = await browser.newPage({
    viewport: { width: ancho, height: ALTO },
    isMobile: true,
    hasTouch: true,
    reducedMotion,
  })
  const consola = []
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && consola.push(m.text()))
  page.on('pageerror', (e) => consola.push(e.message))
  await page.goto(URL)
  await page.evaluate(() => document.fonts.ready)
  // Recorre la página para cargar imágenes y disparar los revelados
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 60))
    }
  })
  await page.waitForTimeout(1600)
  return { page, consola }
}

// Auditoría del DOM de .m-app
function auditar() {
  const vw = document.documentElement.clientWidth
  const out = []
  const nombre = (el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${(el.textContent || '').trim().slice(0, 30)}"`
  if (!document.querySelector('.m-app')) return ['no se montó la app mobile']
  if (document.documentElement.scrollWidth > vw) out.push(`scroll horizontal (${document.documentElement.scrollWidth} > ${vw})`)

  const visible = (el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !el.closest('[hidden], [aria-hidden="true"]')
  }
  // ¿Lo recorta algún ancestro con overflow (p. ej. el carrusel o un marco de foto)?
  const recortado = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      if (getComputedStyle(a).overflowX !== 'visible') return true
    }
    return false
  }

  for (const el of document.querySelectorAll('.m-app *')) {
    if (!visible(el) || el.closest('svg')) continue
    const r = el.getBoundingClientRect()
    if ((r.left < -1 || r.right > vw + 1) && !recortado(el)) out.push(`fuera de pantalla: ${nombre(el)} (${Math.round(r.left)}→${Math.round(r.right)})`)

    const textoPropio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (textoPropio) {
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs < 11) out.push(`texto de ${fs}px: ${nombre(el)}`)
      if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'visible') out.push(`texto cortado: ${nombre(el)}`)
    }
  }

  for (const el of document.querySelectorAll('.m-app :is(a, button)')) {
    if (!visible(el)) continue
    const r = el.getBoundingClientRect()
    if (r.width < 44 || r.height < 44) out.push(`área táctil ${Math.round(r.width)}×${Math.round(r.height)}: ${nombre(el)}`)
  }

  // Los títulos en franjas no deben salirse de la columna
  for (const el of document.querySelectorAll('.m-title__line')) {
    if (el.scrollWidth > el.clientWidth + 1) out.push(`franja de título desbordada: ${nombre(el)}`)
  }

  for (const el of document.querySelectorAll('[data-reveal], [data-stagger] > *')) {
    const cs = getComputedStyle(el)
    if (Number(cs.opacity) < 0.99 || cs.visibility === 'hidden') out.push(`quedó invisible: ${nombre(el)}`)
  }
  for (const el of document.querySelectorAll('[data-count]')) {
    if (el.textContent.trim() !== el.dataset.count) out.push(`contador en ${el.textContent} (debía llegar a ${el.dataset.count})`)
  }
  return out
}

for (const ancho of ANCHOS) {
  for (const motion of ['no-preference', 'reduce']) {
    const { page, consola } = await abrir(ancho, motion)
    const etiqueta = motion === 'reduce' ? `${ancho}, movimiento reducido` : ancho
    for (const p of await page.evaluate(auditar)) fallo(etiqueta, p)
    for (const c of consola) fallo(etiqueta, `consola: ${c}`)
    if (motion === 'reduce') {
      const movidos = await page.$$eval('[data-parallax], [data-lento], [data-hundir]', (els) =>
        els.filter((el) => getComputedStyle(el).transform !== 'none').length,
      )
      if (movidos) fallo(etiqueta, `${movidos} capas con parallax se movieron`)
    } else {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.waitForTimeout(300)
      await page.screenshot({ path: `${SHOTS}/${ancho}.png`, fullPage: true })
    }
    await page.close()
  }
}

// Interacciones (en un teléfono típico)
{
  const ancho = 390
  const { page } = await abrir(ancho)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  const toggle = page.locator('.m-header__toggle')

  await toggle.click()
  const abierto = await page.evaluate(() => ({
    overflow: document.documentElement.style.overflow,
    inert: document.querySelector('.m-page').inert,
    foco: !!document.activeElement?.closest('#m-menu'),
  }))
  if (abierto.overflow !== 'hidden') fallo(ancho, 'el menú no bloquea el scroll')
  if (!abierto.inert) fallo(ancho, 'con el menú abierto el fondo no queda inert')
  if (!abierto.foco) fallo(ancho, 'el foco no entra al menú')
  for (let i = 0; i < 8; i++) await page.keyboard.press('Tab')
  if (!(await page.evaluate(() => !!document.activeElement?.closest('#m-menu')))) fallo(ancho, 'el foco se escapa del menú')
  await page.keyboard.press('Escape')
  if (await page.locator('#m-menu').isVisible()) fallo(ancho, 'Escape no cierra el menú')
  if (!(await toggle.evaluate((el) => el === document.activeElement))) fallo(ancho, 'el foco no vuelve al botón del menú')

  // Anclas desde el menú: la sección queda justo bajo la cabecera
  for (const id of ['vision', 'modelo', 'licencia', 'inversion']) {
    await toggle.click()
    await page.locator(`#m-menu a[href="#${id}"]`).click()
    await page.waitForTimeout(1400)
    const { top, header } = await page.evaluate((id) => ({
      top: document.getElementById(id).getBoundingClientRect().top,
      header: document.querySelector('.m-header').getBoundingClientRect().height,
    }), id)
    if (Math.abs(top - header) > 2) fallo(ancho, `#${id} queda en ${Math.round(top)}px (cabecera ${header}px)`)
  }

  // Carrusel de fases
  // (el autoplay puede haber avanzado mientras se recorría la página)
  await page.locator('#modelo').scrollIntoViewIfNeeded()
  const fase = async () => Number(await page.locator('.m-metodo__count strong').textContent())
  await page.getByRole('button', { name: 'Fase anterior' }).click()
  await page.waitForTimeout(900)
  const antes = await fase()
  await page.getByRole('button', { name: 'Fase siguiente' }).click()
  await page.waitForTimeout(900)
  if ((await fase()) !== antes + 1) fallo(ancho, `la flecha no avanza el carrusel (${antes} → ${await fase()})`)

  // WhatsApp: oculto sobre el pie
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
  await page.waitForTimeout(600)
  if (!(await page.locator('.m-whatsapp').evaluate((el) => el.classList.contains('is-hidden')))) fallo(ancho, 'el WhatsApp tapa el pie')
  await page.close()
}

await browser.close()
server.kill()

if (problemas.length) {
  console.error(`\n${problemas.length} problemas:\n` + problemas.join('\n'))
  process.exit(1)
}
console.log(`\nQA mobile OK en ${ANCHOS.join(', ')}px (capturas en ${SHOTS}/)`)
