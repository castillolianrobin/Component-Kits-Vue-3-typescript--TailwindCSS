<template>
  <div class="p-1 h-full flex items-center justify-center bg-primary-900">
    <App.Card class="flex p-0 rounded overflow-hidden">
      <!-- Form -->
      <Form.Form
        v-model="form.valid"
        class="pt-5 p-3 w-full md:w-64 flex flex-col justify-end items-center bg-primary-50"
        @validated="login"
      >
        <!-- Username -->
        <Form.TextField
          v-model="form.username"
          validateByForm
          validateOnChange
          label="Username"
          validations="required"
          :disabled="loading"
        ></Form.TextField>

        <!-- Password -->
        <Form.TextField
          v-model="form.password"
          validateByForm
          validateOnChange
          type="password"
          label="Password"
          validations="required"
          :disabled="loading"
        ></Form.TextField>

        <!-- Submit -->
        <App.Btn submit class="mt-4 px-5" :loading="loading"> Login </App.Btn>

        <!-- Error -->
        <Form.Error class="text-smmt-1" :error="form.error"></Form.Error>

        <p class="mt-auto text-sm text-gray-400">
          Can't Login ?
          <App.Tooltip
            :tooltipText="`username: ${credentials.username} | password: ${credentials.password}`"
            direction="top"
          ></App.Tooltip>
        </p>
      </Form.Form>
      <!-- Logo -->
      <div class="w-64 h-80 flex flex-col justify-center">
        <img src="@/assets/login-logo.png" />
      </div>
    </App.Card>
  </div>
</template>

<script setup lang="ts">
// Elements
import { Form, App } from "@/common/elements";
// vue
import { ref } from "vue";
// router
import { useRouter } from "vue-router";
import { useLayout } from "@/common/composables/useLayout";
import { useAuthenticationStore } from "@/store/authentication";

useLayout("DefaultLayout");
// useRouter hook;
const router = useRouter();
//store hook
const authStore = useAuthenticationStore();

// mock valid credentials
const credentials = {
  username: "user",
  password: "password",
};

// input variables
const form = ref({
  valid: false,
  username: "",
  password: "",
  error: "",
});

const loading = ref(false);

function login() {
  form.value.error = "";

  if (!form.value.valid) {
    return (form.value.error = "Please complete the form");
  }

  loading.value = true;

  setTimeout(() => {
    loading.value = false;

    authStore.login({
      data: {
        username: form.value.username,
        password: form.value.password,
      },
      onSuccess() {
        alert("Login success!");
        router.push("/dashboard");
      },
      onError() {
        return (form.value.error = "Incorrect username/password");
      },
    });
  }, 2000);
}
</script>

<style lang="scss" scoped></style>
