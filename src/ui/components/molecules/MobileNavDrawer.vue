<template>
  <nav v-if="open" class="flex flex-col px-4 pb-4 gap-1 bg-white border-t border-gray-100">
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      class="text-sm font-medium px-3 py-2.5 rounded-md no-underline transition-colors"
      :class="
        activePath === link.href
          ? 'bg-indigo-50/70 text-indigo-600 font-semibold border-l-2 border-indigo-500'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
      "
    >
      {{ link.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  activePath?: string
}>()

const links = [
  { label: 'Home', href: '/home' },
  { label: 'Project Structure', href: '/project-structure' },
  { label: 'Development', href: '/development' },
  { label: 'Support', href: '/support' },
  { label: 'Latest Updates', href: '/latest-updates' },
]
</script>
