<template>
  <section id="stores" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

      <div class="space-y-8">
        <div class="space-y-4 max-w-2xl">
          <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
            <span class="w-6 h-px bg-amber-400" />
            Module 02
          </span>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">
            Pinia <span class="text-amber-500">Stores</span>
          </h2>
          <p class="text-base text-slate-500 leading-relaxed">
            Global reactive state lives in <span class="font-mono text-slate-700">src/stores/</span>.
            Each store owns a slice of the application — its data, actions, and derived values —
            and any component can subscribe to it without prop drilling.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">When to Use</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Use a store when the same state needs to be read or mutated by multiple components,
            or when you want to coordinate API calls and cache results across pages.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            For local, component-specific state — keep using <span class="font-mono">ref</span>
            and <span class="font-mono">reactive</span> directly.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Anatomy</p>
          <ul class="space-y-2">
            <li v-for="p in parts" :key="p.name" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ p.name }}</span>
                <span class="text-slate-500"> — {{ p.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:mt-12">
        <FileTreeViewer root-name="stores/" :nodes="tree" />
      </div>

    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Usage Example</span>
        <span class="h-px flex-1 bg-slate-200" />
      </div>

      <p class="text-sm text-slate-500 leading-relaxed max-w-2xl">
        Define a store once with state, actions, and getters — then call
        <span class="font-mono text-slate-700">useStore()</span> inside any component to read
        or mutate it reactively.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Store Definition</p>
          <CodeBlock filename="stores/bag.ts" language="ts" :code="storeCode" />
        </div>
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Component Usage</p>
          <CodeBlock filename="BagSidebar.vue" language="vue" :code="storeUsageCode" />
        </div>
      </div>
    </div>

    <ScrollToNext target-id="composables" label="Composables" />
  </section>
</template>

<script setup lang="ts">
import FileTreeViewer, { type FileTreeNode } from '@molecules/FileTreeViewer.vue'
import CodeBlock from '@molecules/CodeBlock.vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'

const tree: FileTreeNode[] = [
  { name: 'helpers/',       color: 'text-slate-300',   tag: 'Shared',  tagColor: 'text-slate-400' },
  { name: 'bag.ts',         icon: '📄', color: 'text-amber-300' },
  { name: 'books.ts',       icon: '📄', color: 'text-amber-300' },
  { name: 'transactions.ts', icon: '📄', color: 'text-amber-300' },
  { name: 'user.ts',        icon: '📄', color: 'text-amber-300' },
]

const parts = [
  { name: 'State',    desc: 'Reactive refs holding the data the store owns.' },
  { name: 'Getters',  desc: 'Computed values derived from state for UI consumption.' },
  { name: 'Actions',  desc: 'Functions that mutate state, often calling the API layer.' },
  { name: 'Helpers',  desc: 'Pure utility logic shared across multiple stores.' },
]

const storeCode = `<span class="text-rose-300">import</span> { <span class="text-cyan-300">defineStore</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'pinia'</span>
<span class="text-rose-300">import</span> { <span class="text-cyan-300">ref</span>, <span class="text-cyan-300">computed</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'vue'</span>
<span class="text-rose-300">import type</span> { <span class="text-cyan-300">Book</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'@/types'</span>

<span class="text-rose-300">export const</span> <span class="text-cyan-300">useBagStore</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">defineStore</span>(<span class="text-amber-300">'bag'</span>, () <span class="text-slate-400">=&gt;</span> {
  <span class="text-slate-500">// state</span>
  <span class="text-rose-300">const</span> <span class="text-cyan-300">items</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">ref</span><span class="text-slate-400">&lt;</span><span class="text-cyan-300">Book</span>[]<span class="text-slate-400">&gt;</span>([])

  <span class="text-slate-500">// getters</span>
  <span class="text-rose-300">const</span> <span class="text-cyan-300">total</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">computed</span>(() <span class="text-slate-400">=&gt;</span> items.<span class="text-cyan-300">value</span>.<span class="text-emerald-300">length</span>)

  <span class="text-slate-500">// actions</span>
  <span class="text-rose-300">function</span> <span class="text-cyan-300">addBook</span>(<span class="text-emerald-300">book</span>: <span class="text-cyan-300">Book</span>) {
    items.<span class="text-cyan-300">value</span>.<span class="text-cyan-300">push</span>(book)
  }

  <span class="text-rose-300">return</span> { items, total, addBook }
})`

const storeUsageCode = `<span class="text-violet-300">&lt;template&gt;</span>
  <span class="text-violet-300">&lt;p&gt;</span>Books in bag: {{ <span class="text-cyan-300">bag</span>.<span class="text-emerald-300">total</span> }}<span class="text-violet-300">&lt;/p&gt;</span>

  <span class="text-violet-300">&lt;button</span> <span class="text-emerald-300">@click</span><span class="text-slate-400">=</span><span class="text-amber-300">"bag.addBook(book)"</span><span class="text-violet-300">&gt;</span>
    Add to Bag
  <span class="text-violet-300">&lt;/button&gt;</span>
<span class="text-violet-300">&lt;/template&gt;</span>

<span class="text-violet-300">&lt;script setup lang=</span><span class="text-amber-300">"ts"</span><span class="text-violet-300">&gt;</span>
<span class="text-rose-300">import</span> { <span class="text-cyan-300">useBagStore</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'@/stores/bag'</span>

<span class="text-rose-300">const</span> <span class="text-cyan-300">bag</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">useBagStore</span>()
<span class="text-rose-300">defineProps</span><span class="text-slate-400">&lt;</span>{ <span class="text-emerald-300">book</span>: <span class="text-cyan-300">Book</span> }<span class="text-slate-400">&gt;</span>()
<span class="text-violet-300">&lt;/script&gt;</span>`
</script>
