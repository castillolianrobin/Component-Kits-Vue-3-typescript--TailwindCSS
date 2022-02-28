<template>
  <loading
    active
    loader="bars"
    color="white"
    :opacity="0"
    :is-full-page="false"
    v-bind="$attrs"
  ></loading>
</template>

<script setup lang="ts">
import Loading from "vue-loading-overlay";
</script>
