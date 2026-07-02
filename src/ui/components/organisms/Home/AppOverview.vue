<template>
  <div class="w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-10 space-y-12">

    <div class="space-y-4 max-w-3xl">
      <AppBadge color="indigo" dot class="uppercase tracking-wide font-semibold">
        Documentation
      </AppBadge>

      <h1 class="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
        Elibrary <span class="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">App</span>
      </h1>

      <p class="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
        A web-based library management system with QR-based transactions, approval workflows,
        penalties, and inventory control — powered by
        <span class="font-semibold text-slate-700">Vue 3</span> and
        <span class="font-semibold text-slate-700">Frappe 15</span>.
      </p>

      <div class="flex items-center gap-2 flex-wrap pt-1">
        <AppBadge v-for="tag in stack" :key="tag.label" :color="tag.color">
          {{ tag.label }}
        </AppBadge>
      </div>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
          <span class="text-2xl font-black text-slate-900">{{ stat.value }}</span>
          <span class="text-xs font-medium text-slate-400 uppercase tracking-wide">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div>
      <div class="flex items-center gap-3 mb-4">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Explore Modules</span>
        <span class="h-px flex-1 bg-slate-200" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="card in cards"
          :key="card.title"
          class="group relative rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 overflow-hidden cursor-pointer"
          :class="[
            card.borderColor,
            isDesktop ? 'hover:shadow-lg hover:-translate-y-1' : '',
            isDesktop ? card.hoverBorder : '',
          ]"
          @click="scrollTo(card.sectionId)"
        >
          <div
            class="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl pointer-events-none"
            :class="[card.gradient, isDesktop ? 'group-hover:opacity-100' : '']"
          />

          <div class="relative z-10">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-lg"
              :class="card.iconBg"
            >
              {{ card.icon }}
            </div>
            <h3 class="text-sm font-bold text-slate-800 mb-1">{{ card.title }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ card.description }}</p>

            <span
              class="inline-flex items-center gap-1 mt-2 text-xs font-medium text-slate-400 transition-colors"
              :class="isDesktop ? 'group-hover:text-slate-600' : ''"
            >
              Learn more
              <ChevronIcon
                class="w-3 h-3 -rotate-90 transition-transform"
                :class="isDesktop ? 'group-hover:translate-x-0.5' : ''"
              />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center pt-2">
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

function scrollTo(sectionId: string) {
  if (!sectionId) return
  const el = document.getElementById(sectionId)
  const main = document.querySelector('main')
  if (!el || !main) return
  const mainTop = main.getBoundingClientRect().top
  main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top - mainTop, behavior: 'smooth' })
}

const stack = [
  { label: 'Vue 3', color: 'emerald' },
  { label: 'Frappe 15', color: 'blue' },
  { label: 'TypeScript', color: 'indigo' },
  { label: 'Tailwind CSS', color: 'cyan' },
] as const

const stats = [
  { value: '4', label: 'Core Modules' },
  { value: 'QR', label: 'Based Transactions' },
  { value: '100%', label: 'Web Based' },
] as const

const cards = [
  {
    icon: '📚',
    title: 'Book Management',
    description: 'Centralized catalog with real-time inventory tracking and availability status.',
    sectionId: 'book-management',
    iconBg: 'bg-indigo-50',
    borderColor: 'border-indigo-100/70',
    hoverBorder: 'hover:border-indigo-200',
    gradient: 'bg-gradient-to-br from-indigo-50/60 to-transparent',
  },
  {
    icon: '📲',
    title: 'QR Transactions',
    description: 'Borrow and return books instantly using QR code scanning.',
    sectionId: 'qr-transactions',
    iconBg: 'bg-emerald-50',
    borderColor: 'border-emerald-100/70',
    hoverBorder: 'hover:border-emerald-200',
    gradient: 'bg-gradient-to-br from-emerald-50/60 to-transparent',
  },
  {
    icon: '✅',
    title: 'Approval Workflows',
    description: 'Multi-step approval process for borrow requests and extensions.',
    sectionId: 'approval-workflows',
    iconBg: 'bg-amber-50',
    borderColor: 'border-amber-100/70',
    hoverBorder: 'hover:border-amber-200',
    gradient: 'bg-gradient-to-br from-amber-50/60 to-transparent',
  },
  {
    icon: '⚠️',
    title: 'Penalties & Control',
    description: 'Automated penalty computation and fine management for overdue items.',
    sectionId: 'penalties',
    iconBg: 'bg-rose-50',
    borderColor: 'border-rose-100/70',
    hoverBorder: 'hover:border-rose-200',
    gradient: 'bg-gradient-to-br from-rose-50/60 to-transparent',
  },
]
</script>
