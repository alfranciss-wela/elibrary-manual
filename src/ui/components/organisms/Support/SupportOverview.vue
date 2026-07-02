<template>
  <div class="w-full py-6 flex flex-col gap-5 lg:h-[calc(100vh-3.5rem)]">

    <section class="shrink-0 relative rounded-3xl bg-slate-900 text-white p-6 sm:p-8 lg:p-10">
      <div class="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-emerald-500 blur-3xl" />
          <div class="absolute -bottom-32 -left-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
        </div>
        <div
          class="absolute inset-0 opacity-[0.08]"
          style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 24px 24px;"
        />
      </div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div class="space-y-5">
          <AppBadge color="glass" dot class="uppercase tracking-widest">
            Active · Open for questions
          </AppBadge>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]">
            Got a question?<br>
            <span class="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              We're a message away.
            </span>
          </h1>

          <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Two humans actually read every message — no chatbot, no ticket queue.
            Reach out through email or Discord and we'll get back fast.
          </p>

          <div class="relative z-20 flex flex-wrap items-center gap-3 pt-1">
            <a
              :href="GMAIL_URL"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-bold no-underline transition-all duration-200"
              :class="isDesktop ? 'hover:bg-slate-100 hover:-translate-y-0.5' : ''"
            >
              <MailIcon class="w-4 h-4" />
              Send a message
            </a>
            <AppDropdown
              label="Chat with us"
              :icon="DiscordIcon"
              menu-title="Choose who to contact"
              :options="discordOptions"
              :button-class="discordButtonClass"
              @select="openDiscordUser"
            />
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end">
          <div class="relative flex -space-x-6">
            <ProfileAvatar
              v-for="(dev, i) in devs"
              :key="dev.name"
              :avatar="dev.avatar"
              :name="dev.name"
              :ring="dev.ring"
              :z-index="devs.length - i"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] gap-y-2 md:gap-x-2 items-stretch">
      <template v-for="(channel, i) in channels" :key="channel.label">
        <span
          v-if="i > 0"
          class="hidden md:block w-px bg-slate-200 my-6"
          aria-hidden="true"
        />
        <ContactChannelCard
          :label="channel.label"
          :handle="channel.handle"
          :desc="channel.desc"
          :eta="channel.eta"
          :cta="channel.cta"
          :icon="channel.icon"
          :icon-bg="channel.iconBg"
          :icon-color="channel.iconColor"
          :bg-gradient="channel.bgGradient"
          :dot-color="channel.dotColor"
          :status-dot="channel.statusDot"
          :href="channel.href"
          :external="channel.external"
          :on-click="channel.onClick"
          :index="i + 1"
          :total="channels.length"
        />
      </template>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import AppBadge from '@atoms/AppBadge.vue'
import ContactChannelCard from '@molecules/ContactChannelCard.vue'
import AppDropdown from '@molecules/AppDropdown.vue'
import ProfileAvatar from '@molecules/ProfileAvatar.vue'
import { useBreakpoint } from '@composables/useBreakpoint'

const { isDesktop } = useBreakpoint()

const discordButtonClass = computed(() => {
  const hover = isDesktop.value ? 'hover:-translate-y-0.5 hover:bg-[#4752c4]' : ''
  return `bg-[#5865F2] text-white shadow-sm ${hover}`
})

const devs = [
  {
    name: 'Clevane',
    avatar: 'https://avatars.githubusercontent.com/u/182577847?v=4',
    ring: 'from-indigo-400 to-violet-400',
  },
  {
    name: 'Alfranciss',
    avatar: 'https://avatars.githubusercontent.com/u/186532736?v=4',
    ring: 'from-emerald-400 to-cyan-400',
  },
]

const team = [
  {
    id: 'alfranciss',
    name: 'Alfranciss',
    discordUrl: 'https://discordapp.com/743739188628684851',
  },
  {
    id: 'clevane',
    name: 'Clevane',
    discordUrl: 'https://discordapp.com/369653152439468043',
  },
] as const

const discordOptions = team.map(member => ({
  id: member.id,
  label: member.name,
  avatar: devs.find(d => d.name === member.name)?.avatar,
}))

const MailIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }),
])
const DiscordIcon = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' }),
])
const GithubIcon = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' }),
])

const GMAIL_URL = 'https://gmail.com'
const GITHUB_URL = 'https://github.com'
const DISCORD_APP_URL = 'discord://-/channels/@me'
const DISCORD_WEB_URL = 'https://discord.com/channels/@me'

function discordUserId(url: string) {
  return url.split('/').filter(Boolean).pop() ?? ''
}

function openDiscordUser(memberId: string) {
  const member = team.find(m => m.id === memberId)
  if (!member) return

  const userId = discordUserId(member.discordUrl)
  const appUrl = userId ? `discord://-/users/${userId}` : 'discord://-/channels/@me'
  const webUrl = member.discordUrl

  let appOpened = false
  const onBlur = () => { appOpened = true }
  window.addEventListener('blur', onBlur, { once: true })

  window.location.href = appUrl

  setTimeout(() => {
    window.removeEventListener('blur', onBlur)
    if (!appOpened) window.open(webUrl, '_blank', 'noopener')
  }, 700)
}

function openDiscord(e: MouseEvent) {
  e.preventDefault()

  let appOpened = false
  const onBlur = () => { appOpened = true }
  window.addEventListener('blur', onBlur, { once: true })

  window.location.href = DISCORD_APP_URL

  setTimeout(() => {
    window.removeEventListener('blur', onBlur)
    if (!appOpened) window.open(DISCORD_WEB_URL, '_blank', 'noopener')
  }, 700)
}

const channels = [
  {
    label: 'Email',
    handle: 'gmail.com',
    desc: 'Best for detailed bug reports, account questions, or anything that needs screenshots and full context.',
    eta: 'Replies in 24h',
    cta: 'Open Gmail',
    icon: MailIcon,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    bgGradient: 'bg-gradient-to-br from-indigo-50 via-white to-violet-50',
    dotColor: 'bg-indigo-400',
    statusDot: 'bg-emerald-400',
    href: 'https://gmail.com',
    external: true,
    onClick: undefined,
  },
  {
    label: 'Discord',
    handle: 'discord.com',
    desc: 'Real-time chat for quick questions and pairing sessions. Opens the desktop app if installed.',
    eta: 'Live now',
    cta: 'Open Discord',
    icon: DiscordIcon,
    iconBg: 'bg-violet-100',
    iconColor: 'text-[#5865F2]',
    bgGradient: 'bg-gradient-to-br from-violet-50 via-white to-indigo-50',
    dotColor: 'bg-violet-400',
    statusDot: 'bg-emerald-400 animate-pulse',
    href: DISCORD_WEB_URL,
    external: true,
    onClick: openDiscord,
  },
  {
    label: 'GitHub',
    handle: 'github.com',
    desc: 'File issues, suggest features, or browse the source. Public-facing and version controlled.',
    eta: 'Replies in 48h',
    cta: 'Open GitHub',
    icon: GithubIcon,
    iconBg: 'bg-slate-900',
    iconColor: 'text-white',
    bgGradient: 'bg-gradient-to-br from-slate-100 via-white to-slate-50',
    dotColor: 'bg-slate-700',
    statusDot: 'bg-slate-400',
    href: GITHUB_URL,
    external: true,
    onClick: undefined,
  },
]
</script>
