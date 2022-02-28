<template>
  <form
    ref="appForm"
    @submit.prevent="startFormValidation"
    enctype="multipart/form-data"
  >
    <slot :errors="errors"></slot>
  </form>
</template>

<script>
import { toRefs, watch } from "vue";
import { initForm } from "../composables/useValidation";

export default {
  name: "AppForm",
  props: {
    modelValue: { type: Boolean, default: false },
  },

  setup(props, context) {
    
    /** useValidation hook */
    const {
      errors,
      inputCtr,
      validInputCtr,
      startFormValidation,
      emitValidated,
    } = initForm(context);
    

    const { modelValue } = toRefs(props);
    
    /******************************
    COMPONENT STATE 
    ******************************/

    function updateModelValue(value) {
      context.emit("update:modelValue", value);
    }
    watch(validInputCtr, () => {
      if (inputCtr.value === validInputCtr.value) {
        const newValue = errors.value.length === 0;
        if (modelValue.value !== newValue ) {
          updateModelValue(newValue);
          emitValidated();
        }
      }
    });

    return {
      errors,
      startFormValidation,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>