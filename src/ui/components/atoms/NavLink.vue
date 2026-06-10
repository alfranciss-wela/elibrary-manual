<template>
  <a
    :href="href"
    class="text-sm font-medium px-4 py-1.5 rounded-md transition-colors duration-150"
    :class="
      active
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
    "
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  active?: boolean
}>()
</script>
