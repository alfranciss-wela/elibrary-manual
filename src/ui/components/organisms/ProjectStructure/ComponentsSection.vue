<template>
  <section id="components" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

      <div class="space-y-8">
        <div class="space-y-4 max-w-2xl">
          <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-500">
            <span class="w-6 h-px bg-violet-400" />
            Module 01
          </span>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">
            Vue <span class="text-violet-500">Components</span>
          </h2>
          <p class="text-base text-slate-500 leading-relaxed">
            Reusable UI building blocks organized by feature domain and utility.
            Components live in <span class="font-mono text-slate-700">src/components/</span> — grouped into
            domain folders for clarity, and surfaced as standalone primitives at the root for cross-feature reuse.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Organization</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Domain-specific components are grouped into subfolders (<span class="font-mono">bag/</span>,
            <span class="font-mono">transaction/</span>) so feature code stays cohesive.
            Layout shells live in <span class="font-mono">layouts/</span> and SVGs are centralized in
            <span class="font-mono">icons/</span>.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Top-level components like dialogs, dropdowns, and indicators are global primitives —
            built once, reused everywhere.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Reusables</p>
          <ul class="space-y-2">
            <li v-for="c in reusables" :key="c.name" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-violet-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ c.name }}</span>
                <span class="text-slate-500"> — {{ c.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:mt-12">
        <FileTreeViewer root-name="components/" :nodes="tree" />
      </div>

    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Usage Example</span>
        <span class="h-px flex-1 bg-slate-200" />
      </div>

      <p class="text-sm text-slate-500 leading-relaxed max-w-2xl">
        Define a small reusable component once, then import and call it from any parent.
        Props pass data in, events bubble actions out.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Reusable Component</p>
          <CodeBlock filename="Button.vue" language="vue" :code="buttonCode" />
        </div>

        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Parent Component</p>
          <CodeBlock filename="HomePage.vue" language="vue" :code="parentCode" />
        </div>

      </div>
    </div>

    <ScrollToNext target-id="stores" label="Pinia Stores" />
  </section>
</template>

<script setup lang="ts">
import FileTreeViewer, { type FileTreeNode } from '@molecules/FileTreeViewer.vue'
import CodeBlock from '@molecules/CodeBlock.vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'

const tree: FileTreeNode[] = [
  { name: 'bag/',                       color: 'text-blue-300',    tag: 'Domain',  tagColor: 'text-blue-400' },
  { name: 'icons/',                     color: 'text-slate-300',   tag: 'SVG',     tagColor: 'text-slate-400' },
  { name: 'layouts/',                   color: 'text-indigo-300',  tag: 'Shells',  tagColor: 'text-indigo-400' },
  { name: 'transaction/',               color: 'text-emerald-300', tag: 'Domain',  tagColor: 'text-emerald-400' },
  { name: 'BagSidebar.vue',             icon: '📄', color: 'text-slate-200' },
  { name: 'BookCard.vue',               icon: '📄', color: 'text-slate-200' },
  { name: 'BookGrid.vue',               icon: '📄', color: 'text-slate-200' },
  { name: 'ConfirmDialog.vue',          icon: '📄', color: 'text-slate-200' },
  { name: 'CustomDropdown.vue',         icon: '📄', color: 'text-slate-200' },
  { name: 'EditedFieldInfoButton.vue',  icon: '📄', color: 'text-slate-200' },
  { name: 'FieldReviewComment.vue',     icon: '📄', color: 'text-slate-200' },
  { name: 'LibraryDateTimeDisplay.vue', icon: '📄', color: 'text-slate-200' },
  { name: 'LoadingBar.vue',             icon: '📄', color: 'text-slate-200' },
  { name: 'LoginLottie.vue',            icon: '📄', color: 'text-slate-200' },
  { name: 'MenuDropdown.vue',           icon: '📄', color: 'text-slate-200' },
  { name: 'QRScanner.vue',              icon: '📄', color: 'text-slate-200' },
]

const reusables = [
  { name: 'Cards & Grids',     desc: 'BookCard, BookGrid — display books in lists or detailed views.' },
  { name: 'Dialogs & Menus',   desc: 'ConfirmDialog, MenuDropdown, CustomDropdown — interactive overlays and selectors.' },
  { name: 'Form Helpers',      desc: 'EditedFieldInfoButton, FieldReviewComment — augment forms with edit history and review notes.' },
  { name: 'Indicators',        desc: 'LoadingBar, LibraryDateTimeDisplay — visual feedback and formatted output.' },
  { name: 'Domain Widgets',    desc: 'BagSidebar, QRScanner — feature-specific components for borrowing flows.' },
  { name: 'Visual Accents',    desc: 'LoginLottie and others — lightweight components that add polish where it matters.' },
]

const buttonCode = `<span class="text-violet-300">&lt;template&gt;</span>
  <span class="text-violet-300">&lt;button</span>
    <span class="text-emerald-300">type</span><span class="text-slate-400">=</span><span class="text-amber-300">"button"</span>
    <span class="text-emerald-300">class</span><span class="text-slate-400">=</span><span class="text-amber-300">"px-4 py-2 rounded-lg bg-indigo-500 text-white"</span>
    <span class="text-emerald-300">@click</span><span class="text-slate-400">=</span><span class="text-amber-300">"$emit('click')"</span>
  <span class="text-violet-300">&gt;</span>
    {{ <span class="text-cyan-300">label</span> }}
  <span class="text-violet-300">&lt;/button&gt;</span>
<span class="text-violet-300">&lt;/template&gt;</span>

<span class="text-violet-300">&lt;script setup lang=</span><span class="text-amber-300">"ts"</span><span class="text-violet-300">&gt;</span>
<span class="text-rose-300">defineProps</span><span class="text-slate-400">&lt;</span>{ <span class="text-emerald-300">label</span>: <span class="text-cyan-300">string</span> }<span class="text-slate-400">&gt;</span>()
<span class="text-rose-300">defineEmits</span><span class="text-slate-400">&lt;</span>{ (<span class="text-emerald-300">e</span>: <span class="text-amber-300">'click'</span>): <span class="text-cyan-300">void</span> }<span class="text-slate-400">&gt;</span>()
<span class="text-violet-300">&lt;/script&gt;</span>`

const parentCode = `<span class="text-violet-300">&lt;template&gt;</span>
  <span class="text-slate-500">&lt;!-- Reuse the Button anywhere --&gt;</span>
  <span class="text-violet-300">&lt;Button</span>
    <span class="text-emerald-300">label</span><span class="text-slate-400">=</span><span class="text-amber-300">"Borrow Book"</span>
    <span class="text-emerald-300">@click</span><span class="text-slate-400">=</span><span class="text-amber-300">"handleBorrow"</span>
  <span class="text-violet-300">/&gt;</span>
<span class="text-violet-300">&lt;/template&gt;</span>

<span class="text-violet-300">&lt;script setup lang=</span><span class="text-amber-300">"ts"</span><span class="text-violet-300">&gt;</span>
<span class="text-rose-300">import</span> <span class="text-cyan-300">Button</span> <span class="text-rose-300">from</span> <span class="text-amber-300">'@/components/Button.vue'</span>

<span class="text-rose-300">function</span> <span class="text-cyan-300">handleBorrow</span>() {
  <span class="text-slate-500">// trigger borrow flow</span>
}
<span class="text-violet-300">&lt;/script&gt;</span>`
</script>
