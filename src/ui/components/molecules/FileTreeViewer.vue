<template>
  <div class="rounded-2xl border border-slate-200 bg-slate-900 shadow-2xl overflow-hidden">
    <!-- Window chrome -->
    <div class="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/60">
      <span class="w-2.5 h-2.5 rounded-full bg-rose-400" />
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400" />
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      <span class="ml-3 text-xs font-mono text-slate-400">{{ tabName ?? rootName }}</span>
    </div>

    <div class="px-5 py-4 font-mono text-[13px] leading-7 text-slate-300">
      <div>
        <span class="text-slate-500">{{ rootIcon }}</span>
        <span class="text-slate-100"> {{ rootName }}</span>
      </div>
      <div v-for="(node, i) in nodes" :key="node.name" class="pl-4">
        <span class="text-slate-500">{{ i === nodes.length - 1 ? '└──' : '├──' }}</span>
        <span class="text-slate-500"> {{ node.icon ?? '📁' }} </span>
        <span :class="node.color ?? 'text-slate-200'">{{ node.name }}</span>
        <span
          v-if="node.tag"
          class="ml-2 text-[10px] uppercase tracking-widest"
          :class="node.tagColor ?? 'text-slate-400'"
        >
          {{ node.tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface FileTreeNode {
  name: string
  icon?: string
  color?: string
  tag?: string
  tagColor?: string
}

withDefaults(
  defineProps<{
    rootName: string
    nodes: FileTreeNode[]
    tabName?: string
    rootIcon?: string
  }>(),
  {
    rootIcon: '📁',
  },
)
</script>
