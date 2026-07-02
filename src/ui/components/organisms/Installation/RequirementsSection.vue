<template>
  <section id="requirements" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
        <span class="w-6 h-px bg-emerald-400" />
        Step 01
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        System <span class="text-emerald-500">Requirements</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        The E-Library app runs on <strong class="text-slate-700">Frappe 15</strong> and requires a
        Linux environment. On Windows, use <strong class="text-slate-700">WSL 2</strong> (Ubuntu 22.04
        recommended). Make sure all tools below are installed before proceeding.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div class="space-y-8">
        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Required Software</p>
          <ul class="space-y-2">
            <li v-for="req in requirements" :key="req.label" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0" :class="req.bg">
                <span class="w-1.5 h-1.5 rounded-full" :class="req.dot" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ req.label }}</span>
                <span class="text-slate-400 font-mono text-xs ml-2">{{ req.version }}</span>
                <p class="text-slate-500 mt-0.5">{{ req.desc }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Supported Environment</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="os in operatingSystems" :key="os" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
              {{ os }}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Check Commands</p>
        <div class="space-y-3">
          <div v-for="cmd in checks" :key="cmd.label" class="rounded-xl border border-slate-200 bg-slate-950 overflow-hidden">
            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800">
              <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{{ cmd.label }}</span>
              <div class="flex items-center gap-3">
                <span class="text-[11px] text-emerald-400 font-mono">{{ cmd.expected }}</span>
                <button
                  type="button"
                  class="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-all duration-150"
                  :class="copiedKey === cmd.label ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700'"
                  @click="copy(cmd.label, cmd.command)"
                >
                  <svg v-if="copiedKey !== cmd.label" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedKey === cmd.label ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>
            <div class="px-4 py-3">
              <code class="text-sm text-emerald-300 font-mono">{{ cmd.command }}</code>
            </div>
          </div>
        </div>
      </div>

    </div>

    <ScrollToNext target-id="setup" label="Environment Setup" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'

const copiedKey = ref<string | null>(null)

function copy(key: string, text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copiedKey.value = key
    setTimeout(() => { copiedKey.value = null }, 2000)
  })
}

const requirements = [
  {
    label: 'WSL 2',
    version: 'Ubuntu 22.04 LTS',
    desc: 'Required on Windows. All bench and yarn commands run inside WSL, not PowerShell.',
    bg: 'bg-slate-100 border border-slate-200',
    dot: 'bg-slate-500',
  },
  {
    label: 'Python',
    version: '≥ 3.10',
    desc: 'Required by Frappe for the backend, migrations, and scheduler tasks.',
    bg: 'bg-blue-50 border border-blue-200',
    dot: 'bg-blue-500',
  },
  {
    label: 'Node.js',
    version: '≥ 18 LTS',
    desc: 'Required by Frappe Bench and for running the Vue 3 frontend build tools.',
    bg: 'bg-emerald-50 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    label: 'Yarn',
    version: '≥ 1.22',
    desc: 'Used to install and run the Vue 3 frontend inside the app (yarn dev).',
    bg: 'bg-cyan-50 border border-cyan-200',
    dot: 'bg-cyan-500',
  },
  {
    label: 'MariaDB',
    version: '≥ 10.6',
    desc: 'Primary database for all Frappe sites. Must be running before bench start.',
    bg: 'bg-amber-50 border border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    label: 'Redis',
    version: '≥ 6.x',
    desc: 'Required for Frappe caching, real-time events, and background job queues.',
    bg: 'bg-rose-50 border border-rose-200',
    dot: 'bg-rose-500',
  },
  {
    label: 'Frappe Bench CLI',
    version: 'latest',
    desc: 'The command-line tool used to manage Frappe sites, apps, and migrations.',
    bg: 'bg-indigo-50 border border-indigo-200',
    dot: 'bg-indigo-500',
  },
]

const operatingSystems = [
  'WSL 2 (Ubuntu 22.04)',
  'Ubuntu 20.04 / 22.04',
  'Debian 11 / 12',
  'macOS (dev only)',
]

const checks = [
  { label: 'Node.js', command: 'node --version', expected: 'v18+' },
  { label: 'Yarn', command: 'yarn --version', expected: '1.22+' },
  { label: 'Bench', command: 'bench --version', expected: 'latest' },
]
</script>
