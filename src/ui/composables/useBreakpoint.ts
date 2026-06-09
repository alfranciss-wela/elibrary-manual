import { onMounted, onUnmounted, ref, computed } from 'vue'

const MOBILE_MAX = 767
const TABLET_MAX = 1023

export function useBreakpoint() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)

  function update() {
    width.value = window.innerWidth
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  const isMobile = computed(() => width.value <= MOBILE_MAX)
  const isTablet = computed(() => width.value > MOBILE_MAX && width.value <= TABLET_MAX)
  const isDesktop = computed(() => width.value > TABLET_MAX)

  return { width, isMobile, isTablet, isDesktop }
}
