<template>
  <Transition name="drawer">
    <div
      v-if="open"
      class="fixed inset-0 z-40 flex flex-col bg-white"
    >
      <!-- Header row -->
      <div class="flex items-center justify-between px-5 h-14 border-b border-slate-100 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <span class="text-white text-[10px] font-black">EL</span>
          </span>
          <span class="text-sm font-semibold text-slate-900 tracking-tight">E-Library Manual</span>
        </div>
        <button
          type="button"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close menu"
          @click="$emit('close')"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors"
          :class="
            activePath === link.href
              ? 'bg-indigo-50 text-indigo-600 font-semibold'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          "
        >
          <span
            class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
            :class="activePath === link.href ? 'bg-indigo-500' : 'bg-slate-300'"
          />
          {{ link.label }}
          <span v-if="activePath === link.href" class="ml-auto text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            Current
          </span>
        </a>
      </nav>

      <!-- Footer -->
      <div class="shrink-0 px-5 py-4 border-t border-slate-100 flex items-center gap-2">
        <span class="text-xs text-slate-400">E-Library Documentation</span>
        <span class="ml-auto flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-xs text-slate-400">v1.0</span>
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  activePath?: string
}>()

defineEmits<{
  (e: 'close'): void
}>()

const links = [
  { label: 'Home',              href: '/home' },
  { label: 'Project Structure', href: '/project-structure' },
  { label: 'Development',       href: '/development' },
  { label: 'Support',           href: '/support' },
  { label: 'Latest Updates',    href: '/latest-updates' },
]
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
