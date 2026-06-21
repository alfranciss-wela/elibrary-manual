<template>
  <StructureOverview />
  <SectionReveal>
    <ComponentsSection />
  </SectionReveal>
  <SectionReveal>
    <StoresSection />
  </SectionReveal>
  <SectionReveal>
    <ComposablesSection />
  </SectionReveal>
  <SectionReveal>
    <ApiResourceSection />
  </SectionReveal>
  <SectionReveal>
    <BackendSection />
  </SectionReveal>
</template>

<script setup lang="ts">
import SectionReveal from '@molecules/SectionReveal.vue'
import StructureOverview from '@organisms/ProjectStructure/StructureOverview.vue'
import ComponentsSection from '@organisms/ProjectStructure/ComponentsSection.vue'
import StoresSection from '@organisms/ProjectStructure/StoresSection.vue'
import ComposablesSection from '@organisms/ProjectStructure/ComposablesSection.vue'
import ApiResourceSection from '@organisms/ProjectStructure/ApiResourceSection.vue'
import BackendSection from '@organisms/ProjectStructure/BackendSection.vue'
</script>
