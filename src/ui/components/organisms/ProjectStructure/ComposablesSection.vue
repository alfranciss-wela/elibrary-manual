<template>
  <section id="composables" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

      <div class="space-y-8">
        <div class="space-y-4 max-w-2xl">
          <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
            <span class="w-6 h-px bg-emerald-400" />
            Module 03
          </span>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">
            Vue <span class="text-emerald-500">Composables</span>
          </h2>
          <p class="text-base text-slate-500 leading-relaxed">
            Composables live in <span class="font-mono text-slate-700">src/composables/</span> and
            encapsulate <em>workflows</em> — multi-step business logic, async UI state, validation,
            and any reactive logic you'd want to reuse across components.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">When to Use</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Reach for a composable when a feature needs more than just data fetching — for example,
            handling loading and error state, validating input, or coordinating multiple API calls
            into a single high-level action.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Composables return reactive values and functions, so consumers stay declarative and
            template-friendly.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Anatomy</p>
          <ul class="space-y-2">
            <li v-for="p in parts" :key="p.name" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
        <FileTreeViewer root-name="composables/" :nodes="tree" />
      </div>

    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Usage Example</span>
        <span class="h-px flex-1 bg-slate-200" />
      </div>

      <p class="text-sm text-slate-500 leading-relaxed max-w-2xl">
        Write a <span class="font-mono text-slate-700">useFoo()</span> function that returns reactive
        state and actions, then destructure it inside any component to get a self-contained workflow.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Composable Definition</p>
          <CodeBlock filename="composables/useBorrow.ts" language="ts" :code="composableCode" />
        </div>
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Component Usage</p>
          <CodeBlock filename="BookCard.vue" language="vue" :code="composableUsageCode" />
        </div>
      </div>
    </div>

    <ScrollToNext target-id="api-resources" label="API Resources" />
  </section>
</template>

<script setup lang="ts">
import FileTreeViewer, { type FileTreeNode } from '@molecules/FileTreeViewer.vue'
import CodeBlock from '@molecules/CodeBlock.vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'

const tree: FileTreeNode[] = [
  { name: 'useBorrow.ts',   icon: '📄', color: 'text-emerald-300' },
  { name: 'useReturn.ts',   icon: '📄', color: 'text-emerald-300' },
  { name: 'useScanner.ts',  icon: '📄', color: 'text-emerald-300' },
  { name: 'useSearch.ts',   icon: '📄', color: 'text-emerald-300' },
  { name: 'useToast.ts',    icon: '📄', color: 'text-emerald-300' },
  { name: 'useConfirm.ts',  icon: '📄', color: 'text-emerald-300' },
]

const parts = [
  { name: 'Reactive State', desc: 'Local refs for loading, error, and result values.' },
  { name: 'Workflow Actions', desc: 'Async functions that orchestrate API calls and updates.' },
  { name: 'Validation',     desc: 'Pre-flight checks that gate execution and surface errors.' },
  { name: 'Public Surface', desc: 'A typed return object exposing only what consumers need.' },
]

const composableCode = `<span class="text-rose-300">import</span> { <span class="text-cyan-300">ref</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'vue'</span>
<span class="text-rose-300">import</span> { <span class="text-cyan-300">api</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'@/api'</span>

<span class="text-rose-300">export function</span> <span class="text-cyan-300">useBorrow</span>() {
  <span class="text-rose-300">const</span> <span class="text-cyan-300">isBorrowing</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">ref</span>(<span class="text-amber-300">false</span>)
  <span class="text-rose-300">const</span> <span class="text-cyan-300">error</span> <span class="text-slate-400">=</span> <span class="text-cyan-300">ref</span><span class="text-slate-400">&lt;</span><span class="text-cyan-300">string</span> <span class="text-slate-400">|</span> <span class="text-amber-300">null</span><span class="text-slate-400">&gt;</span>(<span class="text-amber-300">null</span>)

  <span class="text-rose-300">async function</span> <span class="text-cyan-300">borrowBook</span>(<span class="text-emerald-300">bookId</span>: <span class="text-cyan-300">string</span>) {
    isBorrowing.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> <span class="text-amber-300">true</span>
    error.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> <span class="text-amber-300">null</span>
    <span class="text-rose-300">try</span> {
      <span class="text-rose-300">await</span> api.<span class="text-cyan-300">borrow</span>(bookId)
    } <span class="text-rose-300">catch</span> (err) {
      error.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> (err <span class="text-rose-300">as</span> <span class="text-cyan-300">Error</span>).<span class="text-emerald-300">message</span>
    } <span class="text-rose-300">finally</span> {
      isBorrowing.<span class="text-cyan-300">value</span> <span class="text-slate-400">=</span> <span class="text-amber-300">false</span>
    }
  }

  <span class="text-rose-300">return</span> { isBorrowing, error, borrowBook }
}`

const composableUsageCode = `<span class="text-violet-300">&lt;template&gt;</span>
  <span class="text-violet-300">&lt;button</span>
    <span class="text-emerald-300">:disabled</span><span class="text-slate-400">=</span><span class="text-amber-300">"isBorrowing"</span>
    <span class="text-emerald-300">@click</span><span class="text-slate-400">=</span><span class="text-amber-300">"borrowBook(book.id)"</span>
  <span class="text-violet-300">&gt;</span>
    {{ <span class="text-cyan-300">isBorrowing</span> ? <span class="text-amber-300">'Borrowing…'</span> : <span class="text-amber-300">'Borrow'</span> }}
  <span class="text-violet-300">&lt;/button&gt;</span>

  <span class="text-violet-300">&lt;p</span> <span class="text-emerald-300">v-if</span><span class="text-slate-400">=</span><span class="text-amber-300">"error"</span><span class="text-violet-300">&gt;</span>{{ <span class="text-cyan-300">error</span> }}<span class="text-violet-300">&lt;/p&gt;</span>
<span class="text-violet-300">&lt;/template&gt;</span>

<span class="text-violet-300">&lt;script setup lang=</span><span class="text-amber-300">"ts"</span><span class="text-violet-300">&gt;</span>
<span class="text-rose-300">import</span> { <span class="text-cyan-300">useBorrow</span> } <span class="text-rose-300">from</span> <span class="text-amber-300">'@/composables/useBorrow'</span>

<span class="text-rose-300">const</span> { isBorrowing, error, borrowBook } <span class="text-slate-400">=</span> <span class="text-cyan-300">useBorrow</span>()
<span class="text-rose-300">defineProps</span><span class="text-slate-400">&lt;</span>{ <span class="text-emerald-300">book</span>: <span class="text-cyan-300">Book</span> }<span class="text-slate-400">&gt;</span>()
<span class="text-violet-300">&lt;/script&gt;</span>`
</script>
