<template>
  <section id="setup" class="scroll-mt-14 flex flex-col justify-start pt-12 space-y-12 pb-16">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-500">
        <span class="w-6 h-px bg-teal-400" />
        Step 02
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Environment <span class="text-teal-500">Setup</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Running the E-Library app requires <strong class="text-slate-700">two WSL windows open simultaneously</strong> —
        one running the Frappe backend (<code class="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">bench start</code>)
        and a second running the Vue frontend
        (<code class="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">yarn dev</code>).
      </p>
    </div>

    <!-- Mode tabs -->
    <div class="flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150"
        :class="activeTab === tab.id
          ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- First Time Setup -->
    <div v-if="activeTab === 'first-time'" class="space-y-6">
      <div class="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3">
        <p class="text-sm text-blue-700">
          <strong>First time only.</strong> Clone the app, run migrations, then start the server.
          After this you won't need to clone again.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- Window 1 - First Time -->
        <TerminalWindow
          title="WSL — Window 1"
          badge="Frappe Backend"
          badge-color="teal"
          status-text="bench start running…"
          status-color="emerald"
          :blocks="firstTimeW1"
          cmd-color="emerald"
          prefix="ft-w1"
          :copied-key="copiedKey"
          @copy="copy"
        />

        <!-- Window 2 - First Time -->
        <TerminalWindow
          title="WSL — Window 2"
          badge="Vue Frontend"
          badge-color="violet"
          status-text="yarn dev running…"
          status-color="violet"
          :blocks="firstTimeW2"
          cmd-color="violet"
          prefix="ft-w2"
          :copied-key="copiedKey"
          @copy="copy"
        />
      </div>
    </div>

    <!-- Daily Use -->
    <div v-else class="space-y-6">
      <div class="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
        <p class="text-sm text-emerald-700">
          <strong>Daily use.</strong> The app is already cloned. Just navigate into the bench and start both servers.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- Window 1 - Daily -->
        <TerminalWindow
          title="WSL — Window 1"
          badge="Frappe Backend"
          badge-color="teal"
          status-text="bench start running…"
          status-color="emerald"
          :blocks="dailyW1"
          cmd-color="emerald"
          prefix="d-w1"
          :copied-key="copiedKey"
          @copy="copy"
        />

        <!-- Window 2 - Daily -->
        <TerminalWindow
          title="WSL — Window 2"
          badge="Vue Frontend"
          badge-color="violet"
          status-text="yarn dev running…"
          status-color="violet"
          :blocks="dailyW2"
          cmd-color="violet"
          prefix="d-w2"
          :copied-key="copiedKey"
          @copy="copy"
        />
      </div>
    </div>

    <!-- Order callout -->
    <div class="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-2">
      <p class="text-xs font-bold text-amber-700 uppercase tracking-widest">Important — Run in Order</p>
      <p class="text-sm text-amber-700 leading-relaxed">
        Always start <strong>Window 1</strong> first and wait for
        <code class="font-mono bg-amber-100 px-1 rounded">bench start</code> to be fully running
        before opening Window 2. The Vue dev server proxies API calls to the Frappe backend.
      </p>
    </div>

    <ScrollToNext target-id="configuration" label="App Configuration" />
  </section>
</template>

<script setup lang="ts">
import { ref, h, defineComponent } from 'vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'

const activeTab = ref<'first-time' | 'daily'>('first-time')

const tabs = [
  { id: 'first-time' as const, label: '🚀 First Time Setup' },
  { id: 'daily' as const, label: '⚡ Daily Use' },
]

const copiedKey = ref<string | null>(null)

function copy(key: string, text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copiedKey.value = key
    setTimeout(() => { copiedKey.value = null }, 2000)
  })
}

// ── First Time ──────────────────────────────────────────
const firstTimeW1 = [
  {
    label: '1 · Navigate into the bench',
    cmds: ['cd frappe-bench/'],
    note: 'All bench commands must be run from inside the frappe-bench directory.',
  },
  {
    label: '2 · Clone the E-Library app',
    cmds: ['bench get-app git@github.com:wela-team/wela-elibrary-v15.git'],
    note: 'Clones the app into frappe-bench/apps/wela_elibrary/. Only needed once.',
  },
  {
    label: '3 · Run migrations',
    cmds: ['bench migrate'],
    note: 'Applies all pending database migrations for the newly installed app.',
  },
  {
    label: '4 · Start the Frappe server',
    cmds: ['bench start'],
    note: 'Starts the web server, workers, and scheduler. Keep this window open.',
  },
]

const firstTimeW2 = [
  {
    label: '1 · Navigate to the frontend',
    cmds: ['cd frappe-bench/apps/wela_elibrary/elibrary'],
    note: 'This is the Vue 3 frontend directory inside the cloned app.',
  },
  {
    label: '2 · Install frontend dependencies',
    cmds: ['yarn'],
    note: 'Installs all Node.js packages. Only needed once after cloning.',
  },
  {
    label: '3 · Start the Vue dev server',
    cmds: ['yarn dev'],
    note: 'Starts Vite with HMR. Keep this window open alongside bench start.',
  },
]

