<template>
  <div class="w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
    <span class="text-3xl">🖼️</span>
    <p class="text-sm font-semibold text-slate-500">{{ label ?? 'Screenshot coming soon' }}</p>
    <p v-if="caption" class="text-xs text-slate-400 max-w-xs leading-relaxed">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  caption?: string
}>()
</script>
