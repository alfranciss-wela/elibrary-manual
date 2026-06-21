<template>
  <section id="approval-workflows" class="min-h-screen scroll-mt-14 flex flex-col justify-start pt-12 space-y-12">

    <div class="space-y-4 max-w-2xl">
      <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
        <span class="w-6 h-px bg-amber-400" />
        Module 03
      </span>
      <h2 class="text-4xl font-black text-slate-900 leading-tight">
        Approval <span class="text-amber-500">Workflows</span>
      </h2>
      <p class="text-base text-slate-500 leading-relaxed">
        Structured approval processes to ensure controlled publishing and transaction verification.
        The Approval Workflows module enforces accountability by requiring authorized review
        before any content or transaction is finalized.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div class="space-y-8">
        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Overview</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            When a librarian submits a new book entry or a borrower submits a request, the record
            enters a review queue. Administrators can inspect the submission, leave notes, and
            either approve or reject it.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            The system maintains a complete approval history — every action is recorded with the
            reviewer's name, decision, timestamp, and optional remarks, making the process
            fully auditable and traceable.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Features</p>
          <ul class="space-y-2">
            <li v-for="f in features" :key="f.label" class="flex items-start gap-3">
              <span class="mt-1 w-4 h-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </span>
              <div class="text-sm leading-relaxed">
                <span class="font-semibold text-slate-800">{{ f.label }}</span>
                <span class="text-slate-500"> — {{ f.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <StepList :steps="steps" color="amber" />

    </div>
    <ScrollToNext target-id="penalties" label="Penalties &amp; Control" />
  </section>
</template>

<script setup lang="ts">
import ScrollToNext from '@molecules/ScrollToNext.vue'
import StepList from '@molecules/StepList.vue'
const features = [
  { label: 'Review submitted books', desc: 'Administrators review new book entries before they go public.' },
  { label: 'Approve or reject records', desc: 'Each submission can be approved, rejected, or sent back for revision.' },
  { label: 'Control catalog visibility', desc: 'Only approved books appear in the borrower-facing catalog.' },
  { label: 'Monitor approval history', desc: 'Full log of every approval action with reviewer, decision, and timestamp.' },
]

const steps = [
  { title: 'Submission Created', desc: 'A librarian submits a new book entry or a borrower places a request.' },
  { title: 'Enters Review Queue', desc: 'The record appears in the administrator\'s approval dashboard for inspection.' },
  { title: 'Reviewed and Decided', desc: 'The reviewer approves or rejects with optional notes for the submitter.' },
  { title: 'Action Logged', desc: 'The decision is permanently recorded in the audit trail with full details.' },
]
</script>

