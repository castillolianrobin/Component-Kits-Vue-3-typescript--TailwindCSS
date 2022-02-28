<template>
  <div
    class="p-2 flex items-center cursor-pointer rounded-l hover:text-primary-500 hover:bg-white transition"
    :class="{ 'bg-primary-500': props.active }"
    @click="onClick"
  >
    <slot name="icon">
      <FolderIcon class="app-icon-sm"></FolderIcon>
    </slot>
    <p class="ml-2">
      <slot>{{ props.text }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
// vue
import { defineProps, defineEmits, PropType } from "vue";
// icon
import { FolderIcon } from "@heroicons/vue/solid";

const props = defineProps({
  text: { type: String as PropType<string>, default: "" },
  active: { type: Boolean as PropType<boolean>, default: false },
});

const emit = defineEmits(["click"]);

function onClick() {
  emit("click", true);
}
</script>

<style lang="scss" scoped></style>
