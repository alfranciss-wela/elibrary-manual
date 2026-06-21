<template>
  <div class="w-full select-none">

    <div
      v-if="!images.length"
      class="w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-3 py-20 px-6 text-center"
    >
      <span class="text-3xl">🖼️</span>
      <p class="text-sm font-semibold text-slate-500">{{ placeholder ?? 'Screenshots coming soon' }}</p>
    </div>

    <template v-else>

      <div class="flex items-center gap-3">

        <button
          v-if="images.length > 1"
          type="button"
          class="shrink-0 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-all duration-200"
          aria-label="Previous"
          @click="prev"
        >
          <ChevronIcon class="w-4 h-4 rotate-90" />
        </button>

        <div
          class="flex-1 overflow-hidden rounded-2xl border border-slate-200 shadow-md cursor-zoom-in"
          @click="openLightbox(current)"
        >
          <div
            class="flex transition-transform duration-350 ease-in-out"
            :style="{ transform: `translateX(-${current * 100}%)` }"
          >
            <img
              v-for="(src, i) in images"
              :key="src"
              :src="src"
              :alt="`Slide ${i + 1}`"
              class="w-full shrink-0 object-cover block"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <button
          v-if="images.length > 1"
          type="button"
          class="shrink-0 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-all duration-200"
          aria-label="Next"
          @click="next"
        >
          <ChevronIcon class="w-4 h-4 -rotate-90" />
        </button>

      </div>

      <div v-if="images.length > 1" class="flex justify-center gap-1.5 mt-3">
        <button
          v-for="(_, i) in images"
          :key="i"
          type="button"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="i === current ? 'bg-indigo-500 w-4' : 'bg-slate-300 w-1.5'"
          :aria-label="`Go to slide ${i + 1}`"
          @click="goTo(i)"
        />
      </div>

    </template>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxIndex !== null"
          class="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <div class="shrink-0 flex items-center justify-between px-4 py-3 pointer-events-none">
            <span class="text-white/50 text-xs font-medium pointer-events-none">
              {{ lightboxIndex! + 1 }} / {{ images.length }}
            </span>

            <div class="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-lg leading-none"
                :disabled="zoom <= MIN_ZOOM"
                aria-label="Zoom out"
                @click="zoomBy(-ZOOM_STEP)"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zM8 11h6" />
                </svg>
              </button>

              <button
                type="button"
                class="px-2 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition min-w-[3rem]"
                aria-label="Reset zoom"
                @click="resetZoom"
              >
                {{ Math.round(zoom * 100) }}%
              </button>

              <button
                type="button"
                class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                :disabled="zoom >= MAX_ZOOM"
                aria-label="Zoom in"
                @click="zoomBy(ZOOM_STEP)"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zM11 8v6M8 11h6" />
                </svg>
              </button>

              <div class="w-px h-5 bg-white/20" />

              <button
                type="button"
                class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                aria-label="Close"
                @click="closeLightbox"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex-1 flex items-center gap-3 px-3 min-h-0">

            <button
              v-if="images.length > 1"
              type="button"
              class="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
              aria-label="Previous"
              @click="lightboxPrev"
            >
              <ChevronIcon class="w-5 h-5 rotate-90" />
            </button>

            <div
              ref="viewportRef"
              class="flex-1 h-full overflow-hidden relative flex items-center justify-center select-none"
              :style="{ cursor: cursorStyle }"
              @wheel.prevent="onWheel"
              @mousedown="onMouseDown"
              @mousemove="onMouseMove"
              @mouseup="onMouseUp"
              @mouseleave="onMouseUp"
              @click="onViewportClick"
            >
              <img
                ref="imgRef"
                :src="images[lightboxIndex!]"
                :alt="`Slide ${lightboxIndex! + 1}`"
                class="block rounded-lg shadow-2xl pointer-events-none max-h-[70vh] w-auto"
                decoding="async"
                fetchpriority="high"
                :style="{
                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                  transformOrigin: '0 0',
                  transition: isPanning ? 'none' : 'transform 0.15s ease',
                }"
              />
              <span
                v-if="zoom === 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs pointer-events-none whitespace-nowrap"
              >
                Click to zoom · Scroll to zoom · Drag to pan
              </span>
            </div>

            <button
              v-if="images.length > 1"
              type="button"
              class="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
              aria-label="Next"
              @click="lightboxNext"
            >
              <ChevronIcon class="w-5 h-5 -rotate-90" />
            </button>

          </div>

          <div v-if="images.length > 1" class="shrink-0 flex justify-center gap-1.5 py-3">
            <button
              v-for="(_, i) in images"
              :key="i"
              type="button"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="i === lightboxIndex ? 'bg-white w-4' : 'bg-white/30 w-1.5'"
              @click="lightboxGoTo(i)"
            />
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ChevronIcon from '@atoms/icons/ChevronIcon.vue'

const props = withDefaults(defineProps<{
  images?: string[]
  placeholder?: string
}>(), {
  images: () => [],
})

const current = ref(0)

function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}
function next() {
  current.value = (current.value + 1) % props.images.length
}
function goTo(i: number) {
  current.value = i
}

const lightboxIndex = ref<number | null>(null)

