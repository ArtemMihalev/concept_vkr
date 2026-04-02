import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(path.join(__dirname, 'package.json'), 'utf-8')) as {
  name: string
}

/** Подпуть для GitHub Pages: /repo/; для user site username.github.io — корень /. */
function githubPagesBase(): string {
  if (process.env.VITE_BASE_PATH !== undefined) {
    const raw = process.env.VITE_BASE_PATH.trim()
    if (raw === '') return '/'
    const withLeading = raw.startsWith('/') ? raw : `/${raw}`
    return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
  }

  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const name = repo ?? pkg.name

  // Репозиторий вида octocat.github.io → сайт на https://octocat.github.io/
  if (name?.endsWith('.github.io')) {
    return '/'
  }

  return `/${name}/`
}

export default defineConfig(({ command }) => ({
  // В dev — корень; при сборке — подпуть Pages, иначе ассеты грузятся с / и ломаются
  base: command === 'serve' ? '/' : githubPagesBase(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
