<template>
  <section id="qr-transactions" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 gap-12 pb-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500">
        <span class="w-6 h-px bg-cyan-400" />
        Phase 05
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        QR <span class="text-cyan-500">Transactions</span>
      </h2>
        <p class="text-base text-slate-500 leading-relaxed">
        Two types of QR codes power the system — one per transaction and one per book.
        Students present their transaction QR to the Librarian for instant lookup, while
        book QR codes link directly to the book's edit page for fast record management.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <StepList :steps="steps" color="cyan" />
      <ImageCarousel :images="[qr1, qr2, qr3, qr4]" />
    </div>

  </section>
</template>

<script setup lang="ts">
import StepList from '@molecules/StepList.vue'
import ImageCarousel from '@molecules/ImageCarousel.vue'
import qr1 from '@/assets/images/QR Transactions/qr-1.png'
import qr2 from '@/assets/images/QR Transactions/qr-2.png'
import qr3 from '@/assets/images/QR Transactions/qr-3.png'
import qr4 from '@/assets/images/QR Transactions/qr-4.png'

const steps = [
  {
    title: 'Every Transaction Has a QR',
    desc: 'When a Library Transaction is created, the system automatically generates a unique QR code tied to that record.',
  },
  {
    title: 'Student Presents QR — Librarian Scans',
    desc: 'The student opens their My Transactions page and shows the QR to the Librarian. The Librarian scans it and the system immediately opens that specific transaction, ready for processing.',
  },
  {
    title: 'Book QR Generated on Creation',
    desc: 'When a new Book record is saved, the system auto-generates a QR code and barcode uniquely identifying that book.',
  },
  {
    title: 'Scan Book QR → Opens Edit Page',
    desc: 'The Librarian scans the QR code on the physical book. The system resolves it and navigates directly to the book\'s editing page for fast record management.',
  },
]
</script>
