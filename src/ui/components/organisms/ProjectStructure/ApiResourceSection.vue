<template>
  <section id="api-resources" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

      <div class="space-y-8">
        <div class="space-y-4 max-w-2xl">
          <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500">
            <span class="w-6 h-px bg-indigo-400" />
            Module 04
          </span>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">
            API <span class="text-indigo-500">Resources</span>
          </h2>
          <p class="text-base text-slate-500 leading-relaxed">
            The data layer lives in <span class="font-mono text-slate-700">src/data/</span> and wraps
            every backend endpoint as a typed, reactive resource. Stores and composables call into
            this layer instead of using <span class="font-mono">fetch</span> directly — keeping
            network details out of business logic.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Why a Resource?</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            A resource is a thin wrapper around an endpoint that exposes
            <span class="font-mono">data</span>, <span class="font-mono">loading</span>, and
            <span class="font-mono">error</span> refs alongside a <span class="font-mono">fetch()</span>
            (or <span class="font-mono">submit()</span>) action. Components never deal with raw
            HTTP — they just await the action and read the reactive result.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Endpoints are centralized in <span class="font-mono">factory.ts</span> so URLs change in
            one place, and response shapes are typed in <span class="font-mono">types.ts</span>.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Anatomy</p>
          <ul class="space-y-2">
            <li v-for="p in parts" :key="p.name" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ p.name }}</span>
                <span class="text-slate-500"> — {{ p.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right: file tree -->
      <div class="lg:mt-12">
        <FileTreeViewer root-name="data/" :nodes="tree" />
      </div>

    </div>

    <!-- Usage example -->
    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Usage Example</span>
        <span class="h-px flex-1 bg-slate-200" />
      </div>

      <p class="text-sm text-slate-500 leading-relaxed max-w-2xl">
        Define a resource that wraps the endpoint, then import and call it from a composable
        or store — never directly from a component.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Resource Definition</p>
          <CodeBlock filename="data/books.ts" language="ts" :code="resourceCode" />
        </div>
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Composable Usage</p>
          <CodeBlock filename="composables/useBookList.ts" language="ts" :code="resourceUsageCode" />
        </div>
      </div>
    </div>

    <ScrollToNext target-id="backend" label="Frappe REST API" />
  </section>
</template>

<script setup lang="ts">
import FileTreeViewer, { type FileTreeNode } from '@molecules/FileTreeViewer.vue'
import CodeBlock from '@molecules/CodeBlock.vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'

const tree: FileTreeNode[] = [
  { name: 'resources/',     color: 'text-indigo-300', tag: 'Domain',   tagColor: 'text-indigo-400' },
  { name: 'helpers/',       color: 'text-slate-300',  tag: 'Mappers',  tagColor: 'text-slate-400' },
  { name: 'factory.ts',     icon: '📄', color: 'text-indigo-300' },
  { name: 'types.ts',       icon: '📄', color: 'text-cyan-300' },
  { name: 'index.ts',       icon: '📄', color: 'text-slate-200' },
]

const parts = [
  { name: 'Endpoints',  desc: 'Centralized URL definitions in factory.ts.' },
  { name: 'Resources',  desc: 'Per-entity wrappers exposing reactive data + actions.' },
  { name: 'Types',      desc: 'Typed response shapes for each endpoint.' },
  { name: 'Helpers',    desc: 'Mapping and transformation utilities between API and UI shapes.' },
]

const resourceCode = `<span class="text-rose-300">import</span> { <span class="text-cyan-300">createResource</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'frappe-ui'</span>
<span class="text-rose-300">import</span> { <span class="text-cyan-300">API_ENDPOINTS</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'./factory'</span>
<span class="text-rose-300">import type</span> { <span class="text-cyan-300">Book</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'./types'</span>

<span class="text-slate-500">// Reactive wrapper around the books list endpoint</span>
<span class="text-rose-300">export const</span> <span class="text-cyan-300">booksResource</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">createResource</span><span class="text-slate-400">&lt;</span><span class="text-cyan-300">Book</span>[]<span class="text-slate-400">&gt;</span>({
  <span class="text-emerald-300">url</span>: <span class="text-cyan-300">API_ENDPOINTS</span>.<span class="text-emerald-300">books</span>.<span class="text-emerald-300">list</span>,
  <span class="text-emerald-300">method</span>: <span class="text-amber-300">'GET'</span>,
  <span class="text-emerald-300">auto</span>: <span class="text-amber-300">false</span>,
})

<span class="text-rose-300">export function</span> <span class="text-cyan-300">useBookResources</span>() {
  <span class="text-rose-300">return</span> {
    booksResource,
    <span class="text-rose-300">async</span> <span class="text-cyan-300">fetchBooks</span>(): <span class="text-cyan-300">Promise</span><span class="text-slate-400">&lt;</span><span class="text-cyan-300">Book</span>[]<span class="text-slate-400">&gt;</span> {
      <span class="text-rose-300">await</span> booksResource.<span class="text-cyan-300">fetch</span>()
      <span class="text-rose-300">return</span> (booksResource.<span class="text-cyan-300">data</span> <span class="text-rose-300">as</span> <span class="text-cyan-300">Book</span>[]) <span class="text-slate-400">??</span> []
    },
  }
}`

const resourceUsageCode = `<span class="text-rose-300">import</span> { <span class="text-cyan-300">ref</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'vue'</span>
<span class="text-rose-300">import</span> { <span class="text-cyan-300">useBookResources</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'@/data/books'</span>
<span class="text-rose-300">import type</span> { <span class="text-cyan-300">Book</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'@/types'</span>

<span class="text-rose-300">export function</span> <span class="text-cyan-300">useBookList</span>() {
  <span class="text-rose-300">const</span> <span class="text-cyan-300">books</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">ref</span><span class="text-slate-400">&lt;</span><span class="text-cyan-300">Book</span>[]<span class="text-slate-400">&gt;</span>([])
  <span class="text-rose-300">const</span> <span class="text-cyan-300">isLoading</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">ref</span>(<span class="text-amber-300">false</span>)

  <span class="text-rose-300">const</span> { fetchBooks } <span class="text-slate-400">=</span> <span class="text-cyan-300">useBookResources</span>()

  <span class="text-rose-300">async function</span> <span class="text-cyan-300">load</span>() {
    isLoading.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> <span class="text-amber-300">true</span>
    <span class="text-rose-300">try</span> {
      books.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> <span class="text-rose-300">await</span> <span class="text-cyan-300">fetchBooks</span>()
    } <span class="text-rose-300">finally</span> {
      isLoading.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> <span class="text-amber-300">false</span>
    }
  }

  <span class="text-rose-300">return</span> { books, isLoading, load }
}`
</script>
