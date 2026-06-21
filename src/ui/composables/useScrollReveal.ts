import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  rootSelector?: string
}

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
    once = true,
    rootSelector = 'main',
  } = options

  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      isVisible.value = true
      return
    }

    if (!target.value) return

    const root = rootSelector ? document.querySelector(rootSelector) : null

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (once && observer && target.value) observer.unobserve(target.value)
          } else if (!once) {
            isVisible.value = false
          }
        }
      },
      { threshold, rootMargin, root },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return { isVisible }
}
