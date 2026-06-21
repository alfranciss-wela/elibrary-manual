<template>
  <div class="relative inline-flex" @mouseenter="show = true" @mouseleave="show = false">
    <slot />
    <Transition name="tooltip">
      <div
        v-if="show"
        role="tooltip"
        class="absolute z-50 pointer-events-none"
        :class="positionClasses"
      >
        <div class="bg-slate-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
          {{ text }}
        </div>
        <span class="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" :class="arrowClasses" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}>(), {
  position: 'top',
})

const show = ref(false)

const positionClasses = computed(() => ({
  top:    'bottom-full left-1/2 -translate-x-1/2 pb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 pt-2',
  left:   'right-full top-1/2 -translate-y-1/2 pr-2',
  right:  'left-full top-1/2 -translate-y-1/2 pl-2',
}[props.position]))

const arrowClasses = computed(() => ({
  top:    '-bottom-1',
  bottom: '-top-1',
  left:   'top-1/2 -translate-y-1/2 -right-1',
  right:  'top-1/2 -translate-y-1/2 -left-1',
}[props.position]))
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}
</style>
