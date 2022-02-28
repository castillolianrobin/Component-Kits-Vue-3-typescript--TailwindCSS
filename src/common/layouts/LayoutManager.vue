<template>
  <component :is="layouts[layoutName]">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { initLayout } from "../composables/useLayout";
import * as Layouts from ".";
// initializaes the Layouts
const { layouts, layoutName } = initLayout(Layouts);
</script>
