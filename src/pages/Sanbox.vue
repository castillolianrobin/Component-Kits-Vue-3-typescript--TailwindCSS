<template>
  <div class="p-5">
    <!-- Buttons -->
    <div>
      <h1 class="mb-5 text-center text-2xl font-semibold uppercase">
        Sandbox:
      </h1>
      <App.Card hoverable class="mb-5">
        <p>This is a card</p>
      </App.Card>

      <h2 class="mt-5 mb-2 font-semibold">Button Sample</h2>
      <App.Btn sm>
        <template v-slot:prepend>
          <ArrowCircleDownIcon class="app-icon-sm"></ArrowCircleDownIcon>
        </template>
        Small Button
      </App.Btn>
      <App.Btn lg>
        <template v-slot:prepend>
          <ArrowCircleDownIcon class="app-icon-lg"></ArrowCircleDownIcon>
        </template>
        Large Button
      </App.Btn>
      <App.Btn>
        <template v-slot:prepend>
          <ArrowCircleDownIcon class="app-icon"></ArrowCircleDownIcon>
          <!-- <AppIcon icon="ArrowCircleDownIcon" class="h-6 w-6" /> -->
        </template>
        Primary Button
      </App.Btn>
      <App.Btn outline>Outline Button</App.Btn>
      <App.Btn outline disabled> Outline Button Disabled </App.Btn>
      <App.Btn disabled>Disabled Button</App.Btn>
      <App.Btn color="secondary-500">Secondary Button</App.Btn>
      <App.Btn color="alert-500">warning Button</App.Btn>
      <App.Btn color="error-500">danger Button</App.Btn>
      <App.Btn color="success-500">success Button</App.Btn>
      <App.Btn color="success-500" loading>success Button</App.Btn>
      <App.Btn outline color="success-500" loading lg>success Button</App.Btn>
      <App.Btn outline color="success-500" loading sm>success Button</App.Btn>
      <AppLoading v-if="false"></AppLoading>
    </div>

    <div class="m-4">
      <Form.Input validateOnChange validations="" error="test"></Form.Input>
      <h2 class="mb-2 underline font-bold">FORM SAMPLE:</h2>
      <Form.Form v-model="form">
        <Form.Input
          v-model="test"
          validateByForm
          validateOnChange
          name="Test"
          label="Label Here"
          validations="required"
        ></Form.Input>
        <div class="mt-2">
          <Form.Checkbox v-model="checkbox" label="test"></Form.Checkbox>
          <Form.Checkbox
            v-model="checkboxItem"
            primaryLabel="checkbox"
            :items="[
              { value: 'Test', label: 'Test Value' },
              { value: 'asdad', label: 'asdaTest Value' },
            ]"
          >
          </Form.Checkbox>
          <Form.Radio
            v-model="radio"
            primaryLabel="radio"
            :items="[
              { value: 'Test', label: 'Test Value' },
              { value: 'asdad', label: 'asdaTest Value' },
            ]"
          ></Form.Radio>
          <!-- <AppFormCheckbox v-model="checkTest" value="toinks" label="asdad"></AppFormCheckbox> -->
          <!-- <AppFormRadio></AppFormRadio> -->
          checkbox items: {{ checkboxItem }}
        </div>

        <Form.Select
          v-model="formSelect"
          label="Select"
          :items="[
            { value: 'asdas', text: 'asdasd' },
            { value: 'asssdas', text: 'asdasd 2' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasdsa 3' },
          ]"
        ></Form.Select>

        <App.Dropdown
          label="dropdown"
          :items="[
            { value: 'asdas', text: 'asdasd' },
            { value: 'asssdas', text: 'asdasd 2' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasdsa 3' },
          ]"
        >
        </App.Dropdown>
        <Form.ItemsInput v-model="formItems" label="asdas"></Form.ItemsInput>
        <Form.FileInput
          v-model="formFile"
          label="adas"
          validations="required"
          validateOnChange
        ></Form.FileInput>
        {{ formFile }}
        <Form.DatePicker v-model="formDate"></Form.DatePicker>
        {{ formDate }}
        <Form.TextField type="decimal" v-model="formDecimal"></Form.TextField>
        <Form.Input v-model="formDecimal"></Form.Input>
        {{ formDecimal }}
        <Form.TextArea v-model="formArea"></Form.TextArea>
        <App.Btn submit>Submit</App.Btn>
      </Form.Form>

      <App.Modal v-model="modal">
        test
        <XIcon @click="modal = false"></XIcon>
      </App.Modal>
      <App.Btn @click="modal = !modal">Toggle Modal</App.Btn>
      <App.Pagination
        v-model:currentPage="page"
        :pageVisible="4"
        :itemsPerPage="1"
        :total="23"
      ></App.Pagination>

      <App.Table
        hoverable
        v-model:currentPage="tablePage"
        :headers="['header1', 'header2', 'header3']"
        :items="[
          { header1: 'item 1', header2: 'item 2', header3: 'item 3' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
          { header1: 'item 2', header2: 'item 3', header3: 'item 5' },
        ]"
      ></App.Table>

      <App.Btn @click="tablePage = 1">{{ tablePage }}</App.Btn>

      <App.Tabs
        v-model="tabIndex"
        :items="['tab 1', 'tab 2', 'tab 3']"
      ></App.Tabs>
      <App.Tooltip tooltipText="sfsfsfs asda ad add ad asd" direction="right">
        <template v-slot:content>
          <div class="text-xs text-white">
            <p>1asdadad</p>
            <p>2asdadad</p>
            <p>3asdadad</p>
            <p>4asdadad</p>
            <p>5asdadad</p>
            <p>6asdadad</p>
            <p>7dfgd dfgdf gasdadad</p>
          </div>
        </template>
      </App.Tooltip>
      <App.Steps
        v-model="step"
        :stepText="['Step 1', 'Step 2', 'Step 3']"
      ></App.Steps>

      <App.Drawer v-model="drawer">
        <p>Drawer here</p>
      </App.Drawer>

      <App.Btn @click="drawer = !drawer">Toggle drawer</App.Btn>
    </div>

    <Form.Input
      v-model="test"
      :label="'Text Field'"
      validations="required"
    ></Form.Input>
    <h2 class="mt-5 mb-2 font-semibold">Table Sample</h2>
    <App.Table
      :headers="[
        { text: 'Text 1', value: 'test1' },
        { text: 'Text 2', value: 'test2' },
      ]"
      :items="[{ test1: 'Item 1', test2: 'Item 2' }]"
    ></App.Table>
    <h2 class="mt-5 mb-2 font-semibold">Pagination Sample</h2>
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
    <Form.TextField
      v-model="test"
      label="TextField"
      error="Error text"
    ></Form.TextField>
    <Form.TextArea
      v-model="test"
      label="TextArea"
      error="Error text"
    ></Form.TextArea>
    <Form.DatePicker v-model="dates" label="dates"></Form.DatePicker>
  </div>
</template>

<script setup lang="ts">
import { Form, App } from "@/common/elements/";
import { ref } from "vue";

const test = ref("asdada");
const files = ref([]);
const dec = ref("1213");
const multi = ref([]);
const dates = ref("");
const pagination = ref(1);

const checkbox = ref(false);
const checkboxItem = ref([]);
const radio = ref("something");
const formSelect = ref("");
const form = ref(false);
const formItems = ref(["asdas", "asdad"]);
const formFile = ref([]);
const formDate = ref("");
const formDecimal = ref(0);
const formArea = ref("");
const modal = ref(false);
const page = ref(22);
const tablePage = ref(1);
const tabIndex = ref(0);
const step = ref(0);
const drawer = ref(false);
</script>

<style scoped></style>
