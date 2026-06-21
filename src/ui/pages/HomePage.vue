<template>
  <AppOverview />
  <SectionReveal>
    <BookManagementSection />
  </SectionReveal>
  <SectionReveal>
    <QrTransactionsSection />
  </SectionReveal>
  <SectionReveal>
    <ApprovalWorkflowsSection />
  </SectionReveal>
  <SectionReveal>
    <PenaltiesSection />
  </SectionReveal>
</template>

<script setup lang="ts">
import SectionReveal from '@molecules/SectionReveal.vue'
import AppOverview from '@organisms/Home/AppOverview.vue'
import BookManagementSection from '@organisms/Home/BookManagementSection.vue'
import QrTransactionsSection from '@organisms/Home/QrTransactionsSection.vue'
import ApprovalWorkflowsSection from '@organisms/Home/ApprovalWorkflowsSection.vue'
import PenaltiesSection from '@organisms/Home/PenaltiesSection.vue'
</script>
