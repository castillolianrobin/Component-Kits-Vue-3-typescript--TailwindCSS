<template>
  <!-- Container -->
  <div class="flex">
    <!-- Tabs -->
    <div
      v-for="(tab, index) in props.items"
      :key="`tab-${tab}-${index}`"
      class="p-1 px-3 cursor-pointer select-none transition font-semibold"
      :class="[
        activeIndex === index
          ? `border-b-2 border-${props.color} text-${props.color}`
          : `border-0 text-gray-400`,
      ]"
      @click="changeTab(index)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { defineProps, PropType, defineEmits } from "vue";
import { useInput, modelValueEvent } from "@/common/composables/useInput";
// import { updateModelValue}

const props = defineProps({
  /** for v-model  */
  modelValue: { type: Number as PropType<number>, default: 0 },
  /** Array of text to be displayed as tabs  */
  items: { type: Array as PropType<string[]>, default: () => [] },
  /** color of the active tab  */
  color: { type: String as PropType<string>, default: "primary-500" },
});

const { modelValue } = toRefs(props);

const emit = defineEmits([modelValueEvent]);

/******************************
COMPONENT STATE 
******************************/

// the index of the current active tab.
const activeIndex = ref(modelValue.value);
// Changes the tab and notifies the parent on change
function changeTab(index: number) {
  activeIndex.value = index;
  updateModelValue(index);
}
// watch modelValue change and updates activeIndex to reflect
watch(
  () => modelValue,
  (value) => {
    activeIndex.value = value.value;
  }
);

const { updateModelValue } = useInput(emit);
</script>

<style lang="scss" scoped></style>
