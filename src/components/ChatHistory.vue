<template>
  <div
    class="chatting-history"
    flex-1
    p16
    overflow-y-auto
    b="solid 1 [--el-border-color-light] rd-3xl"
    v-loading="loading"
  >
    <el-image
      v-for="(url, index) in images"
      :key="index"
      :style="imageStyle"
      :src="url"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="images"
      show-progress
      :initial-index="index"
      fit="cover"
    />
    <div v-if="images.length === 0" text-center text-gray-400 py-20>
      暂无生成的图片
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  loading: boolean
  isMobile?: boolean
}>()

const imageStyle = computed(() => {
  return {
    width: props.isMobile ? '90vw' : '30vw',
    margin: props.isMobile ? '0 0 16px 0' : '0 16px 16px 0'
  }
})
</script>

<style scoped lang="scss"></style>
