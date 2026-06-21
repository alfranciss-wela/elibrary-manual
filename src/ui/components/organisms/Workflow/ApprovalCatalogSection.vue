<template>
  <section id="approval-catalog" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 gap-12 pb-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
        <span class="w-6 h-px bg-amber-400" />
        Phase 02
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Approval & <span class="text-amber-500">Catalog</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        The Librarian Head reviews pending books and decides whether to publish them to the public catalog.
        Reviewers can leave per-field comments, and Librarians can track exactly which fields were changed
        before resubmitting. Approved books become searchable and available for borrowing.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <StepList :steps="steps" color="amber" />
      <ImageCarousel :images="[approval1, approval2, approval3, approval4, approval5, approval6, approval7, approval8]" />
    </div>

    <ScrollToNext target-id="borrowing" label="Borrowing" />
  </section>
</template>

<script setup lang="ts">
import StepList from '@molecules/StepList.vue'
import ImageCarousel from '@molecules/ImageCarousel.vue'
import ScrollToNext from '@molecules/ScrollToNext.vue'
import approval1 from '@/assets/images/Approval & Catalog Setup/approval-1.png'
import approval2 from '@/assets/images/Approval & Catalog Setup/approval-2.png'
import approval3 from '@/assets/images/Approval & Catalog Setup/approval-3.png'
import approval4 from '@/assets/images/Approval & Catalog Setup/approval-4.png'
import approval5 from '@/assets/images/Approval & Catalog Setup/approval-5.png'
import approval6 from '@/assets/images/Approval & Catalog Setup/approval-6.png'
import approval7 from '@/assets/images/Approval & Catalog Setup/approval-7.png'
import approval8 from '@/assets/images/Approval & Catalog Setup/approval-8.png'

const steps = [
  {
    title: 'Librarian Head Reviews & Comments',
    desc: 'The Librarian Head opens the pending Book, checks all metadata, and can leave inline comments on specific fields (e.g. "ISBN looks incorrect"). The book is then Approved or sent back as Rejected / Changes Requested.',
  },
  {
    title: 'Librarian Sees Inline Feedback',
    desc: 'When rejected, the Librarian opens the record and sees reviewer comments pinned directly next to each flagged field — no guessing what needs fixing.',
  },
  {
    title: 'Edit History Per Field',
    desc: 'Every changed field shows a history indicator. The Librarian can view the previous value alongside the new one to verify corrections before resubmitting for another review cycle.',
  },
  {
    title: 'Approved & Published to Catalog',
    desc: 'Once approved, show_on_list = 1 and the Book appears in the public catalog. Students, Teachers, and Library Users can browse, search, and see real-time copy availability.',
  },
]
</script>
