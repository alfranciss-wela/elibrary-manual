<template>
  <div class="relative z-10 flex justify-center pt-8 pb-2">
    <button
      type="button"
      class="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
      :aria-label="`Scroll to ${targetId}`"
      @click="scrollToNext"
    >
      <span class="text-xs font-medium tracking-wide">{{ label }}</span>
      <span class="w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 flex items-center justify-center transition-all duration-200 group-hover:translate-y-1">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  targetId: string
  label?: string
}>(), {
  label: 'Next',
})

function scrollToNext() {
  const el = document.getElementById(props.targetId)
  const main = document.querySelector('main')
  if (!el || !main) return
  const mainTop = main.getBoundingClientRect().top
  main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top - mainTop, behavior: 'smooth' })
}
</script>
