<template>
  <div class="rounded-2xl border border-slate-200 bg-slate-900 shadow-2xl overflow-hidden">
    <!-- Window chrome -->
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
    </div>

    <pre
      class="px-5 py-4 font-mono text-[13px] leading-6 text-slate-300 overflow-x-auto"
    ><code v-html="code" /></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  code: string
  filename?: string
  language?: string
}>()
</script>
