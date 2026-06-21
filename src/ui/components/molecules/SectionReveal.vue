<template>
  <div
    ref="el"
    :class="[
      isDesktop ? 'transition-all duration-700 ease-out will-change-transform' : '',
      showVisible ? VISIBLE_CLASS : hiddenClass,
    ]"
    :style="isDesktop ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBreakpoint } from '@composables/useBreakpoint'
import { useScrollReveal } from '@composables/useScrollReveal'

export type RevealTransition = 'slide' | 'fade-up' | 'zoom' | 'blur' | 'tilt'

const props = withDefaults(defineProps<{
  transition?: RevealTransition
  index?: number
  delay?: number
  once?: boolean
  threshold?: number
}>(), {
  transition: 'fade-up',
  index: 0,
  delay: 0,
  once: true,
  threshold: 0.15,
})

const el = ref<HTMLElement | null>(null)
const { isDesktop } = useBreakpoint()
const { isVisible } = useScrollReveal(el, { once: props.once, threshold: props.threshold })

const showVisible = computed(() => !isDesktop.value || isVisible.value)

const isOdd = computed(() => props.index % 2 === 1)

const VISIBLE_CLASS = 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 rotate-0'

const hiddenClass = computed(() => {
  switch (props.transition) {
    case 'slide':
      return isOdd.value
        ? 'opacity-0 translate-x-16'
        : 'opacity-0 -translate-x-16'
    case 'fade-up':
      return isOdd.value
        ? 'opacity-0 -translate-y-12'
        : 'opacity-0 translate-y-12'
    case 'zoom':
      return isOdd.value
        ? 'opacity-0 scale-110'
        : 'opacity-0 scale-90'
    case 'blur':
      return isOdd.value
        ? 'opacity-0 blur-md translate-x-8'
        : 'opacity-0 blur-md -translate-x-8'
    case 'tilt':
      return isOdd.value
        ? 'opacity-0 -rotate-2 translate-y-8'
        : 'opacity-0 rotate-2 translate-y-8'
    default:
      return 'opacity-0'
  }
})
</script>
