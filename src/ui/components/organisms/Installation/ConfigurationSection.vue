<template>
  <section id="configuration" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500">
        <span class="w-6 h-px bg-cyan-400" />
        Step 03
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        App <span class="text-cyan-500">Configuration</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        After installing the app, configure roles, penalty rules, and SMTP settings
        inside Frappe — then verify the frontend is wired up correctly.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div class="space-y-3">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Scripts</p>

        <div class="rounded-2xl border border-slate-200 overflow-hidden">
          <div class="flex items-center gap-2.5 px-5 py-3 bg-slate-900 border-b border-slate-700">
            <div class="flex gap-1.5">
              <span class="w-3 h-3 rounded-full bg-rose-400" />
              <span class="w-3 h-3 rounded-full bg-amber-400" />
              <span class="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span class="text-xs font-semibold text-slate-400 ml-2">WSL — elibrary</span>
            <span class="ml-auto text-[10px] font-bold uppercase tracking-widest text-cyan-400">Available Scripts</span>
          </div>

          <div class="bg-slate-950 px-5 py-5 space-y-4">
            <div v-for="(script, i) in scripts" :key="script.cmd" class="space-y-1.5">
              <div class="flex items-center justify-between">
                <p class="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  {{ i + 1 }} · {{ script.label }}
                </p>
                <button
                  type="button"
                  class="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-all duration-150"
                  :class="copiedKey === script.cmd ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700'"
                  @click="copy(script.cmd)"
                >
                  <svg v-if="copiedKey !== script.cmd" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedKey === script.cmd ? 'Copied!' : 'Copy' }}
                </button>
              </div>
              <div class="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3">
                <div class="flex items-start gap-2">
                  <span class="text-slate-600 select-none font-mono text-sm mt-px">$</span>
                  <code class="text-sm font-mono text-emerald-300">{{ script.cmd }}</code>
                </div>
              </div>
              <p class="text-xs text-slate-500 leading-relaxed pl-1">{{ script.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Dev Tooling Included</p>
          <ul class="space-y-2">
            <li v-for="tool in tools" :key="tool.label" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0" :class="tool.bg">
                <span class="w-1.5 h-1.5 rounded-full" :class="tool.dot" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ tool.label }}</span>
                <span class="text-slate-500"> — {{ tool.desc }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4 space-y-2">
          <p class="text-xs font-bold text-indigo-700 uppercase tracking-widest">Production Build</p>
          <p class="text-sm text-indigo-700 leading-relaxed">
            Run <code class="font-mono bg-indigo-100 px-1 rounded">yarn build</code> to generate
            a static bundle in the <code class="font-mono bg-indigo-100 px-1 rounded">dist/</code> folder.
            Deploy it to any static host — Vercel, Netlify, or GitHub Pages.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copiedKey = ref<string | null>(null)

function copy(cmd: string) {
  navigator.clipboard.writeText(cmd).then(() => {
    copiedKey.value = cmd
    setTimeout(() => { copiedKey.value = null }, 2000)
  })
}

const scripts = [
  { cmd: 'yarn dev', label: 'Dev Server', desc: 'Start Vite at localhost:5173 with HMR.' },
  { cmd: 'yarn build', label: 'Production Build', desc: 'Type-check then bundle into dist/.' },
  { cmd: 'yarn lint', label: 'Lint', desc: 'Run oxlint + ESLint with auto-fix.' },
]

const tools = [
  { label: 'ESLint + oxlint', desc: 'Dual linter setup for fast feedback and Vue-specific rules.', bg: 'bg-indigo-50 border border-indigo-200', dot: 'bg-indigo-500' },
  { label: 'Prettier', desc: 'Opinionated code formatter configured via .prettierrc.json.', bg: 'bg-rose-50 border border-rose-200', dot: 'bg-rose-500' },
  { label: 'vue-tsc', desc: 'TypeScript compiler for type-checking Vue SFCs before builds.', bg: 'bg-blue-50 border border-blue-200', dot: 'bg-blue-500' },
  { label: 'Vue Devtools', desc: 'Vite plugin that injects Vue Devtools in dev mode only.', bg: 'bg-emerald-50 border border-emerald-200', dot: 'bg-emerald-500' },
  { label: 'Tailwind CSS v3', desc: 'Utility-first CSS framework; configured via tailwind.config.js.', bg: 'bg-cyan-50 border border-cyan-200', dot: 'bg-cyan-500' },
]
</script>
