<template>
  <div class="space-y-4">
    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">How It Works</p>
    <div class="relative space-y-3 pl-4 border-l-2" :class="borderColor">
      <div
        v-for="(step, i) in steps"
        :key="step.title"
        class="relative bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 transition-all duration-200"
        :class="isDesktop ? hoverClass : ''"
      >
        <span
          class="absolute -left-[1.65rem] top-4 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center"
          :class="dotColor"
        >
          {{ i + 1 }}
        </span>
        <p class="text-sm font-bold text-slate-800">{{ step.title }}</p>
        <p class="text-xs text-slate-500 mt-1 leading-relaxed">{{ step.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBreakpoint } from '@composables/useBreakpoint'

type StepColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' | 'cyan' | 'slate'

export interface Step {
  title: string
  desc: string
}

const props = withDefaults(
  defineProps<{
    steps: Step[]
    color?: StepColor
  }>(),
  {
    color: 'indigo',
  },
)

const { isDesktop } = useBreakpoint()

const borderColorMap: Record<StepColor, string> = {
  indigo: 'border-indigo-100',
  emerald: 'border-emerald-100',
  amber: 'border-amber-100',
  rose: 'border-rose-100',
  blue: 'border-blue-100',
  cyan: 'border-cyan-100',
  slate: 'border-slate-200',
}

const dotColorMap: Record<StepColor, string> = {
  indigo: 'bg-indigo-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  blue: 'bg-blue-500',
  cyan: 'bg-cyan-500',
  slate: 'bg-slate-500',
}

const hoverColorMap: Record<StepColor, string> = {
  indigo: 'hover:border-indigo-200 hover:shadow-md',
  emerald: 'hover:border-emerald-200 hover:shadow-md',
  amber: 'hover:border-amber-200 hover:shadow-md',
  rose: 'hover:border-rose-200 hover:shadow-md',
  blue: 'hover:border-blue-200 hover:shadow-md',
  cyan: 'hover:border-cyan-200 hover:shadow-md',
  slate: 'hover:border-slate-300 hover:shadow-md',
}

const borderColor = computed(() => borderColorMap[props.color])
const dotColor = computed(() => dotColorMap[props.color])
const hoverClass = computed(() => hoverColorMap[props.color])
</script>
