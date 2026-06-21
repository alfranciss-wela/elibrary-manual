<template>
  <section id="return-penalties" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 gap-12 pb-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
        <span class="w-6 h-px bg-rose-400" />
        Phase 04
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Return & <span class="text-rose-500">Penalties</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        When the borrower returns the book, the Librarian records the return and the system automatically
        computes any overdue, damage, or lost penalties. Once payment is settled, the transaction is
        marked Returned and the book copy returns to Available.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <StepList :steps="steps" color="rose" />
      <ImageCarousel :images="[penalty1, penalty2, penalty3, penalty4, penalty5, penalty6]" />
    </div>

    <ScrollToNext target-id="qr-transactions" label="QR Transactions" />
  </section>
</template>

<script setup lang="ts">
import StepList from '@molecules/StepList.vue'
import ImageCarousel from '@molecules/ImageCarousel.vue'
import ScrollToNext from '@atoms/ScrollToNext.vue'
import penalty1 from '@/assets/images/Return & Penalties/penalty-1.png'
import penalty2 from '@/assets/images/Return & Penalties/penalty-2.png'
import penalty3 from '@/assets/images/Return & Penalties/penalty-3.png'
import penalty4 from '@/assets/images/Return & Penalties/penalty-4.png'
import penalty5 from '@/assets/images/Return & Penalties/penalty-5.png'
import penalty6 from '@/assets/images/Return & Penalties/penalty-6.png'


const steps = [
  {
    title: 'Record Return Date & Time',
    desc: 'The Librarian opens the transaction and sets date_returned / time_returned. The system calculates the overdue fine as days late × daily rate from Library Penalty Settings.',
  },
  {
    title: 'Damaged or Lost?',
    desc: 'If damaged, the Librarian ticks Damaged and damage_penalty is auto-set to the Book\'s cost. If lost, clicking Lost Book sets lost = 1 and copies the Book\'s cost into lost_penalty.',
  },
  {
    title: 'Review & Settle Payment',
    desc: 'The Librarian (or Librarian Head) reviews the penalty total (overdue + damage + lost), enters cash tendered, and the system auto-computes change. Remarks can note any waiver or discount.',
  },
  {
    title: 'Status: Returned',
    desc: 'Once payment is settled, transaction status = Returned, the Book Copy goes back to Available (or stays Not Available if lost/damaged beyond use), and the borrower\'s record is cleared from the Book.',
  },
]
</script>
