<template>
  <span
    class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border"
    :class="colorClass"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full animate-pulse" :class="dotColor" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeColor = 'indigo' | 'emerald' | 'blue' | 'cyan' | 'amber' | 'rose' | 'slate'

const props = withDefaults(defineProps<{
  color?: BadgeColor
  dot?: boolean
}>(), {
  color: 'slate',
  dot: false,
})

const colorMap: Record<BadgeColor, string> = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
}

const dotColorMap: Record<BadgeColor, string> = {
  indigo: 'bg-indigo-500',
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  cyan: 'bg-cyan-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  slate: 'bg-slate-500',
}

const colorClass = computed(() => colorMap[props.color])
const dotColor = computed(() => dotColorMap[props.color])
</script>
