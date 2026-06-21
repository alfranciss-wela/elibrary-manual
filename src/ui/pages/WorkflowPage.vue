<template>
  <WorkflowOverview />
  <SectionReveal>
    <BookSetupSection />
  </SectionReveal>
  <SectionReveal>
    <ApprovalCatalogSection />
  </SectionReveal>
  <SectionReveal>
    <BorrowingSection />
  </SectionReveal>
  <SectionReveal>
    <ReturnPenaltiesSection />
  </SectionReveal>
  <SectionReveal>
    <QrTransactionSection />
  </SectionReveal>
</template>

<script setup lang="ts">
import SectionReveal from '@molecules/SectionReveal.vue'
import WorkflowOverview from '@organisms/Workflow/WorkflowOverview.vue'
import BookSetupSection from '@organisms/Workflow/BookSetupSection.vue'
import ApprovalCatalogSection from '@organisms/Workflow/ApprovalCatalogSection.vue'
import BorrowingSection from '@organisms/Workflow/BorrowingSection.vue'
import ReturnPenaltiesSection from '@organisms/Workflow/ReturnPenaltiesSection.vue'
import QrTransactionSection from '@organisms/Workflow/QrTransactionSection.vue'
</script>
