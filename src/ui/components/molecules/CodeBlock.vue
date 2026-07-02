<template>
  <div class="rounded-2xl border border-slate-200 bg-slate-900 shadow-2xl overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/60">
      <span class="w-2.5 h-2.5 rounded-full bg-rose-400" />
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400" />
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      <span v-if="filename" class="ml-3 text-xs font-mono text-slate-400">{{ filename }}</span>
      <span
        v-if="language"
        class="ml-auto text-[10px] font-mono uppercase tracking-widest text-slate-500"
      >
        {{ language }}
      </span>
      <button
        type="button"
        :class="[
          language ? 'ml-3' : 'ml-auto',
          'flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-semibold transition-all duration-150',
          copied
            ? 'text-emerald-400 bg-emerald-400/10'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700',
        ]"
        @click="copy"
      >
        <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <pre
      class="px-5 py-4 font-mono text-[13px] leading-6 text-slate-300 overflow-x-auto"
    ><code v-html="code" /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  filename?: string
  language?: string
  copyText?: string
}>()

const copied = ref(false)

function copy() {
  const text = props.copyText ?? props.code.replace(/<[^>]*>/g, '')
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>
