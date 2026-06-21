<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@layouts/AppLayout.vue'
import AppHeader from '@organisms/AppHeader.vue'
import ScrollToTop from '@molecules/ScrollToTop.vue'

const route = useRoute()
const isFullWidth = computed(() => route.meta.fullWidth === true)


onMounted(() => {
  const probe = document.createElement('div')
  probe.style.cssText =
    'visibility:hidden;overflow:scroll;position:absolute;top:-9999px;width:100px;height:100px;'
  document.body.appendChild(probe)
  const width = probe.offsetWidth - probe.clientWidth
  probe.remove()
  document.documentElement.style.setProperty('--sbw', `${width}px`)
})
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <AppHeader :active-path="route.path" />

    <ScrollToTop />
    <main class="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
      <template v-if="isFullWidth">
        <RouterView />
      </template>

      <AppLayout v-else>
        <RouterView />
      </AppLayout>
    </main>
  </div>
</template>
