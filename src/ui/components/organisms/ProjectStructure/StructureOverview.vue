<template>
  <div class="w-full">
    <div class="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-10 gap-12">

      <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">

        <div class="space-y-5">
          <span class="font-mono text-xs text-emerald-600">~/elibrary/src $</span>

          <h1 class="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Project
            <span class="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Structure
            </span>
          </h1>

          <p class="text-base text-slate-500 leading-relaxed max-w-xl">
            A clear, layered architecture that separates concerns across data, business logic,
            state, and presentation — built on Vue 3, TypeScript, and the atomic design pattern.
          </p>

          <div class="flex flex-wrap items-center divide-x divide-slate-200 border-y border-slate-200 py-4 max-w-xl">
            <div v-for="(stat, i) in stats" :key="stat.label" class="flex flex-col px-4" :class="i === 0 ? 'pl-0' : ''">
              <span class="text-xl font-black text-slate-900">{{ stat.value }}</span>
              <span class="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{{ stat.label }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <AppBadge v-for="tag in principles" :key="tag.label" :color="tag.color">
              {{ tag.label }}
            </AppBadge>
          </div>
        </div>

        <FileTreeViewer root-name="src/" :nodes="tree" />
      </div>

      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Data Flow</span>
          <span class="h-px flex-1 bg-slate-200" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div
            v-for="(node, i) in flow"
            :key="node.label"
            class="relative rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200"
            :class="node.sectionId ? ['cursor-pointer', isDesktop ? 'hover:border-slate-300 hover:shadow-md' : ''] : ''"
            @click="onFlowClick(node.sectionId)"
          >
            <div class="flex items-center gap-3">
              <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-mono font-bold" :class="node.bg">
                {{ i + 1 }}
              </span>
              <div>
                <p class="text-sm font-bold text-slate-800">{{ node.label }}</p>
                <p class="text-[11px] text-slate-500">{{ node.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="space-y-16">
      <ComponentsSection />
      <StoresSection />
      <ComposablesSection />
      <ApiResourceSection />
      <BackendSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBadge from '@atoms/AppBadge.vue'
import FileTreeViewer, { type FileTreeNode } from '@molecules/FileTreeViewer.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

const { isDesktop } = useBreakpoint()
import ComponentsSection from '@organisms/ProjectStructure/ComponentsSection.vue'
import StoresSection from '@organisms/ProjectStructure/StoresSection.vue'
import ComposablesSection from '@organisms/ProjectStructure/ComposablesSection.vue'
import ApiResourceSection from '@organisms/ProjectStructure/ApiResourceSection.vue'
import BackendSection from '@organisms/ProjectStructure/BackendSection.vue'

const stats = [
  { value: '8', label: 'Folders' },
  { value: '3', label: 'Tiers' },
  { value: 'TS', label: 'Strict' },
  { value: '100%', label: 'Typed' },
] as const

const principles = [
  { label: 'Layered Architecture', color: 'indigo' },
  { label: 'Separation of Concerns', color: 'amber' },
  { label: 'Type Safety', color: 'cyan' },
] as const

const tree: FileTreeNode[] = [
  { name: 'assets/',      color: 'text-slate-300',   tag: 'Static',     tagColor: 'text-slate-400' },
  { name: 'components/',  color: 'text-violet-300',  tag: 'UI',         tagColor: 'text-violet-400' },
  { name: 'composables/', color: 'text-emerald-300', tag: 'Logic',      tagColor: 'text-emerald-400' },
  { name: 'data/',        color: 'text-indigo-300',  tag: 'Data',       tagColor: 'text-indigo-400' },
  { name: 'pages/',       color: 'text-blue-300',    tag: 'Routes',     tagColor: 'text-blue-400' },
  { name: 'stores/',      color: 'text-amber-300',   tag: 'State',      tagColor: 'text-amber-400' },
  { name: 'types/',       color: 'text-cyan-300',    tag: 'Types',      tagColor: 'text-cyan-400' },
  { name: 'utils/',       color: 'text-rose-300',    tag: 'Helpers',    tagColor: 'text-rose-400' },
]

const flow = [
  { label: 'Component',   desc: 'Vue presentation',  bg: 'bg-violet-100 text-violet-600',    sectionId: 'components' },
  { label: 'Store',       desc: 'Global state',      bg: 'bg-amber-100 text-amber-600',      sectionId: 'stores' },
  { label: 'Composable',  desc: 'Business logic',    bg: 'bg-emerald-100 text-emerald-600',  sectionId: 'composables' },
  { label: 'API Resource', desc: 'Data fetching',    bg: 'bg-indigo-100 text-indigo-600',    sectionId: 'api-resources' },
  { label: 'Backend',     desc: 'Frappe REST API',   bg: 'bg-rose-100 text-rose-600',        sectionId: 'backend' },
]

function onFlowClick(sectionId: string) {
  if (!sectionId) return
  const el = document.getElementById(sectionId)
  const main = document.querySelector('main')
  if (!el || !main) return
  const mainTop = main.getBoundingClientRect().top
  main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top - mainTop, behavior: 'smooth' })
}
</script>
