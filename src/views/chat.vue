<template>
  <div class="chat" h-screen w-screen overflow-hidden>
    <el-splitter :direction="isMobile ? 'vertical' : 'horizontal'">
      <!-- 左侧配置面板 -->
      <el-splitter-panel
        :size="isMobile ? 0 : '30%'"
        :min="isMobile ? 0 : '30%'"
        v-if="!isMobile"
      >
        <BotConfigComponent
          v-model="botConfig"
          v-model:token="token"
          :is-mobile="isMobile"
          @update:modelValue="updateBotConfig"
        />
      </el-splitter-panel>

      <!-- 右侧主内容区 -->
      <el-splitter-panel>
        <div class="chat-dialog" hfull p16 flex="~ col gap16">
          <ChatHistory :images="resultImgs" :loading="loading" />
          <PromptInput
            v-model="botConfig.prompt"
            :is-mobile="isMobile"
            @send="generateImage"
          />
        </div>
      </el-splitter-panel>
    </el-splitter>

    <!-- 手机端设置抽屉 -->
    <el-drawer
      v-model="settingsVisible"
      title="设置"
      :size="isMobile ? '80%' : '400px'"
      direction="rtl"
    >
      <BotConfigComponent
        v-model="botConfig"
        v-model:token="token"
        @update:modelValue="updateBotConfig"
        :is-mobile="true"
      />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

// 响应式检测设备类型
const isMobile = ref(false)

// 检测屏幕宽度
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 从父组件注入设置抽屉的显示状态
const settingsVisible = inject<Ref<boolean>>('settingsVisible', ref(false))

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const botConfig = reactive({
  model: 'Qwen/Qwen-Image',
  num_inference_steps: 20,
  guidance_scale: 7.5,
  seed: 0,
  prompt: ''
})
function updateBotConfig(e: {
  model: string
  num_inference_steps: number
  guidance_scale: number
  seed: number
  prompt: string
}) {
  botConfig.model = e.model
  botConfig.num_inference_steps = e.num_inference_steps
  botConfig.guidance_scale = e.guidance_scale
  botConfig.seed = e.seed
  botConfig.prompt = e.prompt
}

const token = ref('')
const resultImgs = ref<string[]>([])
const loading = ref(false)

function generateImage() {
  loading.value = true
  axios
    .post('https://api.siliconflow.cn/v1/images/generations', botConfig, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      resultImgs.value = res.data.images.map(
        (item: { url: string }) => item.url
      )
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped lang="scss"></style>
