<template>
  <section id="special-cases" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 gap-12 pb-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-500">
        <span class="w-6 h-px bg-violet-400" />
        Phase 05
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Special <span class="text-violet-500">Cases</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Not every borrow cycle follows the standard path. Reservations, cancellations, and
        unresolved returns are handled through dedicated status flows. Once a cycle ends,
        the transaction becomes an immutable historical record.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <StepList :steps="steps" color="indigo" />
      <ImageCarousel placeholder="Special Cases screenshots coming soon" />
    </div>

  </section>
</template>

<script setup lang="ts">
import StepList from '@molecules/StepList.vue'
import ImageCarousel from '@molecules/ImageCarousel.vue'

const steps = [
  {
    title: 'Reservation Flow',
    desc: 'If the borrower requested ahead, the flow starts at status = For Reservation → Reserved → Borrowed once the book is physically handed over.',
  },
  {
    title: 'Not Returned',
    desc: 'If the borrower is unreachable and hasn\'t returned the book, the Librarian Head flips the transaction to Not Returned for collections follow-up.',
  },
  {
    title: 'Cancelled',
    desc: 'If the reservation or borrow is voided before the book is taken, the transaction is set to Cancelled with no penalty applied.',
  },
  {
    title: 'Immutable Historical Record',
    desc: 'Once complete, the transaction is locked — amendable only via amended_from. Penalties are recorded for reports and the Book Copy is ready to be borrowed again from Phase 03.',
  },
]
</script>