function openLightbox(i: number) {
  lightboxIndex.value = i
  resetZoom()
}
function closeLightbox() {
  lightboxIndex.value = null
  resetZoom()
}
function lightboxPrev() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + props.images.length) % props.images.length
  resetZoom()
}
function lightboxNext() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % props.images.length
  resetZoom()
}
function lightboxGoTo(i: number) {
  lightboxIndex.value = i
  resetZoom()
}

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const ZOOM_STEP = 0.5

const CLICK_ZOOM_STEPS = [1, 2, 3.5, 5]
const clickZoomStep = ref(0)

const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)

const viewportRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)

const cursorStyle = computed(() => {
  if (isPanning.value) return 'grabbing'
  if (zoom.value > 1 && clickZoomStep.value < CLICK_ZOOM_STEPS.length - 1) return 'zoom-in'
  if (zoom.value > 1) return 'zoom-out'
  return 'zoom-in'
})

function resetZoom() {
  zoom.value = 1
  panX.value = 0
  panY.value = 0
  clickZoomStep.value = 0
}

function zoomToStep(targetZoom: number, originX?: number, originY?: number) {
  if (!viewportRef.value || !imgRef.value) return
  const vw = viewportRef.value.clientWidth
  const vh = viewportRef.value.clientHeight
  const cx = originX ?? vw / 2
  const cy = originY ?? vh / 2
  const oldZoom = zoom.value
  const newZoom = targetZoom
  if (newZoom === 1) { resetZoom(); return }
  const iw = imgRef.value.naturalWidth || imgRef.value.clientWidth
  const ih = imgRef.value.naturalHeight || imgRef.value.clientHeight
  const ox = (vw - iw) / 2
  const oy = (vh - ih) / 2
  panX.value = cx - (cx - panX.value - ox) * (newZoom / oldZoom) - ox
  panY.value = cy - (cy - panY.value - oy) * (newZoom / oldZoom) - oy
  zoom.value = newZoom
  clampPan()
}

function clampPan() {
  if (!viewportRef.value || !imgRef.value) return
  const vw = viewportRef.value.clientWidth
  const vh = viewportRef.value.clientHeight
  const iw = imgRef.value.naturalWidth || imgRef.value.clientWidth
  const ih = imgRef.value.naturalHeight || imgRef.value.clientHeight

  const scaledW = iw * zoom.value
  const scaledH = ih * zoom.value

  const ox = (vw - iw) / 2
  const oy = (vh - ih) / 2

  const minX = vw - scaledW - ox
  const maxX = -ox
  const minY = vh - scaledH - oy
  const maxY = -oy

  panX.value = Math.min(maxX, Math.max(minX, panX.value))
  panY.value = Math.min(maxY, Math.max(minY, panY.value))
}

function zoomBy(delta: number, originX?: number, originY?: number) {
  if (!viewportRef.value || !imgRef.value) return
  const vw = viewportRef.value.clientWidth
  const vh = viewportRef.value.clientHeight

  const cx = originX ?? vw / 2
  const cy = originY ?? vh / 2

  const oldZoom = zoom.value
  const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZoom + delta))
  if (newZoom === oldZoom) return

  const iw = imgRef.value.naturalWidth || imgRef.value.clientWidth
  const ih = imgRef.value.naturalHeight || imgRef.value.clientHeight
  const ox = (vw - iw) / 2
  const oy = (vh - ih) / 2

  panX.value = cx - (cx - panX.value - ox) * (newZoom / oldZoom) - ox
  panY.value = cy - (cy - panY.value - oy) * (newZoom / oldZoom) - oy

  zoom.value = newZoom
  clampPan()
}

function onWheel(e: WheelEvent) {
  if (!viewportRef.value) return
  const rect = viewportRef.value.getBoundingClientRect()
  zoomBy(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP, e.clientX - rect.left, e.clientY - rect.top)
}

let dragStartX = 0
let dragStartY = 0
let dragPanX = 0
let dragPanY = 0
let hasDragged = false

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  hasDragged = false
  isPanning.value = zoom.value > 1
  dragStartX = e.clientX
  dragStartY = e.clientY
  dragPanX = panX.value
  dragPanY = panY.value
}
function onMouseMove(e: MouseEvent) {
  if (!isPanning.value) return
  hasDragged = true
  panX.value = dragPanX + (e.clientX - dragStartX)
  panY.value = dragPanY + (e.clientY - dragStartY)
  clampPan()
}
function onMouseUp() {
  isPanning.value = false
}

function onViewportClick(e: MouseEvent) {
  if (hasDragged) { hasDragged = false; return }
  const img = imgRef.value
  if (!img) { closeLightbox(); return }
  const rect = img.getBoundingClientRect()
  const onImage = e.clientX >= rect.left && e.clientX <= rect.right
    && e.clientY >= rect.top && e.clientY <= rect.bottom

  if (onImage) {
    const nextStep = (clickZoomStep.value + 1) % CLICK_ZOOM_STEPS.length
    clickZoomStep.value = nextStep
    const vr = viewportRef.value!.getBoundingClientRect()
    const targetZoom = CLICK_ZOOM_STEPS[nextStep] ?? 1
    zoomToStep(targetZoom, e.clientX - vr.left, e.clientY - vr.top)
  } else {
    closeLightbox()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft' && zoom.value === 1) lightboxPrev()
  if (e.key === 'ArrowRight' && zoom.value === 1) lightboxNext()
  if (e.key === '+' || e.key === '=') zoomBy(ZOOM_STEP)
  if (e.key === '-') zoomBy(-ZOOM_STEP)
  if (e.key === '0') resetZoom()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
