<template>
  <div class="w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 gap-14">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <div class="space-y-6">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500">
          <span class="w-8 h-px bg-cyan-400" />
          E-Library System
        </div>

        <h1 class="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
          How the<br>
          <span class="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
            System Works
          </span>
        </h1>

        <p class="text-base text-slate-500 leading-relaxed max-w-lg">
          Five end-to-end flows covering everything from registering a book to resolving
          a penalty — built around QR scanning, role-based approvals, and automated tracking.
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

      <div class="relative">
        <div class="absolute left-5 top-5 bottom-5 w-px bg-slate-200" />

        <div class="space-y-3">
          <div
            v-for="(flow, i) in workflows"
            :key="flow.title"
            class="relative flex items-start gap-4 pl-14 group cursor-pointer"
            @click="scrollTo(flow.sectionId)"
          >
            <span
              class="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 border-white shadow-sm transition-all duration-200 shrink-0"
              :class="[flow.bubbleBg, flow.bubbleText, isDesktop ? 'group-hover:scale-110' : '']"
            >
              {{ i + 1 }}
            </span>

            <div
              class="flex-1 rounded-2xl border bg-white px-4 py-3 transition-all duration-200"
              :class="[flow.borderColor, isDesktop ? flow.hoverBorder : '', isDesktop ? 'group-hover:shadow-md' : '']"
            >
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-base">{{ flow.icon }}</span>
                <p class="text-sm font-bold text-slate-800">{{ flow.title }}</p>
              </div>
              <p class="text-xs text-slate-500 leading-relaxed">{{ flow.desc }}</p>
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

function scrollTo(sectionId: string) {
  if (!sectionId) return
  const el = document.getElementById(sectionId)
  const main = document.querySelector('main')
  if (!el || !main) return
  const mainTop = main.getBoundingClientRect().top
  main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top - mainTop, behavior: 'smooth' })
}

const tags = [
  { label: 'Borrow & Return', color: 'indigo' },
  { label: 'QR Scanning',     color: 'emerald' },
  { label: 'Approvals',       color: 'amber' },
  { label: 'Penalties',       color: 'rose' },
] as const

const stats = [
  { value: '5',   label: 'Core Workflows' },
  { value: 'QR',  label: 'Scan Based' },
  { value: '100%', label: 'Traceable' },
] as const

const workflows = [
  {
    icon: '📚',
    title: 'Book Setup',
    sectionId: 'book-setup',
    bubbleBg: 'bg-indigo-100',
    bubbleText: 'text-indigo-600',
    borderColor: 'border-indigo-100/70',
    hoverBorder: 'group-hover:border-indigo-200',
    desc: 'Register a new book with metadata and copies; saved as Pending until reviewed by a Librarian Head.',
  },
  {
    icon: '✅',
    title: 'Approval & Catalog',
    sectionId: 'approval-catalog',
    bubbleBg: 'bg-amber-100',
    bubbleText: 'text-amber-600',
    borderColor: 'border-amber-100/70',
    hoverBorder: 'group-hover:border-amber-200',
    desc: 'Librarian Head approves or rejects pending books; approved books appear in the public catalog immediately.',
  },
  {
    icon: '📲',
    title: 'Borrow Transaction',
    sectionId: 'borrowing',
    bubbleBg: 'bg-emerald-100',
    bubbleText: 'text-emerald-600',
    borderColor: 'border-emerald-100/70',
    hoverBorder: 'group-hover:border-emerald-200',
    desc: 'Student adds books to their bag and checks out; Librarian approves and the system stamps due dates.',
  },
  {
    icon: '🔄',
    title: 'Return & Penalties',
    sectionId: 'return-penalties',
    bubbleBg: 'bg-rose-100',
    bubbleText: 'text-rose-600',
    borderColor: 'border-rose-100/70',
    hoverBorder: 'group-hover:border-rose-200',
    desc: 'Record return date, compute overdue/damage/lost fines, settle payment, and mark the book Available again.',
  },
  {
    icon: '📷',
    title: 'QR Transactions',
    sectionId: 'qr-transactions',
    bubbleBg: 'bg-cyan-100',
    bubbleText: 'text-cyan-600',
    borderColor: 'border-cyan-100/70',
    hoverBorder: 'group-hover:border-cyan-200',
    desc: 'Transaction and book QR codes enable instant lookup — scan to open a transaction or jump to a book edit page.',
  },
]
</script>
