<template>
  <button
    type="button"
    class="flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
    :aria-label="open ? 'Close menu' : 'Open menu'"
    @click="$emit('toggle')"
  >
    <MenuIcon :open="open" />
  </button>
</template>

<script setup lang="ts">
import MenuIcon from '@atoms/icons/MenuIcon.vue'

defineProps<{ open?: boolean }>()
defineEmits<{ toggle: [] }>()
</script>
