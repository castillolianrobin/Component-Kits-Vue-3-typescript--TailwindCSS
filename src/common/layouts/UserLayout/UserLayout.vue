<template>
  <div
    class="h-full w-full grid grid-rows-userLayout grid-cols-userLayout bg-gray-100"
  >
    <TopNav></TopNav>
    <SideNav></SideNav>
    <div class="row-start-2 col-start-2 overflow-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNav from "./TopNav.vue";
import SideNav from "./SideNav/SideNav.vue";
</script>
