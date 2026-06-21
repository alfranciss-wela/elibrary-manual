<template>
  <section id="book-setup" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 gap-12 pb-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500">
        <span class="w-6 h-px bg-indigo-400" />
        Phase 01
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Book <span class="text-indigo-500">Setup</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Before a book can be borrowed, it must be registered in the system with complete metadata
        and physical copies. The record starts in a <span class="font-semibold text-slate-700">Pending</span> state
        and stays hidden from the public catalog until it passes review.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <StepList :steps="steps" color="indigo" />
      <ImageCarousel :images="[bookSetup1, bookSetup2, bookSetup3]" />
    </div>

    <ScrollToNext target-id="approval-catalog" label="Approval & Catalog" />
  </section>
</template>

<script setup lang="ts">
import StepList from '@molecules/StepList.vue'
import ScrollToNext from '@atoms/ScrollToNext.vue'
import ImageCarousel from '@molecules/ImageCarousel.vue'
import bookSetup1 from '@/assets/images/Book Setup/book-setup-1.png'
import bookSetup2 from '@/assets/images/Book Setup/book-setup-2.png'
import bookSetup3 from '@/assets/images/Book Setup/book-setup-3.png'

const steps = [
  {
    title: 'Create Book Record',
    desc: 'A Librarian opens the Book list and fills in the accession number, ISBN, title, author, publisher, cost, subject, book type, and uploads a cover, QR, and barcode image.',
  },
  {
    title: 'Add Book Copies',
    desc: 'The Librarian adds one or more Book Copies to the record. number_of_copies auto-updates and each copy starts in Available status.',
  },
  {
    title: 'Saved as Pending',
    desc: 'The new Book is saved with approval_status = Pending and stays hidden from the public catalog until reviewed by a Librarian Head.',
  },
]
</script>
