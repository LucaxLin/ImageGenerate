<template>
  <div
    class="prompt"
    :class="props.isMobile ? 'h-[20vh]' : 'h-[15vh]'"
    b="solid 1 [--el-border-color-light] rd-3xl"
    relative
  >
    <el-input
      pr15
      hfull
      style="height:100%"
      :model-value="props.modelValue"
      @input="emit('update:modelValue', $event)"
      placeholder="请输入关键词"
      :rows="props.isMobile ? 4 : 5"
      resize="none"
      type="textarea"
    />
    <span
      i-ri-send-plane-fill
      transition-all-100
      cursor-pointer
      hover:color-primary
      absolute
      :class="props.isMobile ? 'bottom-3 right-12' : 'bottom-5 right-15'"
      :style="{ fontSize: props.isMobile ? '24px' : '30px' }"
      @click="handleSend"
    ></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  isMobile?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  send: []
}>()

function handleSend() {
  emit('send')
}
</script>

<style scoped lang="scss"></style>
