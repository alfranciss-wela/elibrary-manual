<template>
  <section id="borrowing" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 gap-12 pb-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
        <span class="w-6 h-px bg-emerald-400" />
        Phase 03
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Borrow <span class="text-emerald-500">Transaction</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Students browse and add books to their bag then proceed to checkout, while the Librarian
        reviews, approves or cancels the transaction and can notify the borrower. The system
        stamps timestamps, computes the due date, and flips the copy to Borrowed automatically.
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
        :class="activeTab === tab.key
          ? 'bg-emerald-500 text-white shadow-sm'
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <template v-if="activeTab === 'student'">
        <StepList :steps="studentSteps" color="emerald" />
        <ImageCarousel :images="[borrowStudent1, borrowStudent2, borrowStudent3, borrowStudent4]" />
      </template>
      <template v-else>
        <StepList :steps="librarianSteps" color="cyan" />
        <ImageCarousel :images="[borrowLibrarian1, borrowLibrarian2, borrowLibrarian3, borrowLibrarian4, borrowLibrarian5]" />
      </template>
    </div>

    <ScrollToNext target-id="return-penalties" label="Return & Penalties" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StepList from '@molecules/StepList.vue'
import ImageCarousel from '@molecules/ImageCarousel.vue'
import ScrollToNext from '@atoms/ScrollToNext.vue'
import borrowStudent1 from '@/assets/images/Borrow Transaction/Student/borrow-student-1.png'
import borrowStudent2 from '@/assets/images/Borrow Transaction/Student/borrow-student-2.png'
import borrowStudent3 from '@/assets/images/Borrow Transaction/Student/borrow-student-3.png'
import borrowStudent4 from '@/assets/images/Borrow Transaction/Student/borrow-student-4.png'
import borrowLibrarian1 from '@/assets/images/Borrow Transaction/Librarian/borrow-librarian-1.png'
import borrowLibrarian2 from '@/assets/images/Borrow Transaction/Librarian/borrow-librarian-2.png'
import borrowLibrarian3 from '@/assets/images/Borrow Transaction/Librarian/borrow-librarian-3.png'
import borrowLibrarian4 from '@/assets/images/Borrow Transaction/Librarian/borrow-librarian-4.png'
import borrowLibrarian5 from '@/assets/images/Borrow Transaction/Librarian/borrow-librarian-5.png'

const tabs: { key: 'student' | 'librarian'; label: string }[] = [
  { key: 'student', label: 'Student' },
  { key: 'librarian', label: 'Librarian' },
]

const activeTab = ref<'student' | 'librarian'>('student')

const studentSteps = [
  {
    title: 'Click Book — Added to Bag',
    desc: 'The student browses the public catalog and clicks a book to add it to their borrowing bag. Multiple books can be queued before proceeding.',
  },
  {
    title: 'Review Bag & Proceed to Checkout',
    desc: 'The student opens the bag, checks the selected books, and finalizes the list before proceeding to the checkout screen.',
  },
  {
    title: 'Choose Loan Period at Checkout',
    desc: 'During checkout, the student selects their preferred loan period. The due date is computed automatically based on the chosen duration and the Library Penalty Settings.',
  },
  {
    title: 'View Transaction History',
    desc: 'After checkout is complete, the student can view their active and past transactions — including borrow dates, due dates, and current status.',
  },
]

const librarianSteps = [
  {
    title: 'Open Pending Transaction',
    desc: 'The Librarian navigates to the Transactions list and opens the pending borrow request submitted by the student.',
  },
  {
    title: 'Approve or Cancel',
    desc: 'The Librarian reviews the transaction details and either approves it — stamping date_borrowed / time_borrowed and flipping each Book Copy to Borrowed — or cancels it if the request cannot be fulfilled.',
  },
  {
    title: 'Notify the Borrower',
    desc: 'After approving or cancelling, the Librarian can send a notification to the borrower informing them of the transaction status and any pickup instructions.',
  },
]
</script>
