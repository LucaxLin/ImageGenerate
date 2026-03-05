<template>
  <div class="chat">
    <el-splitter>
      <el-splitter-panel size="30%" min="30%">
        <div class="bot-config" p16>
          <el-form
            label-position="right"
            :model="botConfig"
            label-width="auto"
            @submit.prevent
          >
            <el-form-item label="模型">
              <el-select v-model="botConfig.model">
                <el-option
                  v-for="item in modelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option
              ></el-select>
            </el-form-item>
            <el-form-item label="种子">
              <div class="value" flex="~ items-center" wfull>
                <el-input-number
                  class="flex-1"
                  v-model="botConfig.seed"
                  :min="0"
                  :max="9999999999"
                />
                <span
                  ml16
                  text-20
                  i-material-symbols-refresh-rounded
                  transition-all-100
                  cursor-pointer
                  hover:color-primary
                  @click="generateRandomSeed"
                ></span>
              </div>
            </el-form-item>
            <el-form-item label="API秘钥">
              <el-input v-model="token"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-splitter-panel>
      <el-splitter-panel>
        <div class="chat-dialog" hfull p16 flex="~ col gap16">
          <div
            class="chatting-history"
            flex-1
            p16
            overflow-y-auto
            b="solid 1 [--el-border-color-light] rd-3xl"
            v-loading="loading"
          >
            <el-image
              v-for="(url, index) in resultImgs"
              style="width: 30vw; margin: 0 16px 16px 0"
              :src="url"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="resultImgs"
              show-progress
              :initial-index="index"
              fit="cover"
            />
          </div>
          <div
            class="prompt h-[15vh]"
            b="solid 1 [--el-border-color-light] rd-3xl"
            relative
          >
            <el-input
              pr15
              v-model="botConfig.prompt"
              placeholder="请输入关键词"
              :rows="5"
              resize="none"
              type="textarea"
            />
            <span
              i-ri-send-plane-fill
              transition-all-100
              cursor-pointer
              hover:color-primary
              absolute
              bottom-5
              right-15
              size-30
              @click="generateImage"
            ></span>
          </div>
        </div>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
const modelOptions = [
  {
    label: 'Qwen/Qwen-Image',
    value: 'Qwen/Qwen-Image'
  },
  {
    label: 'Kolors',
    value: 'Kwai-Kolors/Kolors'
  }
]
const botConfig = reactive({
  model: 'Qwen/Qwen-Image',
  num_inference_steps: 20,
  guidance_scale: 7.5,
  seed: 0,
  prompt: ''
})
const token = ref('')
function generateRandomSeed() {
  const min = 0
  const max = 9999999999
  botConfig.seed = Math.floor(Math.random() * (max - min + 1)) + min
}
const resultImgs = ref([])
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
