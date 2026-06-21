<template>
  <div class="relative group" :style="zIndex !== undefined ? { zIndex } : undefined">
    <div
      class="p-[3px] rounded-full bg-gradient-to-br shadow-xl transition-transform duration-300"
      :class="[ring, isDesktop ? 'group-hover:scale-105 group-hover:z-30' : '']"
    >
      <img
        :src="avatar"
        :alt="name"
        class="rounded-full object-cover block bg-slate-900"
        :class="[sizeClass, frameRing]"
        loading="lazy"
      />
    </div>

    <span
      v-if="status"
      class="absolute bottom-1 right-1 rounded-full"
      :class="[statusSize, statusColor, frameRing]"
      :aria-label="statusLabel"
    />

    <AppBadge
      v-if="showName"
      color="glass"
      class="hidden lg:inline-flex absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap"
    >
      {{ name }}
    </AppBadge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppBadge from '@atoms/AppBadge.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  avatar: string
  name: string
  ring?: string
  size?: Size
  showName?: boolean
  status?: boolean
  statusColor?: string
  statusLabel?: string
  frameRing?: string
  zIndex?: number
}>(), {
  ring: 'from-indigo-400 to-violet-400',
  size: 'md',
  showName: true,
  status: true,
  statusColor: 'bg-emerald-400',
  statusLabel: 'Available',
  frameRing: 'ring-4 ring-slate-900',
  zIndex: undefined,
})

const { isDesktop } = useBreakpoint()

const sizeClass = computed(() => ({
  sm: 'w-20 h-20',
  md: 'w-28 h-28 sm:w-32 sm:h-32',
  lg: 'w-36 h-36 sm:w-40 sm:h-40',
}[props.size]))

const statusSize = computed(() => ({
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}[props.size]))
</script>
