<template>
  <teleport to="body">
    <transition name="drawer">
      <div
        v-if="props.modelValue"
        class="fixed top-0 left-0 flex w-screen h-screen z-40"
        :class="{ 'justify-start': props.left, 'justify-end': props.right }"
      >
        <!-- Shadow -->
        <div
          class="w-full h-full bg-black opacity-60 absolute"
          @click="updateModelValue(false)"
        ></div>
        <!-- Drawer -->
        <div
          class="drawer-container h-full bg-white shadow-lg z-50 relative block"
          :style="`--drawer-container-width: ${drawerWidth}`"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, PropType } from "vue";

/** PROPS */
const props = defineProps({
  modelValue: { type: Boolean as PropType<boolean>, default: false },
  left: { type: Boolean as PropType<boolean>, default: false },
  right: { type: Boolean as PropType<boolean>, default: false },
  width: { type: [String, Number] as PropType<string | number>, default: 500 },
});

/** EVENTS */
const emit = defineEmits(["update:modelValue"]);

/******************************
  COMPONENT STATE 
 ******************************/

// handles the value of the drawer width
const drawerWidth = computed(() => {
  const _width = props.width;
  return isNaN(Number(_width)) ? _width : `${_width}px`;
});

function updateModelValue(flag: boolean) {
  emit("update:modelValue", flag);
}
</script>

<style lang="scss" scoped>
.drawer-container {
  width: var(--drawer-container-width);
}
.drawer {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.15s ease-out;
    .drawer-container {
      transition: width 0.2s ease-out;
    }
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    .drawer-container {
      width: 0;
    }
  }
}
</style>
