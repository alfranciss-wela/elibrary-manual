<template>
  <span class="flex flex-col gap-1.5">
    <span
      class="block w-5 h-0.5 bg-gray-600 transition-all duration-200"
      :class="open ? 'rotate-45 translate-y-2' : ''"
    />
    <span
      class="block w-5 h-0.5 bg-gray-600 transition-all duration-200"
      :class="open ? 'opacity-0' : ''"
    />
    <span
      class="block w-5 h-0.5 bg-gray-600 transition-all duration-200"
      :class="open ? '-rotate-45 -translate-y-2' : ''"
    />
  </span>
</template>

<script setup lang="ts">
defineProps<{ open?: boolean }>()
</script>
