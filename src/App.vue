<script setup lang="ts">
import { useDark, useMediaQuery } from '@vueuse/core'
import { Analytics } from '@vercel/analytics/vue'
const isDark = useDark()
const isDesktop = useMediaQuery('(min-width: 769px)')
const isMobile = computed(() => !isDesktop.value)

// 提供打开设置的方法
const settingsVisible = ref(false)

function openSettings() {
  settingsVisible.value = true
}

provide('settingsVisible', settingsVisible)
</script>

<template>
  <Analytics />
  <div hfull flex="~ col justify-center items-center">
    <div class="top" wfull p-8 flex="~ justify-between items-center">
      <div class="logo-container" flex="~ items-center" flex-1 md:flex-none>
        <router-link
          to="/"
          flex="~ items-center"
          gap-12
          decoration-none
          cursor-pointer
          hover:opacity-80
        >
          <img
            :src="isDark ? '/logo-dark.png' : '/logo-light.png'"
            alt="Logo"
            class="logo h-40 w-auto object-contain md:h-28"
          />
          <span v-if="isDesktop" text-5xl font-bold>AI图像生成</span>
        </router-link>
      </div>
      <div
        class="nav"
        flex="~ [10] justify-center gap-32 items-center md:gap-16 md:text-sm sm:gap-12 sm:text-xs"
      >
        <router-link to="/chat">聊天</router-link>
        <router-link to="/gallary">画廊</router-link>
      </div>
      <div
        class="right"
        flex="~ 1 justify-end items-center md:flex-none"
        gap-12
      >
        <div
          v-if="$route.path === '/chat' && isMobile"
          @click="openSettings"
          cursor-pointer
          i-carbon-settings
        ></div>
        <toggleDark></toggleDark>
      </div>
    </div>
    <div flex-1 wfull overflow-auto>
      <RouterView class="animate-fadeIn" hfull />
    </div>
  </div>
</template>

<style scoped></style>
