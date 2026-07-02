<template>
  <div class="w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 gap-14">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <div class="space-y-6">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
          <span class="w-8 h-px bg-emerald-400" />
          E-Library System
        </div>

        <h1 class="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Get Up &<br>
          <span class="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Running Fast
          </span>
        </h1>

        <p class="text-base text-slate-500 leading-relaxed max-w-lg">
          A step-by-step guide to setting up the E-Library app on Frappe 15 — from cloning
          the app inside your bench to running the backend and Vue frontend side by side.
        </p>

        <div class="flex items-center divide-x divide-slate-200 border-y border-slate-200 py-4 max-w-sm">
          <div v-for="(stat, i) in stats" :key="stat.label" class="flex flex-col px-4" :class="i === 0 ? 'pl-0' : ''">
            <span class="text-xl font-black text-slate-900">{{ stat.value }}</span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{{ stat.label }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <AppBadge v-for="tag in tags" :key="tag.label" :color="tag.color">{{ tag.label }}</AppBadge>
        </div>
      </div>

      <div class="space-y-3">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Installation Steps</p>
        <div class="relative">
          <div class="absolute left-5 top-2 bottom-2 w-px bg-slate-200" />
          <div class="space-y-3">
            <div
              v-for="(step, i) in steps"
              :key="step.title"
              class="relative flex items-start gap-4 pl-14 cursor-pointer group"
              @click="scrollTo(step.sectionId)"
            >
              <div
                class="absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-sm border transition-all duration-200 shrink-0"
                :class="step.color"
              >
                {{ i + 1 }}
              </div>
              <div
                class="flex-1 rounded-xl border px-4 py-3 transition-all duration-200"
                :class="isDesktop ? 'group-hover:border-emerald-200 group-hover:bg-emerald-50/50' : ''"
              >
                <p class="text-sm font-bold text-slate-800">{{ step.title }}</p>
                <p class="text-xs text-slate-500 mt-0.5">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="flex justify-center">
      <span class="inline-flex flex-col items-center gap-1 text-slate-300">
        <span class="text-[11px] font-medium uppercase tracking-widest">Scroll to explore</span>
        <ChevronIcon class="w-4 h-4" :class="isDesktop ? 'animate-bounce' : ''" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBadge from '@atoms/AppBadge.vue'
import ChevronIcon from '@atoms/icons/ChevronIcon.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

const { isDesktop } = useBreakpoint()

const stats = [
  { value: '3', label: 'Install Steps' },
  { value: '2', label: 'WSL Windows' },
  { value: 'Frappe 15', label: 'Framework' },
]

const tags = [
  { label: 'WSL 2', color: 'slate' as const },
  { label: 'Frappe 15', color: 'blue' as const },
  { label: 'Vue 3', color: 'indigo' as const },
  { label: 'Yarn', color: 'cyan' as const },
]

const steps = [
  {
    title: 'System Requirements',
    desc: 'Verify OS, Python, Node.js and MariaDB versions before proceeding.',
    sectionId: 'requirements',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
  },
  {
    title: 'Environment Setup',
    desc: 'Install Frappe Bench, create a new site, and configure the database.',
    sectionId: 'setup',
    color: 'bg-teal-50 border-teal-200 text-teal-600',
  },
  {
    title: 'App Configuration',
    desc: 'Install the E-Library app, run migrations, and access the dashboard.',
    sectionId: 'configuration',
    color: 'bg-cyan-50 border-cyan-200 text-cyan-600',
  },
]

function scrollTo(sectionId: string) {
  const main = document.querySelector('main')
  const target = document.getElementById(sectionId)
  if (main && target) {
    const offset = target.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop
    main.scrollTo({ top: offset, behavior: 'smooth' })
  }
}
</script>
