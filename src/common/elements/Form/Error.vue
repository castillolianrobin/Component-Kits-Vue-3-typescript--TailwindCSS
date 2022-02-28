<template>
  <span
    class="text-left block font-light"
    :class="[
      `text-${props.color}`,
      { 'text-sm': props.sm, 'text-lg': props.lg },
    ]"
  >
    <transition name="error" mode="out-in">
      <slot v-if="props.error">
        {{ props.error }}
      </slot>
    </transition>
    <span class="inline-block"></span>
  </span>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";

const props = defineProps({
  error: { type: [String, Boolean] as PropType<string | boolean>, default: "" },
  lg: { type: Boolean as PropType<boolean>, default: false },
  sm: { type: Boolean as PropType<boolean>, default: false },
  color: { type: String as PropType<string>, default: "error-500" },
});
</script>

<style scoped></style>
