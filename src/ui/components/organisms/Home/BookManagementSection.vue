<template>
  <section id="book-management" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <!-- Section label + heading -->
    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500">
        <span class="w-6 h-px bg-indigo-400" />
        Module 01
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Book <span class="text-indigo-500">Management</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Centralized management of library resources with inventory monitoring and publication controls.
        The Book Management module is the core of the E-Library System — it provides the foundation
        for how books are registered, organized, tracked, and made available to borrowers.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- Left col -->
      <div class="space-y-8">

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Overview</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Administrators and librarians can register new books by providing key metadata such as
            title, author, ISBN, category, and cover image. Each book entry maintains a live
            availability status, allowing borrowers and staff to see whether copies are in stock,
            checked out, or archived.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Books go through an approval process before appearing in the public catalog, ensuring
            only verified and complete records are visible to borrowers.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Features</p>
          <ul class="space-y-2">
            <li v-for="f in features" :key="f.label" class="flex items-start gap-3 group">
              <span class="mt-1 w-4 h-4 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ f.label }}</span>
                <span class="text-slate-500"> — {{ f.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right col: How it works -->
      <StepList :steps="steps" color="indigo" />

    </div>
    <ScrollToNext target-id="qr-transactions" label="QR Transactions" />
  </section>
</template>

<script setup lang="ts">
import ScrollToNext from '@atoms/ScrollToNext.vue'
import StepList from '@molecules/StepList.vue'
const features = [
  { label: 'Register and organize books', desc: 'Add new titles with full metadata and cover images.' },
  { label: 'Update and archive records', desc: 'Edit book details or archive titles no longer in circulation.' },
  { label: 'Track availability and stock', desc: 'Monitor how many copies are available, borrowed, or reserved.' },
  { label: 'Categorize collections', desc: 'Group books by genre, department, or custom tags.' },
  { label: 'Approve books before catalog display', desc: 'Review and approve records before they go public.' },
]

const steps = [
  { title: 'Register a Book', desc: 'A librarian adds a new book entry with title, author, ISBN, category, and number of copies.' },
  { title: 'Submit for Approval', desc: 'The entry is submitted to an administrator for review before it appears in the catalog.' },
  { title: 'Published to Catalog', desc: 'Once approved, the book becomes searchable and available for borrowing.' },
  { title: 'Inventory Updates Automatically', desc: 'Each borrow or return transaction updates the stock count in real time.' },
]
</script>

