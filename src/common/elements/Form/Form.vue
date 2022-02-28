<template>
  <form
    ref="appForm"
    @submit.prevent="startFormValidation"
    enctype="multipart/form-data"
  >
    <slot :errors="errors"></slot>
  </form>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, toRefs, watch } from "vue";
import { initForm, validatedEvent } from "@/common/composables/useValidation";
import { useInput, modelValueEvent } from "@/common/composables/useInput";

/** PROPS */
const props = defineProps({
  modelValue: { type: Boolean as PropType<boolean>, default: false },
});

/** EMITS */
const emit = defineEmits([validatedEvent, modelValueEvent]);

/** HOOKS */
/** useValidation hook */
const { errors, inputCtr, validInputCtr, startFormValidation, emitValidated } =
  initForm(emit);
/** useInput hook */
const { updateModelValue } = useInput(emit);

const { modelValue } = toRefs(props);

/******************************
COMPONENT STATE 
******************************/

watch(validInputCtr, () => {
  if (inputCtr.value === validInputCtr.value) {
    const newValue = errors.value.length === 0;
    if (modelValue.value !== newValue) {
      updateModelValue(newValue);
      emitValidated();
    }
  }
});
</script>

<style lang="scss" scoped></style>
