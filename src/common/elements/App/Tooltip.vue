<template>
  <div
    class="relative inline-flex justify-center"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Hoverable Slot -->
    <div>
      <slot>
        <InformationCircleIcon
          class="inline app-icon-sm"
          :class="`text-${color}`"
        ></InformationCircleIcon>
      </slot>
    </div>
    <!-- Tooltip -->
    <transition name="fade">
      <div
        v-if="hovered"
        class="absolute"
        :class="{
          'top-full': direction === 'bottom',
          'bottom-full': direction === 'top',
          'left-full top-0 bottom-0': direction === 'right',
          'right-full': direction === 'left',
        }"
      >
        <div
          class="flex justify-center absolute"
          :class="{
            'right-0': ['top', 'bottom', 'left'].includes(direction),
            'left-0': ['top', 'bottom', 'right'].includes(direction),
            'top-0': ['bottom', 'left', 'right'].includes(direction),
            'top-1/3': ['left', 'top', 'right'].includes(direction),
          }"
        >
          <!-- Arrow -->
          <div
            class="app-tooltip-arrow"
            :class="[
              `border-${color}`,
              {
                'app-tooltip-arrow-up': direction === 'bottom',
                'app-tooltip-arrow-down': direction === 'top',
                'app-tooltip-arrow-left': direction === 'right',
                'app-tooltip-arrow-right': direction === 'left',
              },
            ]"
          ></div>
        </div>
        <!-- Text -->
        <div
          class="p-1 m-1.5 rounded block min-w-max shadow relative"
          :class="`bg-${color}`"
        >
          <!-- Tooltip Slot -->
          <slot name="content">
            <p class="block text-xs text-white">{{ tooltipText }}</p>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/solid";

defineProps({
  /** Theme color of the tooltip */
  color: { type: String as PropType<string>, default: "primary-500" },
  /** Basic text to be displayed inside the tooltip */
  tooltipText: { type: String as PropType<string>, default: "" },
  /** direction of the tooltip (top, bottom, left, right) */
  direction: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    default: "bottom",
    validator: (direction: string) =>
      ["top", "bottom", "left", "right"].includes(direction),
  },
});

// component state

const hovered = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.1s ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.app-tooltip {
  &-arrow {
    width: 0;
    height: 0;

    $arrow-size: 7px;

    &-up {
      border-left: $arrow-size solid transparent;
      border-right: $arrow-size solid transparent;
      border-bottom-width: $arrow-size;
    }
    &-down {
      border-left: $arrow-size solid transparent;
      border-right: $arrow-size solid transparent;
      border-top-width: $arrow-size;
    }

    &-left {
      border-top: $arrow-size solid transparent;
      border-bottom: $arrow-size solid transparent;
      border-right-width: $arrow-size;
    }

    &-right {
      border-top: $arrow-size solid transparent;
      border-bottom: $arrow-size solid transparent;
      border-left-width: $arrow-size;
    }
  }
}
</style>
