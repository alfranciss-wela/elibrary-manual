<template>
  <section id="qr-transactions" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
        <span class="w-6 h-px bg-emerald-400" />
        Module 02
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        QR <span class="text-emerald-500">Transactions</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Fast and secure borrowing and returning of books through QR-based processing.
        The QR Transactions module replaces manual entry with instant scan-based workflows,
        reducing transaction time and minimizing human error.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div class="space-y-8">
        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Overview</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Every book registered in the system is assigned a unique QR code. When a borrower
            initiates a transaction, the librarian scans the book's QR code along with the
            borrower's account QR to complete the process in seconds.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Each transaction generates a reference record that can be reviewed later for auditing,
            dispute resolution, or reporting. The system validates each scan against active records
            to prevent unauthorized transactions.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Features</p>
          <ul class="space-y-2">
            <li v-for="f in features" :key="f.label" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ f.label }}</span>
                <span class="text-slate-500"> — {{ f.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <StepList :steps="steps" color="emerald" />

    </div>
    <ScrollToNext target-id="approval-workflows" label="Approval Workflows" />
  </section>
</template>

<script setup lang="ts">
import ScrollToNext from '@molecules/ScrollToNext.vue'
import StepList from '@molecules/StepList.vue'
const features = [
  { label: 'Generate QR codes for books', desc: 'Each book automatically receives a unique scannable QR code on registration.' },
  { label: 'Generate transaction QR references', desc: 'Each completed transaction is logged with a unique reference code.' },
  { label: 'Validate transaction records', desc: 'System checks scan data against active records before confirming any transaction.' },
  { label: 'Accelerate circulation processes', desc: 'Reduces counter time from minutes to seconds per transaction.' },
]

const steps = [
  { title: 'Book is Registered', desc: 'A QR code is generated and attached to the book entry in the catalog.' },
  { title: 'Borrower Initiates Request', desc: 'The borrower presents their account QR and the book QR to the librarian.' },
  { title: 'Librarian Scans Both Codes', desc: 'The system validates both QR codes and confirms the transaction.' },
  { title: 'Record is Logged', desc: 'A timestamped transaction record is stored and available for review.' },
]
</script>

