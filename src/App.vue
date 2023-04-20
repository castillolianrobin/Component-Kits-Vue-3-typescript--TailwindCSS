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

    <a
      href="https://github.com/castillolianrobin/vue-vite-component-kits/"
      target="_blank"
      class="px-1 rounded fixed bottom-2 left-2 bg-white bg-opacity-60 cursor-pointer hover:bg-opacity-100 hover:scale-105 transition-colors"
    >
      <img
        class="-my-1 h-9"
        src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png"
        alt=""
      />
    </a>
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
