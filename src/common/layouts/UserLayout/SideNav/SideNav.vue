<template>
  <div
    class="flex flex-col w-[250px] h-full row-span-2 col-start-1 row-start-1 shadow-lg bg-primary-800"
  >
    <!-- Profile -->
    <div class="flex m-2 pb-5 border-b border-primary-400">
      <img
        src="@/assets/profile-placeholder.jpg"
        alt="pfp"
        class="w-12 h-12 rounded"
      />
      <!-- Details -->
      <div
        class="flex flex-col flex-grow items-center flex-nowrap text-white text-center"
      >
        <h3 class="">Kennedy A. Willis</h3>
        <p
          class="mt-2 py-0.5 px-1 rounded text-xs font-bold font-mono bg-white text-primary-800"
        >
          Tech Supervisor
        </p>
      </div>
    </div>

    <!-- Navigation  -->
    <div class="mt-3 pl-2 text-white">
      <SideNavItems
        v-for="(item, index) in items"
        :key="`sidenavItem-${index}`"
        class="my-2"
        :text="item.text"
        :active="route.path.includes(item.url)"
        @click="goTo(item.url)"
      >
        <template v-slot:icon>
          <component :is="item.iconName" class="app-icon-sm"></component>
        </template>
      </SideNavItems>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, UserGroupIcon, CogIcon } from "@heroicons/vue/solid";
import SideNavItems from "./SideNavItems.vue";
import { RouteLocationRaw, useRoute, useRouter } from "vue-router";
import { RenderFunction } from "vue";

// use router hook;
const router = useRouter();
// use route hook;
const route = useRoute();

/******************************
COMPONENT STATE 
******************************/
interface SideNavData {
  text: string;
  iconName: string | RenderFunction;
  url: string;
}

const items: Array<SideNavData> = [
  {
    text: "Dashboard",
    iconName: HomeIcon,
    url: "/dashboard",
  },
  {
    text: "Users",
    iconName: UserGroupIcon,
    url: "/users",
  },
  {
    text: "Account Settings",
    iconName: CogIcon,
    url: "/settings",
  },
  {
    text: "Sandbox",
    iconName: CogIcon,
    url: "/sandbox",
  },
];

function goTo(url: RouteLocationRaw) {
  router.push(url);
}
</script>
