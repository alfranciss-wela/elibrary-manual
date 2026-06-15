<template>
  <header class="w-full bg-white border-b border-slate-200">

    <div class="w-full max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
      <AppBrand />

      <NavBar v-if="isDesktop" :active-path="activePath" />

      <HamburgerButton
        v-else
        :open="drawerOpen"
        @toggle="drawerOpen = !drawerOpen"
      />
    </div>

    <MobileNavDrawer
      v-if="!isDesktop"
      :open="drawerOpen"
      :active-path="activePath"
    />

  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBrand from '@molecules/AppBrand.vue'
import NavBar from '@molecules/NavBar.vue'
import MobileNavDrawer from '@molecules/MobileNavDrawer.vue'
import HamburgerButton from '@atoms/HamburgerButton.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

defineProps<{
  activePath?: string
}>()

const { isDesktop } = useBreakpoint()
const drawerOpen = ref(false)
</script>
