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
      <AppFormInput validateOnChange validations="" error="test"></AppFormInput>
      <h2 class="mb-2 underline font-bold">FORM SAMPLE:</h2>
      <AppForm v-model="form">
        <AppFormInputBase
          v-model="test"
          validateByForm
          validateOnChange
          name="Test"
          label="Label Here"
          validations="required"
        ></AppFormInputBase>
        <div class="mt-2">
          <AppFormCheckbox v-model="checkbox" label="test"></AppFormCheckbox>
          <AppFormCheckbox
            v-model="checkboxItem"
            primaryLabel="checkbox"
            :items="[
              { value: 'Test', label: 'Test Value' },
              { value: 'asdad', label: 'asdaTest Value' },
            ]"
          >
          </AppFormCheckbox>
          <AppFormRadio
            v-model="checkboxItem"
            primaryLabel="radio"
            :items="[
              { value: 'Test', label: 'Test Value' },
              { value: 'asdad', label: 'asdaTest Value' },
            ]"
          ></AppFormRadio>
          <!-- <AppFormCheckbox v-model="checkTest" value="toinks" label="asdad"></AppFormCheckbox> -->
          <!-- <AppFormRadio></AppFormRadio> -->
          checkbox items: {{ checkboxItem }}
        </div>

        <AppFormSelect
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
        ></AppFormSelect>

        <AppDropdown
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
        </AppDropdown>
        <AppFormInputItems
          v-model="formItems"
          label="asdas"
        ></AppFormInputItems>
        <AppFormFile
          v-model="formFile"
          label="adas"
          validations="required"
          validateOnChange
        ></AppFormFile>
        {{ formFile }}
        <AppFormInputDate v-model="formDate"></AppFormInputDate>
        {{ formDate }}
        <AppFormInputDecimal v-model="formDecimal"></AppFormInputDecimal>
        <AppFormInput v-model="formDecimal"></AppFormInput>
        {{ formDecimal }}
        <AppFormTextArea v-model="formArea"></AppFormTextArea>
        <AppBtn submit>Submit</AppBtn>
      </AppForm>

      <AppModal v-model="modal">
        test
        <XIcon @click="modal = false"></XIcon>
      </AppModal>
      <AppBtn @click="modal = !modal">Toggle Modal</AppBtn>
      <AppPagination
        v-model:currentPage="page"
        :pageVisible="4"
        :itemsPerPage="1"
        :total="23"
      ></AppPagination>

      <AppTable
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
      ></AppTable>

      <AppBtn @click="tablePage = 1">{{ tablePage }}</AppBtn>

      <AppTabs
        v-model="tabIndex"
        :items="['tab 1', 'tab 2', 'tab 3']"
      ></AppTabs>
      <AppTooltip tooltipText="sfsfsfs asda ad add ad asd" direction="right">
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
      </AppTooltip>
      <AppSteps
        v-model="step"
        :stepText="['Step 1', 'Step 2', 'Step 3']"
      ></AppSteps>

      <AppDrawer v-model="drawer">
        <p>Drawer here</p>
      </AppDrawer>

      <AppBtn @click="drawer = !drawer">Toggle drawer</AppBtn>
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
    <Form.TextField v-model="test" label="asdad" error="asdad"></Form.TextField>
    <Form.TextArea v-model="test" label="asdad" error="asdad"></Form.TextArea>
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

const checkbox = ref();
const checkboxItem = ref();
const formSelect = ref();
const form = ref(false);
const formItems = ref(["asdas", "asdad"]);
const formFile = ref();
const formDate = ref();
const formDecimal = ref();
const formArea = ref();
const modal = ref(false);
const page = ref(22);
const tablePage = ref(1);
const tabIndex = ref(0);
const step = ref(0);
const drawer = ref(false);
</script>

<style scoped></style>
