<template>
  <div class="px-10 py-5">
    <!-- Weekly Overview -->
    <div>
      <h3 class="my-2 text font-semibold">Weekly Overview</h3>
      <div class="grid grid-cols-3 gap-3 mt-1">
        <!-- Weekly Sales -->
        <App.Card header="Sales" headerColor="info-600">
          <div class="flex p-1 w-full justify-start">
            <CashIcon class="w-16 text-info-600"></CashIcon>
            <div class="p-3">
              <span class="text-5xl font-semibold">$ 120K</span>
              <span class="ml-2 text-success-500 font-bold">+ 3.12%</span>
            </div>
          </div>
        </App.Card>

        <!-- Weekly Orders -->
        <App.Card header="Orders" headerColor="alert-500">
          <div class="flex p-1 w-full justify-start">
            <ShoppingCartIcon class="w-16 text-alert-500"></ShoppingCartIcon>
            <div class="p-3">
              <span class="text-5xl font-semibold">4,012</span>
              <span class="ml-2 text-success-500 font-bold">+ 1.12%</span>
            </div>
          </div>
        </App.Card>

        <!-- Weekly Clients -->
        <App.Card header="Clients" headerColor="success-500">
          <div class="flex p-1 w-full justify-start">
            <UserGroupIcon class="w-16 text-success-500"></UserGroupIcon>
            <div class="p-3">
              <span class="text-5xl font-semibold">100</span>
              <span class="ml-2 text-error-500 font-bold">- 3.12%</span>
            </div>
          </div>
        </App.Card>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-5 mt-5">
      <!-- New Orders -->
      <div class="">
        <h3 class="my-2 text font-semibold">Sales Chart</h3>
        <App.Card>
          <LineChart v-bind="lineChartProps" :height="250"></LineChart>
        </App.Card>
      </div>

      <div class="">
        <!-- Random Doughtnut Chart -->
        <h3 class="my-2 text font-semibold">Doughtnut Chart</h3>
        <App.Card>
          <DoughnutChart v-bind="doughnutChartProps" :height="250" />
        </App.Card>
      </div>
    </div>

    <!-- Sales Analytics -->
    <div class="pt-5">
      <h3 class="my-2 text font-semibold">New Orders</h3>
      <App.Table
        hoverable
        :headers="orderHeaders"
        :items="orders"
        :itemsPerPage="5"
      >
        <template v-slot:item="{ shownItem }">
          <td class="px-3 py-1.5 font-semibold">{{ shownItem.name }}</td>
          <td class="px-3 py-1.5">{{ shownItem.qty }}</td>
          <td class="px-3 py-1.5">
            <span
              class="px-2 py-0.5 rounded-xl uppercase text-xs text-white"
              :class="{
                'bg-info-500': shownItem.status === 'pending',
                'bg-secondary-500': shownItem.status === 'canceled',
                'bg-success-500': shownItem.status === 'done',
              }"
            >
              {{ shownItem.status }}
            </span>
          </td>
          <td class="flex justify-end">
            <ChevronRightIcon
              class="app-icon text-primary-500 hover:text-white"
            ></ChevronRightIcon>
          </td>
        </template>
      </App.Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useLayout } from "@/common/composables/useLayout";
// Elements
import { App } from "@/common/elements";
// Icons
import {
  CashIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
// vue chart
import {
  LineChart,
  useLineChart,
  DoughnutChart,
  useDoughnutChart,
} from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

/** useLayout Hook */
useLayout("UserLayout");

/******************************
COMPONENT STATE 
******************************/

// Line chart
function getRandomInt() {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
}

const datacollection = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Sale Trend",
      borderColor: "purple",
      backgroundColor: "#ffc9c9",
      data: [
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
      ],
    },
  ],
};

const options = computed(() => ({
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Total Yearly Sales",
    },
  },
}));

const { lineChartProps } = useLineChart({
  chartData: datacollection,
  options,
});

// order table
const orderHeaders: { text: string; value: string }[] = [
  { text: "Name", value: "name" },
  { text: "Item Qty", value: "qty" },
  { text: "Current Status", value: "status" },
  { text: " ", value: "" },
];
const orders: { name: string; qty: number; status: string }[] = [
  { name: "Fred Smitch", qty: 3, status: "pending" },
  { name: "Jane Doe", qty: 19, status: "pending" },
  { name: "Eva Willis", qty: 19, status: "canceled" },
  { name: "George Bush", qty: 19, status: "done" },
  { name: "Fred Smitch", qty: 3, status: "pending" },
  { name: "Jane Doe", qty: 19, status: "pending" },
  { name: "George Bush", qty: 19, status: "done" },
];

// doughut chart data
const doughtnutDataValue = ref([30, 40, 60, 70, 5]);
const doughtnutLegends = computed(() => ({
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      data: doughtnutDataValue.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
}));

const doughtnutOptions = computed(() => ({
  scales: {
    myScale: {
      type: "logarithmic",
      position: "right",
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Chart.js Doughnut Chart",
    },
  },
}));

const { doughnutChartProps } = useDoughnutChart({
  chartData: doughtnutLegends,
  options: doughtnutOptions,
});
</script>

<style lang="scss" scoped></style>
