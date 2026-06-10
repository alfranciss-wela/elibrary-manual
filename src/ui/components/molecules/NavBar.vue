<template>
  <nav class="flex items-center gap-2">
    <NavLink
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :active="props.activePath === link.href"
    >
      {{ link.label }}
    </NavLink>
  </nav>
</template>

<script setup lang="ts">
import NavLink from '@atoms/NavLink.vue'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Getting Started', href: '/getting-started' },
  { label: 'Project Structure', href: '/project-structure' },
  { label: 'Development', href: '/development' },
  { label: 'Deployment', href: '/deployment' },
  { label: 'Support', href: '/support' },
]

const props = defineProps<{
  activePath?: string
}>()
</script>
