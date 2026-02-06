<script setup lang="ts">
import '@my-component-lib/theme/components/_button.scss';
import { ref, VNode } from 'vue';

const props = defineProps<{
  /**
   * 是否為禁用
   */
  disabled?: boolean;

  /**
   * 是否為載入中
   */
  loading?: boolean;
}>();

defineSlots<{
  /**
   * 插入文字或元件
   */
  default: () => VNode;
}>();

const isHovered = ref(false);
const isActive = ref(false);
const isFocused = ref(false);
</script>

<template>
  <button
    type="button"
    class="my-button"
    :disabled="loading || disabled"
    :aria-busy="loading || undefined"
    :aria-disabled="loading || disabled || undefined"
    :data-disabled="loading || disabled ? '' : undefined"
    :data-loading="loading ? '' : undefined"
    :data-state="loading ? 'loading' : disabled ? 'disabled' : 'idle'"
    :data-hover="isHovered || undefined"
    :data-active="isActive || undefined"
    :data-focus="isFocused || undefined"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <slot />
  </button>
</template>
