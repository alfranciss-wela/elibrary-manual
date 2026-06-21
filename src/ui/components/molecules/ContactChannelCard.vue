<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    class="group relative rounded-3xl p-6 lg:p-7 h-[22rem] flex flex-col gap-5 no-underline overflow-hidden transition-all duration-300"
    :class="isDesktop ? 'hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] hover:-translate-y-1' : ''"
    @click="handleClick"
  >
    <div
      class="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
      :class="[bgGradient, isDesktop ? 'group-hover:opacity-100' : '']"
    />

    <div class="relative flex items-start justify-between">
      <div
        class="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        :class="[iconBg, isDesktop ? 'group-hover:scale-110 group-hover:rotate-3' : '']"
      >
        <component :is="icon" class="w-7 h-7" :class="iconColor" />
      </div>
      <div v-if="total" class="text-right">
        <div class="text-[10px] font-mono text-slate-400 mb-1">CHANNEL</div>
        <div class="text-2xl font-black text-slate-200 leading-none tracking-tighter">
          {{ paddedIndex }}
        </div>
      </div>
    </div>

    <div class="relative flex-1 space-y-2">
      <h3 class="text-2xl font-black text-slate-900 tracking-tight leading-none">
        {{ label }}
      </h3>
      <div class="flex items-center gap-1.5">
        <span class="w-1 h-1 rounded-full" :class="dotColor" />
        <span class="text-[11px] font-mono text-slate-400 tracking-wide">{{ handle }}</span>
      </div>
      <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 pt-1">
        {{ desc }}
      </p>
    </div>

    <div class="relative flex items-center justify-between">
      <span class="inline-flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full" :class="statusDot" />
        <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {{ eta }}
        </span>
      </span>
      <span
        class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 transition-all duration-200"
        :class="isDesktop ? 'group-hover:gap-2.5' : ''"
      >
        {{ cta }}
        <ChevronIcon
          class="w-3.5 h-3.5 -rotate-90 transition-transform duration-200"
          :class="isDesktop ? 'group-hover:translate-x-0.5' : ''"
        />
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import ChevronIcon from '@atoms/icons/ChevronIcon.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

const props = withDefaults(defineProps<{
  label: string
  handle: string
  desc: string
  eta: string
  cta: string
  icon: Component
  iconBg: string
  iconColor: string
  bgGradient: string
  dotColor: string
  statusDot: string
  href: string
  external?: boolean
  onClick?: (e: MouseEvent) => void
  index?: number
  total?: number
}>(), {
  external: true,
  onClick: undefined,
  index: 0,
  total: 0,
})

const { isDesktop } = useBreakpoint()

const paddedIndex = computed(() => String(props.index).padStart(2, '0'))

function handleClick(e: MouseEvent) {
  props.onClick?.(e)
}
</script>
