<template>
  <section id="backend" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

      <div class="space-y-8">
        <div class="space-y-4 max-w-2xl">
          <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
            <span class="w-6 h-px bg-rose-400" />
            Module 05
          </span>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">
            Frappe <span class="text-rose-500">REST API</span>
          </h2>
          <p class="text-base text-slate-500 leading-relaxed">
            The backend is a <span class="font-semibold text-slate-700">Frappe 15</span> app that
            exposes Python functions as REST endpoints. The frontend never speaks to the database
            directly — every request goes through a whitelisted method that validates input,
            queries DocTypes, and returns plain JSON.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">URL Convention</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Every endpoint follows the same pattern:
            <span class="font-mono text-slate-700">/api/method/&lt;app&gt;.api.&lt;module&gt;.&lt;function&gt;</span>.
            Frappe handles routing, auth, CSRF, and serialization — your Python function just
            returns a dict or list.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Functions are organized by domain (<span class="font-mono">books.py</span>,
            <span class="font-mono">transactions.py</span>) and reuse shared helpers in
            <span class="font-mono">utils/</span> and <span class="font-mono">queries/</span>.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Conventions</p>
          <ul class="space-y-2">
            <li v-for="p in parts" :key="p.name" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500" />
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
        <FileTreeViewer root-name="elibrary/api/" :nodes="tree" />
      </div>

    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Usage Example</span>
        <span class="h-px flex-1 bg-slate-200" />
      </div>

      <p class="text-sm text-slate-500 leading-relaxed max-w-2xl">
        Define a Python function on the backend, decorate it with
        <span class="font-mono text-slate-700">@frappe.whitelist()</span>, and reference it from
        the frontend's endpoint factory — that's all it takes to add a new API.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Backend Endpoint</p>
          <CodeBlock filename="elibrary/api/books.py" language="py" :code="backendCode" />
        </div>
        <div class="space-y-2">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Frontend Wiring</p>
          <CodeBlock filename="data/factory.ts" language="ts" :code="frontendCode" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FileTreeViewer, { type FileTreeNode } from '@molecules/FileTreeViewer.vue'
import CodeBlock from '@molecules/CodeBlock.vue'

const tree: FileTreeNode[] = [
  { name: 'queries/',       color: 'text-slate-300', tag: 'DB',       tagColor: 'text-slate-400' },
  { name: 'utils/',         color: 'text-slate-300', tag: 'Helpers',  tagColor: 'text-slate-400' },
  { name: 'books.py',       icon: '📄', color: 'text-rose-300' },
  { name: 'transactions.py', icon: '📄', color: 'text-rose-300' },
  { name: 'users.py',       icon: '📄', color: 'text-rose-300' },
  { name: 'penalties.py',   icon: '📄', color: 'text-rose-300' },
  { name: 'settings.py',    icon: '📄', color: 'text-rose-300' },
]

const parts = [
  { name: 'Whitelisted Methods', desc: '@frappe.whitelist() exposes a Python function as a REST endpoint.' },
  { name: 'Type Hints',          desc: 'All function signatures use Python type hints for clarity and safety.' },
  { name: 'Standard Errors',     desc: 'Every endpoint wraps logic in try/except and logs via frappe.log_error.' },
  { name: 'DocType Queries',     desc: 'frappe.get_all and Query Builder are used instead of raw SQL.' },
]

const backendCode = `<span class="text-rose-300">import</span> frappe
<span class="text-rose-300">from</span> typing <span class="text-rose-300">import</span> <span class="text-cyan-300">List</span>, <span class="text-cyan-300">Dict</span>, <span class="text-cyan-300">Any</span>

<span class="text-emerald-300">@frappe.whitelist()</span>
<span class="text-rose-300">def</span> <span class="text-cyan-300">list_books</span>() <span class="text-slate-400">-&gt;</span> <span class="text-cyan-300">List</span>[<span class="text-cyan-300">Dict</span>[<span class="text-cyan-300">str</span>, <span class="text-cyan-300">Any</span>]]:
    <span class="text-amber-300">"""List all Library Book records ordered by title."""</span>
    <span class="text-rose-300">try</span>:
        <span class="text-rose-300">return</span> frappe.<span class="text-cyan-300">get_all</span>(
            <span class="text-amber-300">"Library Book"</span>,
            <span class="text-emerald-300">fields</span><span class="text-slate-400">=</span>[<span class="text-amber-300">"name"</span>, <span class="text-amber-300">"title"</span>, <span class="text-amber-300">"author"</span>, <span class="text-amber-300">"isbn"</span>, <span class="text-amber-300">"available_copies"</span>],
            <span class="text-emerald-300">order_by</span><span class="text-slate-400">=</span><span class="text-amber-300">"title asc"</span>,
        )
    <span class="text-rose-300">except</span> <span class="text-cyan-300">Exception</span> <span class="text-rose-300">as</span> e:
        frappe.<span class="text-cyan-300">log_error</span>(
            <span class="text-emerald-300">message</span><span class="text-slate-400">=</span><span class="text-amber-300">f"Error listing books: {str(e)}"</span>,
            <span class="text-emerald-300">title</span><span class="text-slate-400">=</span><span class="text-amber-300">"Error listing books"</span>,
        )
        <span class="text-rose-300">return</span> []`

const frontendCode = `<span class="text-slate-500">// Centralized endpoint URLs — change in one place</span>
<span class="text-rose-300">export const</span> <span class="text-cyan-300">API_ENDPOINTS</span> <span class="text-slate-400">=</span> {
  <span class="text-emerald-300">books</span>: {
    <span class="text-emerald-300">list</span>: <span class="text-amber-300">'/api/method/elibrary.api.books.list_books'</span>,
    <span class="text-emerald-300">get</span>:  <span class="text-amber-300">'/api/method/elibrary.api.books.get_book'</span>,
  },
  <span class="text-emerald-300">transactions</span>: {
    <span class="text-emerald-300">create</span>: <span class="text-amber-300">'/api/method/elibrary.api.transactions.create'</span>,
    <span class="text-emerald-300">list</span>:   <span class="text-amber-300">'/api/method/elibrary.api.transactions.list_transactions'</span>,
  },
} <span class="text-rose-300">as const</span>

<span class="text-slate-500">// Consumed by resources like data/books.ts</span>
<span class="text-slate-500">// → createResource({ url: API_ENDPOINTS.books.list, ... })</span>`
</script>
