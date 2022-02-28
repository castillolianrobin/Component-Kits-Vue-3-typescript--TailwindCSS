<template>
  <component
    :is="props.to ? 'router-link' : 'button'"
    :to="props.to"
    :disabled="props.disabled || props.loading"
    class="p-2 relative border-2 rounded uppercase"
    :class="[
      `border-${props.color}`,
      props.disabled || props.loading
        ? `opacity-60`
        : `hover:bg-opacity-80 hover:border-opacity-0 transition`,
      props.outline
        ? `text-${props.textColor || props.color} ` +
          (!props.disabled &&
            !props.loading &&
            `hover:text-white hover:bg-${props.color}`)
        : `bg-${props.color} text-${
            props.textColor || (props.color === 'white' ? 'black' : 'white')
          }`,
      {
        'text-xl rounded-lg': props.lg,
        'text-xs rounded-sm': props.sm,
      },
    ]"
    v-bind="$attrs"
  >
    <!-- Loading Content -->
    <div v-if="props.loading" class="btn-loading flex left-0 absolute w-full">
      <Loading
        class="m-auto"
        :color="props.outline ? '#cccccc' : '#ffffff'"
        :height="props.lg ? 36 : props.sm ? 18 : 24"
      ></Loading>
    </div>

    <!-- Main Content -->
    <div
      class="flex items-center justify-center"
      :class="{ 'opacity-0': props.loading }"
    >
      <!-- prepend slot -->
      <div class="mr-1">
        <slot name="prepend"></slot>
      </div>
      <!-- default slot -->
      <slot>{{ props.text }}</slot>
      <!-- append slot -->
      <div class="ml-1">
        <slot name="append"></slot>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";
import Loading from "./Loading.vue";

/** PROPS */
const props = defineProps({
  to: {
    type: [String, Object] as PropType<string | RouteLocationRaw>,
    default: "",
  },
  sm: { type: Boolean as PropType<boolean>, default: false },
  lg: { type: Boolean as PropType<boolean>, default: false },
  outline: { type: Boolean as PropType<boolean>, default: false },
  text: { type: String as PropType<string>, default: "" },
  textColor: { type: String as PropType<string>, default: "" },
  color: { type: String as PropType<string>, default: "primary-500" },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  loading: { type: Boolean as PropType<boolean>, default: false },
});
</script>

<style lang="scss" scoped></style>
