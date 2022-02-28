<template>
  <div class="app-table d-flex flex-column">
    <!-- Table Element -->
    <table class="w-full shadow">
      <!-- Header -->
      <thead
        class="text-left"
        :class="[
          `bg-${color}`,
          color === 'white' ? 'text-black' : 'text-white',
        ]"
      >
        <!-- Header Rows -->
        <tr>
          <!-- Header Cell -->
          <th
            v-for="(header, index) in localHeaders"
            class="p-2 align-center"
            :class="header.className"
            :key="`app-table-props.header-${
              header.value || header.text
            }-${index}`"
          >
            <p class="m-0 inline truncate">
              {{ header.text || header.value || header }}
            </p>
            <!-- Sorting Icon -->
            <component
              v-if="header.sortable"
              :is="header.desc ? ArrowNarrowUpIcon : ArrowNarrowDownIcon"
              class="m-0 mx-1 app-icon-sm inline hover:opacity-60 cursor-pointer"
              @click="sort(header.value || header.text, !header.desc)"
            ></component>
          </th>
        </tr>
      </thead>
      <tr v-if="!items">
        <td class="font-bold text-center p-3" :colspan="headers.length">
          No items to show
        </td>
      </tr>
      <tbody v-else class="text-sm">
        <!-- Item Row -->
        <slot name="items" :shownItems="displayableItems">
          <tr
            v-for="(item, itemIndex) in displayableItems"
            :key="`appTableItem-${itemIndex}`"
            :class="[
              `even:bg-${color} even:bg-opacity-10`,
              hoverable
                ? `hover:bg-${color} hover:bg-opacity-50 cursor-pointer shadow transition`
                : '',
            ]"
            @click="emit('itemClick', item)"
          >
            <!-- Item Cell -->
            <slot name="item" :shownItem="item">
              <td
                v-for="(property, propertyIndex) in localHeaders"
                :key="`appTableItem-${itemIndex}-${propertyIndex}`"
                class="p-2"
              >
                <!-- Item Cell Content -->
                <slot
                  :name="`item-${property.value || propertyIndex}`"
                  :item="item"
                >
                  {{ item[property.value] || item[property.text] }}
                </slot>
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>
    </table>
    <!-- Pagination Content -->
    <Pagination
      class="mt-auto p-2"
      :class="paginationConfig.class || ''"
      :currentPage="currentPage || localCurrentPage"
      :itemsPerPage="itemsPerPage || items.length"
      :total="apiTotal || items.length"
      :hideDetails="paginationConfig.hideDetails || false"
      :centerPagination="paginationConfig.centerPagination || false"
      @update:currentPage="goToPage"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  computed,
  ref,
  toRefs,
  watch,
  PropType,
} from "vue";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/vue/solid";
import { Pagination } from "./";

export interface HeadersProp {
  text: string; // Text to be displayed as header
  value: string; //The key to match with the item
  sortable?: boolean; //Flag to make the header sortable
  desc?: boolean; //Flag to sort the data by descending order
  className?: string; // class of the header
}
export interface PaginationConfig {
  class?: string;
  hideDetails?: boolean;
  centerPagination?: boolean;
}

const props = defineProps({
  /** Color theme of the table */
  color: { type: String, default: "primary-500" },
  /**
   * Table headers to be displayed. can be String or Object.
   *
   * Object Properties:
   * - @property {String} text  - Text to be displayed as header
   * - @property {String} value - The key to match with the item
   * - @property {Boolean} sortable - Flag to make the header sortable
   * - @property {Boolean} desc  - Flag to sort the data by descending order
   */
  headers: {
    type: Array as PropType<(HeadersProp | string)[]>,
    default: () => [],
  },
  /** Flag whether to make items hoverable */
  hoverable: { type: Boolean, default: false },
  /** List of items to be displayed. Should be an array of object
   *  that matches the value of the header
   */
  items: {
    type: Object as PropType<Record<string, string | number>[]>,
    default: () => ({}),
  },
  /** Items to be displayed per page. (Not usable when using apiPage prop ) */
  itemsPerPage: { type: [Number], default: 10 },
  /**  \<V-MODEL COMPATIBLE\> current page of items to be displayed. */
  currentPage: { type: [Number], default: 0 },
  /** \<V-MODEL COMPATIBLE\> current page of items being displayed.
   * (To be used when retrieving data from the API)
   */
  apiPage: { type: [Number], default: 0 },
  /** Total number of items from the API.
   * (To be used when retrieving data from the API)
   */
  apiTotal: { type: [Number], default: 0 },
  /**
   * Configuration for the table pagination.
   *
   * Object Properties:
   * - @property {String} class  - class to be appended to the pagination component
   * - @property {Boolean} hideDetails - Hides the page information at the lower left side
   * - @property {Boolean} centerPagination - Aligns the pagination button to the middle
   */
  paginationConfig: {
    type: Object as PropType<PaginationConfig>,
    default: (): PaginationConfig => ({
      class: "",
      hideDetails: false,
      centerPagination: false,
    }),
  },
});
const { headers, currentPage, apiPage, items, itemsPerPage } = toRefs(props);

const emit = defineEmits([
  "sort",
  "update:headers",
  "update:apiPage",
  "update:currentPage",
  "itemClick",
]);

/******************************
 COMPONENT STATE 
 ******************************/

//  clone props for local use
const localHeaders = ref<HeadersProp[]>(headerToLocal());

function headerToLocal(): HeadersProp[] {
  return headers.value.map((header: HeadersProp | string): HeadersProp => {
    if (typeof header === "string") {
      return {
        text: header,
        value: header,
        className: "",
        sortable: false,
        desc: false,
      };
    } else {
      return header;
    }
  });
}
const localCurrentPage = ref<number>(currentPage.value || 1);

// items to be displayed in the table
const displayableItems = computed(() => {
  if (apiPage.value) {
    return items.value;
  } else {
    const _page = currentPage.value || localCurrentPage.value;
    const _start = itemsPerPage.value * (_page - 1);
    const _end = itemsPerPage.value * _page;
    const _items = [...items.value];
    return _items.slice(_start, _end);
  }
});

/** Sorting Logic */

function sort(header: string, desc: boolean) {
  const getMatchingHeader = (_header: HeadersProp | string): boolean => {
    if (typeof _header === "string") return false;
    else return _header.value === header || _header.text === header;
  };

  const newHeader: (HeadersProp | string)[] = [...localHeaders.value];
  const matchingHeaderIndex: number | boolean =
    newHeader.findIndex(getMatchingHeader);

  if (
    typeof matchingHeaderIndex === "number" &&
    typeof newHeader[matchingHeaderIndex] !== "string"
  ) {
    (newHeader[matchingHeaderIndex] as HeadersProp).desc = desc;
    localHeaders.value = [];
    localHeaders.value = headerToLocal();
    emit("sort", { header, desc });
    emit("update:headers", newHeader);
  }
}
// watchers for current page props (updates the local value on prop change)
watch(
  () => headers,
  () => (localHeaders.value = headerToLocal())
);

/** Pagination Logic */

function goToPage(page: number) {
  emit("update:apiPage", page);
  emit("update:currentPage", page);
  localCurrentPage.value = page;
}
// watchers for current page props (updates the local value on prop change)
watch(
  () => apiPage,
  (page) => (localCurrentPage.value = page.value)
);
watch(
  () => currentPage,
  (page) => (localCurrentPage.value = page.value)
);
</script>

<style lang="scss" scoped></style>
