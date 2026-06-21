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
        <FeatureCard
          v-for="card in cards"
          :key="card.title"
          :icon="card.icon"
          :title="card.title"
          :description="card.description"
          :color="card.color"
          :section-id="card.sectionId"
        />
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
import FeatureCard from '@molecules/FeatureCard.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

const { isDesktop } = useBreakpoint()

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
    color: 'indigo',
    sectionId: 'book-management',
  },
  {
    icon: '📲',
    title: 'QR Transactions',
    description: 'Borrow and return books instantly using QR code scanning.',
    color: 'emerald',
    sectionId: 'qr-transactions',
  },
  {
    icon: '✅',
    title: 'Approval Workflows',
    description: 'Multi-step approval process for borrow requests and extensions.',
    color: 'amber',
    sectionId: 'approval-workflows',
  },
  {
    icon: '⚠️',
    title: 'Penalties & Control',
    description: 'Automated penalty computation and fine management for overdue items.',
    color: 'rose',
    sectionId: 'penalties',
  },
] as const
</script>
