<script setup lang="ts">
import type { Component } from 'vue';

import '@my-component-lib/theme/components/_button.scss';
import { computed, VNode } from 'vue';

const props = defineProps<{
  /**
   * 渲染的 HTML 標籤或元件
   * @default 'button'
   */
  as?: Component | string;

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

const isButton = computed(() => !props.as || props.as === 'button');
const isBlocked = computed(() => props.loading || props.disabled);

const accessibilityProps = computed(() => {
  return {
    role: isButton.value ? undefined : 'button',
    tabIndex: isButton.value ? undefined : isBlocked.value ? -1 : 0,
  };
});
</script>

<template>
  <component
    :is="as || 'button'"
    v-bind="accessibilityProps"
    :type="isButton ? 'button' : undefined"
    :disabled="isBlocked"
    class="my-button"
    :aria-busy="loading || undefined"
    :aria-disabled="isBlocked || undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-loading="loading ? '' : undefined"
  >
    <slot />
  </component>
</template>
