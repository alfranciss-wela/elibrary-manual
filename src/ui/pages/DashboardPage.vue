<script setup lang="ts">
import { useBreakpoint } from '@composables/useBreakpoint'

const { isMobile, isTablet, isDesktop } = useBreakpoint()
</script>

<template>
  <p v-if="isMobile" class="text-xl font-bold text-center mt-10">This is Mobile View</p>
  <p v-else-if="isTablet" class="text-xl font-bold text-center mt-10">This is Tablet View</p>
  <p v-else-if="isDesktop" class="text-xl font-bold text-center mt-10">This is Desktop View</p>
</template>
