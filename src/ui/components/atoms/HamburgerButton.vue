<template>
  <button
    type="button"
    class="flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
    :aria-label="open ? 'Close menu' : 'Open menu'"
    @click="$emit('toggle')"
  >
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
  </button>
</template>

<script setup lang="ts">
defineProps<{ open?: boolean }>()
defineEmits<{ toggle: [] }>()
</script>
