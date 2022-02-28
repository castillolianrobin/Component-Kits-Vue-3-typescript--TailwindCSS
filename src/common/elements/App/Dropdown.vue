<template>
  <div class="relative">
    <div class="w-full cursor-pointer" @click="active = !active">
      <!-- Dropdown Activator -->
      <slot name="activator">
        <Btn>
          <slot>{{ props.label }}</slot>
        </Btn>
      </slot>
    </div>
    <!-- Dropdowns Items -->
    <transition name="items">
      <div
        v-if="active"
        class="absolute top-full max-h-80 overflow-auto bg-gray-100 shadow-lg z-40"
      >
        <slot name="dropdown">
          <div
            v-for="(item, index) in dropdownItems"
            :key="`select-item-${index}`"
            class="px-3 p-1 cursor-pointer hover:bg-gray-200 transition-colors"
            @click="onItemClick(item.value)"
          >
            {{ item.text }}
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
/** vue */
import { computed, ref, toRefs, defineProps, defineEmits, PropType } from "vue";
/** components */
import { Btn } from "./";

/** PROPS */
interface PropItemsType {
  text?: string;
  value?: unknown;
}
const props = defineProps({
  items: {
    type: Array as PropType<PropItemsType[] | string[]>,
    default: () => [] as PropItemsType[],
  },
  label: { type: String as PropType<string>, default: "" },
});
/** EVENTS */
const emit = defineEmits(["itemClick"]);

/******************************
COMPONENT STATE 
******************************/

// state of the dropdown items
const active = ref<boolean>(false);

// items to be displayed
const dropdownItems = computed<PropItemsType[]>(function (): PropItemsType[] {
  const { items } = toRefs(props);
  return items.value.map((item: PropItemsType | string) => {
    if (typeof item === "string") {
      return { value: item, text: item };
    } else {
      const value = item.value || item.text;
      const text =
        item.text ||
        typeof item.value === "string" ||
        typeof item.value === "number"
          ? (item.value as string)
          : "undefined";
      return {
        value,
        text,
      };
    }
  });
});

function onItemClick(val: unknown) {
  emit("itemClick", val);
}
</script>

<style lang="scss" scoped>
.items {
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
