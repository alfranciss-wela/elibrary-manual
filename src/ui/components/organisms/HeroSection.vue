<template>
  <section class="relative h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 sm:px-6 overflow-hidden">

    <div class="absolute inset-0 z-0">
      <transition-group name="bg-fade">
        <div
          v-for="(bg, i) in backgrounds"
          v-show="i === current"
          :key="bg"
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${bg})` }"
        />
      </transition-group>
      <div class="absolute inset-0 backdrop-blur-md bg-white/70" />
    </div>

    <div class="relative z-10 w-full max-w-3xl flex flex-col items-center text-center gap-4 sm:gap-5">

      <h1 class="text-2xl font-extrabold text-slate-900 leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl lg:whitespace-nowrap">
        Welcome to E-Library Documentation
      </h1>

      <p class="text-base font-semibold text-slate-700 sm:text-lg">
        Official documentation for the E-Library System.
      </p>

      <p class="text-sm text-slate-500 leading-relaxed max-w-xl sm:text-base sm:max-w-2xl">
        A web-based platform for managing library operations digitally — covering book management,
        QR transactions, approval workflows, and monitoring tools. The primary reference for
        developers, administrators, and future maintainers.
      </p>

      <div class="w-full max-w-sm mt-3 sm:max-w-lg md:max-w-xl sm:mt-4">
        <div class="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-md sm:px-5 sm:py-3 focus-within:border-indigo-500 focus-within:shadow-indigo-100 transition-all duration-200">
          <SearchIcon class="text-slate-400 shrink-0 w-4 h-4" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search documentation, components, or tutorials..."
            class="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder:text-slate-400 sm:text-sm"
            @keydown.enter="handleSearch"
          />
          <kbd class="shrink-0 text-xs text-slate-400 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 pointer-events-none hidden sm:inline">
            ⌘ K
          </kbd>
        </div>
      </div>

      <div class="flex gap-2 mt-2">
        <button
          v-for="(_, i) in backgrounds"
          :key="i"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="i === current ? 'bg-slate-700 w-4' : 'bg-slate-400'"
          @click="goTo(i)"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SearchIcon from '@atoms/icons/SearchIcon.vue'

import bg1 from '@/assets/images/background-1.png'
import bg2 from '@/assets/images/background-2.png'
import bg3 from '@/assets/images/background-3.png'

const backgrounds = [bg1, bg2, bg3]
const current = ref(0)
const searchQuery = ref('')

let timer: ReturnType<typeof setInterval>

function goTo(index: number) {
  current.value = index
  resetTimer()
}

function next() {
  current.value = (current.value + 1) % backgrounds.length
}

function resetTimer() {
  clearInterval(timer)
  timer = setInterval(next, 5000)
}

onMounted(() => {
  timer = setInterval(next, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
})

function handleSearch() {
  if (!searchQuery.value.trim()) return
}
</script>

<style scoped>
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s ease;
}
.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}
</style>
