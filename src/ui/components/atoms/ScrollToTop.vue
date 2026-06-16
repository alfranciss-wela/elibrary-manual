<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-700 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <ChevronIcon class="w-4 h-4 rotate-180" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ChevronIcon from '@atoms/icons/ChevronIcon.vue'

const visible = ref(false)

function onScroll() {
  const main = document.querySelector('main')
  visible.value = (main?.scrollTop ?? window.scrollY) > 300
}

function scrollToTop() {
  const main = document.querySelector('main')
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  const main = document.querySelector('main')
  const target = main ?? window
  target.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  const main = document.querySelector('main')
  const target = main ?? window
  target.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
