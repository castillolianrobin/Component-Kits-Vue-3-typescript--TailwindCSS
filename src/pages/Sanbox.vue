<template>
  <div>
    <AppCard :hoverable="true" test="asda"></AppCard>
    {{ test }}
    <Form.Input
      v-model="test"
      :label="'asdada'"
      validations="required"
    ></Form.Input>
    <App.Table
      :headers="[
        { text: 'asda', value: 'test1' },
        { text: 'asdaa', value: 'test2' },
      ]"
      :items="[{ test1: 'asdad', test2: 'asdad' }]"
    ></App.Table>
    <App.Btn>resaf</App.Btn>
    <App.Pagination
      v-model:currentPage="pagination"
      :total="40"
      :itemsPerPage="3"
    ></App.Pagination>
    <Form.Checkbox :modelValue="true" label="asdad"></Form.Checkbox>
    <Form.Radio :modelValue="true" label="asdad"></Form.Radio>
    <Form.FileInput v-model="files"></Form.FileInput>
    dec: {{ dec }}
    <Form.TextField
      v-model="dec"
      type="number"
      label="decimal"
      error="asdad"
    ></Form.TextField>
    <Form v-model="multi" label="items"></Form>
    <Form.ItemsInput v-model="multi" label="items"></Form.ItemsInput>
    <Form.TextField v-model="test" label="asdad" error="asdad"></Form.TextField>
    <Form.TextArea v-model="test" label="asdad" error="asdad"></Form.TextArea>
    <Form.DatePicker v-model="dates" label="dates"></Form.DatePicker>
  </div>
</template>

<script setup lang="ts">
import { AppCard } from "../common/elements/";
import { Form, App } from "@/common/elements/";
import { ref } from "vue";

const test = ref("asdada");
const files = ref([]);
const dec = ref("1213");
const multi = ref([]);
const dates = ref("");
const pagination = ref(1);
</script>

<style scoped></style>
