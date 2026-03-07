<template>
  <div class="bot-config" p16>
    <el-form
      :label-position="props.isMobile ? 'top' : 'right'"
      :model="props.modelValue"
      label-width="auto"
      @submit.prevent
    >
      <el-form-item label="模型">
        <el-select
          :model-value="props.modelValue.model"
          @change="updateModel"
          wfull
        >
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="种子">
        <div class="value" flex="~ items-center" wfull>
          <el-input-number
            class="flex-1"
            :model-value="props.modelValue.seed"
            @change="updateSeed"
            :min="0"
            :max="9999999999"
            wfull
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
        <el-input
          :model-value="token"
          @input="emit('update:token', $event)"
          show-password
          wfull
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
interface BotConfig {
  model: string
  num_inference_steps: number
  guidance_scale: number
  seed: number
  prompt: string
}

const props = defineProps<{
  modelValue: BotConfig
  token: string
  isMobile?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BotConfig]
  'update:token': [value: string]
}>()

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

function generateRandomSeed() {
  const min = 0
  const max = 9999999999
  emit('update:modelValue', {
    ...props.modelValue,
    seed: Math.floor(Math.random() * (max - min + 1)) + min
  })
}

function updateModel(value: string) {
  emit('update:modelValue', {
    ...props.modelValue,
    model: value
  })
}

function updateSeed(value: number | undefined) {
  if (value !== undefined) {
    emit('update:modelValue', {
      ...props.modelValue,
      seed: value
    })
  }
}
</script>

<style scoped lang="scss"></style>
