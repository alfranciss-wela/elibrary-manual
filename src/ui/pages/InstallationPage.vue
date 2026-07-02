<template>
  <InstallationOverview />
  <SectionReveal>
    <RequirementsSection />
  </SectionReveal>
  <SectionReveal>
    <SetupSection />
  </SectionReveal>
  <SectionReveal>
    <ConfigurationSection />
  </SectionReveal>
</template>

<script setup lang="ts">
import SectionReveal from '@molecules/SectionReveal.vue'
import InstallationOverview from '@organisms/Installation/InstallationOverview.vue'
import RequirementsSection from '@organisms/Installation/RequirementsSection.vue'
import SetupSection from '@organisms/Installation/SetupSection.vue'
import ConfigurationSection from '@organisms/Installation/ConfigurationSection.vue'
</script>
