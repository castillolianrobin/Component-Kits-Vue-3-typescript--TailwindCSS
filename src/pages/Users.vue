<template>
  <div class="p-5">
    <div class="mb-2 flex justify-between">
      <h3 class="my-2 text font-semibold">Users</h3>
      <App.Btn sm color="success-500" @click="newUserForm = true">
        New User
      </App.Btn>
    </div>
    <App.Table :headers="headers" :items="users"></App.Table>
  </div>

  <App.Modal v-model="newUserForm">
    <div class="p-5">
      <h3 class="mb-4">New User</h3>
      <div class="w-96">
        <App.Steps
          v-model="formStep"
          :stepText="['Personal Info', 'Credentials']"
        ></App.Steps>
        <div class="p-4">
          <div v-show="formStep === 0">
            <Form.TextField
              v-model="form.first_name"
              label="First Name"
              validations="required"
            ></Form.TextField>
            <Form.TextField
              v-model="form.last_name"
              label="Last Name"
              validations="required"
            ></Form.TextField>
            <Form.TextField
              v-model="form.age"
              validateOnChange
              label="Age"
              type="number"
              validations="required | max(18) | min(100)"
            ></Form.TextField>
          </div>

          <div v-show="formStep === 1">
            <Form.TextField
              v-model="form.username"
              label="Username"
              validations="required"
            ></Form.TextField>
            <Form.TextField
              v-model="form.password"
              type="password"
              label="Password"
              validations="required"
            ></Form.TextField>
            <Form.TextField
              validateOnChange
              v-model="form.confirm_password"
              type="password"
              label="Retype Password"
              :validations="`required | matchString(${form.password}, Password)`"
            ></Form.TextField>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <App.Btn sm class="mr-3" @click="newUserForm = false">Cancel</App.Btn>
        <App.Btn
          v-if="formStep === 0"
          sm
          color="success-500"
          @click="formStep += 1"
        >
          Next
        </App.Btn>
        <App.Btn
          v-if="formStep === 1"
          sm
          class="mr-3"
          color="secondary-500"
          @click="formStep -= 1"
        >
          Previous
        </App.Btn>
        <App.Btn v-if="formStep === 1" sm color="success-500"> Submit </App.Btn>
      </div>
    </div>
  </App.Modal>
</template>

<script setup lang="ts">
import { useLayout } from "@/common/composables/useLayout";
import { App, Form } from "@/common/elements";
import { HeadersProp } from "@/common/elements/App/Table.vue";
import { ref } from "vue";

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
].sort((Ael, Bel) => (Ael.id === Bel.id ? 0 : Ael.id > Bel.id ? -1 : 1));

const formStep = ref(0);
const newUserForm = ref(false);
const form = ref({
  valid: false,
  first_name: "",
  last_name: "",
  age: "",
  username: "",
  password: "",
  confirm_password: "",
});
</script>

<style scoped></style>
