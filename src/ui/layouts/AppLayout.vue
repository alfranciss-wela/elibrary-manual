<script setup lang="ts">
import { computed } from 'vue'
import DesktopLayout from '@layouts/DesktopLayout.vue'
import TabletLayout from '@layouts/TabletLayout.vue'
import MobileLayout from '@layouts/MobileLayout.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

const { isMobile, isTablet } = useBreakpoint()

const layout = computed(() => {
  if (isMobile.value) return MobileLayout
  if (isTablet.value) return TabletLayout
  return DesktopLayout
})
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>
