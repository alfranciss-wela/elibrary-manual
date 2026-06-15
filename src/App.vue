<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@layouts/AppLayout.vue'
import AppHeader from '@organisms/AppHeader.vue'

const route = useRoute()
const isFullWidth = computed(() => route.meta.fullWidth === true)
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <AppHeader class="shrink-0" />

    <template v-if="isFullWidth">
      <RouterView />
    </template>

    <AppLayout v-else class="flex-1 overflow-y-auto">
      <RouterView />
    </AppLayout>
  </div>
</template>
