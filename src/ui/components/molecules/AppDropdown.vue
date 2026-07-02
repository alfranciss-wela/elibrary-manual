<template>
  <div ref="root" class="relative z-50">
    <button
      type="button"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
      :class="triggerClass"
      @click="open = !open"
    >
      <component v-if="icon" :is="icon" class="w-4 h-4" />
      {{ label }}
      <ChevronIcon
        class="w-3.5 h-3.5 transition-transform duration-200"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <Transition name="menu">
      <div
        v-if="open"
        class="absolute top-[calc(100%+0.5rem)] z-50 min-w-[12rem] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <p
          v-if="menuTitle"
          class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400"
        >
          {{ menuTitle }}
        </p>

        <slot name="options" :options="options" :select="select">
          <button
            v-for="option in options"
            :key="option.id"
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
            :disabled="option.disabled"
            @click="select(option.id)"
          >
            <img
              v-if="option.avatar"
              :src="option.avatar"
              :alt="option.label"
              class="w-7 h-7 rounded-full object-cover ring-2 ring-white"
            >
            <span
              v-else-if="option.icon"
              class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm"
            >
              {{ option.icon }}
            </span>
            <span
              v-else
              class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500"
            >
              {{ option.label.charAt(0) }}
            </span>

            <span class="min-w-0">
              <span class="block truncate">{{ option.label }}</span>
              <span v-if="option.description" class="block text-xs font-normal text-slate-400 truncate">
                {{ option.description }}
              </span>
            </span>
          </button>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Component } from 'vue'
import ChevronIcon from '@atoms/icons/ChevronIcon.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

export interface DropdownOption {
  id: string
  label: string
  avatar?: string
  icon?: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  label: string
  options: DropdownOption[]
  icon?: Component
  menuTitle?: string
  buttonClass?: string
  align?: 'left' | 'right'
}>(), {
  icon: undefined,
  menuTitle: undefined,
  buttonClass: undefined,
  align: 'left',
})

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const { isDesktop } = useBreakpoint()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const defaultButtonClass = computed(() => {
  const hover = isDesktop.value ? 'hover:-translate-y-0.5 hover:bg-slate-100' : ''
  return `bg-white text-slate-900 ${hover}`
})

const triggerClass = computed(() => props.buttonClass ?? defaultButtonClass.value)

function select(id: string) {
  open.value = false
  emit('select', id)
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
