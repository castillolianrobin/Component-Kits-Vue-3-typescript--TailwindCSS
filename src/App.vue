<template>
  <div class="w-screen h-screen text-gray-700">
    <transition name="redirect">
      <LayoutManager>
        <router-view v-slot="{ Component }">
          <transition name="redirect">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </LayoutManager>
    </transition>
  </div>
</template>

<script setup lang="ts">
import LayoutManager from "./common/layouts/LayoutManager.vue";
</script>

<style lang="scss">
@import "./common/styles/app";

.redirect {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
