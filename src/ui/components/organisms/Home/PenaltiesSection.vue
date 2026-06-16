<template>
  <section id="penalties" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
        <span class="w-6 h-px bg-rose-400" />
        Module 04
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Penalties <span class="text-rose-500">&amp; Control</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Manage policy enforcement, overdue monitoring, and damaged book handling.
        The Penalties & Control module ensures borrowers are held accountable for overdue returns,
        lost books, and damaged inventory — with automated computation and structured resolution flows.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div class="space-y-8">
        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Overview</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            Once a book's due date passes without a return, the system automatically starts computing
            a penalty based on configurable daily rates. Librarians can view outstanding fines per
            borrower and process payments or waivers directly from the dashboard.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            In cases of lost or damaged books, dedicated incident workflows guide staff through
            documenting the incident, assessing replacement costs, and updating inventory
            accordingly — ensuring accurate stock records at all times.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Features</p>
          <ul class="space-y-2">
            <li v-for="f in features" :key="f.label" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ f.label }}</span>
                <span class="text-slate-500"> — {{ f.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <StepList :steps="steps" color="rose" />

    </div>
  </section>
</template>

<script setup lang="ts">
import StepList from '@molecules/StepList.vue'

const features = [
  { label: 'Compute overdue penalties', desc: 'Fines are automatically calculated per day after the due date.' },
  { label: 'Record lost book incidents', desc: 'Staff can file a lost book report linked to the borrower and transaction.' },
  { label: 'Process damaged book reports', desc: 'Damage assessments are logged with condition notes and resolution actions.' },
  { label: 'Track penalty payments', desc: 'Librarians mark fines as paid, partially paid, or waived with audit records.' },
  { label: 'Refill or replace damaged inventory', desc: 'Damaged books trigger inventory updates to reflect actual available stock.' },
]

const steps = [
  { title: 'Due Date Passes', desc: 'The system detects the overdue status and begins computing the daily fine.' },
  { title: 'Borrower is Notified', desc: 'An outstanding penalty appears on the borrower\'s account in the system.' },
  { title: 'Librarian Reviews Fine', desc: 'Staff can view the penalty amount, transaction details, and borrower history.' },
  { title: 'Fine is Resolved', desc: 'The fine is marked as paid or waived, and the inventory status is updated.' },
]
</script>

