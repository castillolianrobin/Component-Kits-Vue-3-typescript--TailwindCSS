<template>
  <teleport to="#app">
    <transition name="modal">
      <!-- Modal Component -->
      <div
        v-if="modelValue"
        class="flex items-center justify-center fixed inset-0 w-screen h-screen overflow-hidden z-50"
      >
        <!-- Shadow  -->
        <div
          class="inline h-full w-full fixed inset-0 bg-black z-0"
          :class="`opacity-${bgOpacity}`"
          @click="updateModelValue(false)"
        ></div>
        <!-- Content -->
        <div class="z-50">
          <slot name="content">
            <Card>
              <slot> Modal Card </slot>
            </Card>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";
import { Card } from "./";

/** PROPS */
defineProps({
  modelValue: { type: Boolean as PropType<boolean>, default: false },
  bgOpacity: {
    type: [Number, String] as PropType<boolean | string>,
    default: 50,
  },
});

/** EMITS */
const emit = defineEmits(["update:modelValue"]);

/******************************
COMPONENT STATE 
******************************/
function updateModelValue(value: boolean) {
  emit("update:modelValue", value);
}
</script>

<style lang="scss" scoped>
.modal {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    // margin-top: -1.25rem;
  }
}
</style>
