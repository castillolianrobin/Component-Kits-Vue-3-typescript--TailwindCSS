<template>
  <div class="flex">
    <!-- Details -->
    <p v-if="!hideDetails">
      {{ dataStart }} - {{ dataEnd }} of {{ total }} results
    </p>
    <!-- Pagination -->
    <div
      class="ml-auto flex items-center"
      :class="{ 'mr-auto': centerPagination }"
    >
      <!-- Goto first page -->
      <ChevronDoubleLeftIcon
        class="app-icon cursor-pointer"
        :class="currentPage === 1 ? 'text-gray-400' : `hover:text-${color}`"
        @click="goToFirst"
      ></ChevronDoubleLeftIcon
      >,
      <!-- Previous -->
      <ChevronLeftIcon
        class="app-icon cursor-pointer"
        :class="currentPage === 1 ? 'text-gray-400' : `hover:text-${color}`"
        @click="goToPrevious"
      ></ChevronLeftIcon>

      <!-- first page btn -->
      <div v-if="offset > 0" class="d-inline">
        <Btn
          sm
          color="transparent"
          class="mx-1"
          :class="`text-black hover:bg-${color} hover:border-${color} hover:text-white`"
          @click="goToFirst"
        >
          1
        </Btn>
        <span v-if="offset > 1">...</span>
      </div>

      <!-- Pages -->
      <Btn
        v-for="page in displayPages"
        :key="`app-pagination-page-${page}`"
        sm
        class="mx-1"
        :class="[
          page !== currentPage
            ? `text-black hover:bg-${color} hover:border-${color} hover:text-white`
            : '',
        ]"
        :color="page !== currentPage ? 'transparent' : color"
        @click="updateCurrentPage(page)"
      >
        {{ page }}
      </Btn>

      <!-- last page btn -->
      <div
        v-if="currentPage < pages - 1 && pages > pageVisible"
        class="d-inline"
      >
        <span v-if="currentPage < pages - 2">...</span>
        <Btn
          sm
          color="transparent"
          class="mx-1"
          :class="`text-black hover:bg-${color} hover:border-${color} hover:text-white`"
          @click="goToLast"
        >
          {{ pages }}
        </Btn>
      </div>

      <!-- Next -->
      <ChevronRightIcon
        class="app-icon cursor-pointer"
        :class="currentPage === pages ? 'text-gray-400' : `hover:text-${color}`"
        @click="goToNext"
      ></ChevronRightIcon>
      <!-- Goto End -->
      <ChevronDoubleRightIcon
        class="app-icon cursor-pointer"
        :class="currentPage === pages ? 'text-gray-400' : `hover:text-${color}`"
        @click="goToLast"
      ></ChevronDoubleRightIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, toRefs, PropType } from "vue";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";

import { Btn } from "./";

/** PROPS */
const props = defineProps({
  /** Total number of items. (Not the total number of pages)  */
  total: { type: Number as PropType<number>, default: 0 },
  /** Number items included in a single page  */
  itemsPerPage: { type: Number as PropType<number>, default: 1 },
  /** Current page being displayed  */
  currentPage: { type: Number as PropType<number>, default: 0 },
  /** Color of the pagination buttons  */
  color: { type: String as PropType<string>, default: "primary-500" },
  /** Minimum number of page button to be displayed  */
  pageVisible: { type: Number as PropType<number>, default: 3 },
  /** Hides the page information at the left side  */
  hideDetails: { type: Boolean as PropType<boolean>, default: false },
  /** Aligns the pagination button to the middle  */
  centerPagination: { type: Boolean as PropType<boolean>, default: false },
});

/** EMITS */
const emit = defineEmits(["update:currentPage"]);

const { pageVisible, total, itemsPerPage, currentPage } = toRefs(props);

/******************************
 COMPONENT STATE 
 ******************************/

/** Page Details Data */

// the current first item being displayed
const dataStart = computed(() => {
  const page = currentPage.value;
  const start = itemsPerPage.value * (page - 1) + 1;
  return start;
});
// the current last item being displayed
const dataEnd = computed(() => {
  const page = currentPage.value;
  const possibleEnding = itemsPerPage.value * page;
  return possibleEnding < total.value ? possibleEnding : total.value;
});

/** Pagination Button Logic */

// Total pages created from given props (total, itemsPerPage)
const pages = computed(() => Math.ceil(total.value / itemsPerPage.value));

// pages to be displayed as button
const displayPages = computed(() => {
  const _pages = [];
  const numberOfPagesToDisplay =
    pages.value < pageVisible.value ? pages.value : pageVisible.value;
  for (let i = 0; i < numberOfPagesToDisplay; i++) {
    const page = i + 1 + offset.value;
    _pages.push(page);
  }
  return _pages;
});

// offset of the page visible
const offset = computed(() => {
  const _currentPage = currentPage.value;
  const _pageVisible = pageVisible.value;
  const _pages = pages.value;
  let offset = 0;
  if (_currentPage + 1 === _pages && _pages > _pageVisible) {
    offset = _currentPage + 1 - _pageVisible;
  } else if (_currentPage + 1 > _pageVisible && _currentPage < _pages) {
    offset = _currentPage - _pageVisible + 1;
  } else if (_currentPage > _pageVisible) {
    offset = _currentPage - _pageVisible;
  }
  return offset;
});

/** Pagination change functions */

/**
 * Updates the currentPage prop
 */
function updateCurrentPage(page: number) {
  emit("update:currentPage", page);
}

function goToNext() {
  if (currentPage.value < pages.value) {
    updateCurrentPage(currentPage.value + 1);
  }
}

function goToPrevious() {
  if (currentPage.value > 1) {
    updateCurrentPage(currentPage.value - 1);
  }
}

function goToFirst() {
  updateCurrentPage(1);
}

function goToLast() {
  updateCurrentPage(pages.value);
}
</script>

<style lang="scss" scoped></style>
z
