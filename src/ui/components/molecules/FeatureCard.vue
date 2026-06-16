<template>
  <div
    class="group relative rounded-2xl border border-indigo-100/70 bg-white p-4 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    :class="sectionId ? 'cursor-pointer' : ''"
    @click="scrollToSection"
  >
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
      :class="gradientClass"
    />

    <div class="relative z-10">
      <div
        class="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-lg"
        :class="iconBg"
      >
        {{ icon }}
      </div>
      <h3 class="text-sm font-bold text-slate-800 mb-1">{{ title }}</h3>
      <p class="text-xs text-slate-500 leading-relaxed">{{ description }}</p>

      <span v-if="sectionId" class="inline-flex items-center gap-1 mt-2 text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
        Learn more
        <ChevronIcon class="w-3 h-3 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronIcon from '@atoms/icons/ChevronIcon.vue'

type CardColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' | 'cyan' | 'slate'

const props = withDefaults(defineProps<{
  icon: string
  title: string
  description: string
  color?: CardColor
  sectionId?: string
}>(), {
  color: 'indigo',
  sectionId: '',
})

const bgMap: Record<CardColor, string> = {
  indigo: 'bg-indigo-50',
  emerald: 'bg-emerald-50',
  amber: 'bg-amber-50',
  rose: 'bg-rose-50',
  blue: 'bg-blue-50',
  cyan: 'bg-cyan-50',
  slate: 'bg-slate-50',
}

const gradientMap: Record<CardColor, string> = {
  indigo: 'bg-gradient-to-br from-indigo-50/60 to-transparent',
  emerald: 'bg-gradient-to-br from-emerald-50/60 to-transparent',
  amber: 'bg-gradient-to-br from-amber-50/60 to-transparent',
  rose: 'bg-gradient-to-br from-rose-50/60 to-transparent',
  blue: 'bg-gradient-to-br from-blue-50/60 to-transparent',
  cyan: 'bg-gradient-to-br from-cyan-50/60 to-transparent',
  slate: 'bg-gradient-to-br from-slate-50/60 to-transparent',
}

const iconBg = bgMap[props.color]
const gradientClass = gradientMap[props.color]

function scrollToSection() {
  if (!props.sectionId) return
  const el = document.getElementById(props.sectionId)
  const main = document.querySelector('main')
  if (!el || !main) return
  const mainTop = main.getBoundingClientRect().top
  main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top - mainTop, behavior: 'smooth' })
}
</script>
