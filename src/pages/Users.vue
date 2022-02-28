<template>
  <div class="p-5">
    <h3 class="my-2 text font-semibold">Users</h3>
    <App.Table :headers="headers" :items="users"></App.Table>
  </div>
</template>

<script setup lang="ts">
import { useLayout } from "@/common/composables/useLayout";
import { App } from "@/common/elements";
import { HeadersProp } from "@/common/elements/App/Table.vue";

useLayout("UserLayout");

const headers: HeadersProp[] = [
  { text: "ID", value: "id" },
  { text: "Full Name", value: "name" },
  { text: "Age", value: "age" },
];
let id = 1;
const users: { id: number; name: string; age: number }[] = [
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
  { id: id++, name: "James Mcavoy", age: 30 },
];
</script>

<style scoped></style>