// ── Daily Use ────────────────────────────────────────────
const dailyW1 = [
  {
    label: '1 · Navigate into the bench',
    cmds: ['cd frappe-bench/'],
    note: 'All bench commands must be run from inside the frappe-bench directory.',
  },
  {
    label: '2 · Start the Frappe server',
    cmds: ['bench start'],
    note: 'Starts the web server, workers, and scheduler. Keep this window open.',
  },
]

const dailyW2 = [
  {
    label: '1 · Navigate to the frontend',
    cmds: ['cd frappe-bench/apps/wela_elibrary/elibrary'],
    note: 'Navigate to the Vue 3 frontend directory.',
  },
  {
    label: '2 · Start the Vue dev server',
    cmds: ['yarn dev'],
    note: 'Starts Vite with HMR. Keep this window open alongside bench start.',
  },
]

// ── Inline terminal window component ────────────────────
const badgeColorMap: Record<string, string> = {
  teal: 'text-teal-400',
  violet: 'text-violet-400',
}
const statusColorMap: Record<string, string> = {
  emerald: 'text-emerald-400',
  violet: 'text-violet-400',
}
const statusDotMap: Record<string, string> = {
  emerald: 'bg-emerald-400',
  violet: 'bg-violet-400',
}
const cmdColorMap: Record<string, string> = {
  emerald: 'text-emerald-300',
  violet: 'text-violet-300',
}
const copiedColorMap: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-400/10',
  violet: 'text-violet-400 bg-violet-400/10',
}

interface Block { label: string; cmds: string[]; note?: string }

const TerminalWindow = defineComponent({
  props: {
    title: String,
    badge: String,
    badgeColor: { type: String, default: 'teal' },
    statusText: String,
    statusColor: { type: String, default: 'emerald' },
    blocks: { type: Array as () => Block[], default: () => [] },
    cmdColor: { type: String, default: 'emerald' },
    prefix: String,
    copiedKey: { type: String as () => string | null, default: null },
  },
  emits: ['copy'],
  setup(props, { emit }) {
    return () => h('div', { class: 'rounded-2xl border border-slate-200 overflow-hidden' }, [
      // Title bar
      h('div', { class: 'flex items-center gap-2.5 px-5 py-3 bg-slate-900 border-b border-slate-700' }, [
        h('div', { class: 'flex gap-1.5' }, [
          h('span', { class: 'w-3 h-3 rounded-full bg-rose-400' }),
          h('span', { class: 'w-3 h-3 rounded-full bg-amber-400' }),
          h('span', { class: 'w-3 h-3 rounded-full bg-emerald-400' }),
        ]),
        h('span', { class: 'text-xs font-semibold text-slate-400 ml-2' }, props.title),
        h('span', { class: `ml-auto text-[10px] font-bold uppercase tracking-widest ${badgeColorMap[props.badgeColor]}` }, props.badge),
      ]),
      // Blocks
      h('div', { class: 'bg-slate-950 px-5 py-5 space-y-4' },
        props.blocks.map((block, i) => {
          const key = `${props.prefix}-${i}`
          const isCopied = props.copiedKey === key
          const copiedCls = isCopied
            ? copiedColorMap[props.cmdColor]
            : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700'

          return h('div', { key: i, class: 'space-y-1.5' }, [
            h('div', { class: 'flex items-center justify-between' }, [
              h('p', { class: 'text-[11px] font-bold uppercase tracking-widest text-slate-500' }, block.label),
              h('button', {
                type: 'button',
                class: `flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-all duration-150 ${copiedCls}`,
                onClick: () => emit('copy', key, block.cmds.join('\n')),
              }, [
                !isCopied
                  ? h('svg', { class: 'w-3 h-3', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
                      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' }),
                    ])
                  : h('svg', { class: 'w-3 h-3', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2.5' }, [
                      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M5 13l4 4L19 7' }),
                    ]),
                isCopied ? 'Copied!' : 'Copy',
              ]),
            ]),
            h('div', { class: 'rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 space-y-1' },
              block.cmds.map(cmd =>
                h('div', { key: cmd, class: 'flex items-start gap-2' }, [
                  h('span', { class: 'text-slate-600 select-none font-mono text-sm mt-px' }, '$'),
                  h('code', { class: `text-sm font-mono break-all ${cmdColorMap[props.cmdColor]}` }, cmd),
                ])
              )
            ),
            block.note
              ? h('p', { class: 'text-xs text-slate-500 leading-relaxed pl-1' }, block.note)
              : null,
          ])
        })
      ),
      // Status bar
      h('div', { class: 'px-5 py-3 bg-slate-900 border-t border-slate-700 flex items-center gap-2' }, [
        h('span', { class: `w-2 h-2 rounded-full animate-pulse ${statusDotMap[props.statusColor]}` }),
        h('span', { class: `text-xs font-medium ${statusColorMap[props.statusColor]}` }, props.statusText),
      ]),
    ])
  },
})
</script>
