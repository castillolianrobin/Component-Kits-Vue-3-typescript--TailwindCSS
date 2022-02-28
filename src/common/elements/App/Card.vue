<template>
  <div
    class="p-1 bg-white"
    :class="{
      shadow: !props.noShadow,
      'shadow-none': props.noShadow,
      'hover:shadow-lg transition-shadow': props.hoverable,
    }"
  >
    <h1
      class="card-header text-sm font-semibold mb-1"
      :class="`text-${props.headerColor}`"
    >
      <slot name="header">{{ props.header }}</slot>
    </h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "@vue/runtime-core";
import { PropType } from "vue";

/** PROPS */
const props = defineProps({
  noShadow: { type: Boolean as PropType<boolean>, default: false },
  header: { type: String as PropType<string>, default: "" },
  headerColor: { type: String as PropType<string>, default: "primary-500" },
  hoverable: { type: Boolean as PropType<boolean>, default: false },
});
</script>
