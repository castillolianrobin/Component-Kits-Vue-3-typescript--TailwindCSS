<template>
  <div class="p-6">
    <AppCard>
      <AppTabs v-model="currentTab" :items="tabItems"></AppTabs>
    </AppCard>
    <div class="p-5">
      <!-- Basic Info Tab -->
      <div v-if="currentTab === 0" class="grid grid-cols-3 gap-6">
        <div class="col-span-2">
          <!-- Name -->
          <p class="mb-1 font-semibold">Name Details</p>
          <AppCard class="mb-4">
            <div class="p-3 grid grid-cols-12 gap-3">
              <AppFormInput
                v-model="personalForm.first_name"
                label="First Name"
                class="col-span-5"
                required
              ></AppFormInput>
              <AppFormInput
                v-model="personalForm.last_name"
                label="Last Name"
                class="col-span-5"
                required
              ></AppFormInput>
              <AppFormInput
                v-model="personalForm.middle_initial"
                label="M.I."
                class="col-span-2"
                maxlength="2"
              ></AppFormInput>
            </div>
          </AppCard>
          <!-- Contacts -->
          <p class="mb-1 font-semibold">Contact Information</p>
          <AppCard class="p-5 mb-4">
            <AppFormInput
              v-model="personalForm.contact_no"
              label="Contact"
            ></AppFormInput>
            <AppFormInput
              v-model="personalForm.email"
              label="Email"
            ></AppFormInput>
          </AppCard>
          <!-- Addres -->
          <p class="mb-1 font-semibold">Address</p>
          <AppCard class="p-5 mb-4">
            <AppFormInput
              v-model="personalForm.address"
              label="Address"
            ></AppFormInput>
            <div class="grid grid-cols-2 gap-3">
              <AppFormInput
                v-model="personalForm.city"
                label="City"
              ></AppFormInput>
              <AppFormInput
                v-model="personalForm.province"
                label="Province"
                class="col-start-1"
              ></AppFormInput>
              <AppFormInput
                v-model="personalForm.zipcode"
                label="Zip Code"
              ></AppFormInput>
            </div>
          </AppCard>
        </div>
        <div>
          <!-- Picture -->
          <p class="mb-1 font-semibold">Profile Image</p>
          <App.Card class="p-5">
            <div
              class="w-3/4 rounded-xl overflow-hidden mx-auto cursor-pointer relative"
            >
              <img src="@/assets/profile-placeholder.jpg" class="" />
              <PencilAltIcon
                class="app-icon-lg p-1 rounded-full text-info-500 bg-white absolute right-1 bottom-1 shadow"
              ></PencilAltIcon>
            </div>
          </App.Card>
          <div class="mt-5 flex justify-center">
            <App.Btn
              :disabled="!saveable"
              class="inline-block px-5"
              color="success-500"
              >Save</App.Btn
            >
            <App.Btn
              class="inline-block px-5 ml-2"
              color="secondary-500"
              @click="resetData"
            >
              Reset
            </App.Btn>
          </div>
        </div>
      </div>

      <!-- Security Information -->
      <App.Card v-if="currentTab === 1" class="p-5">
        <Form.TextField
          label="Username"
          disabled
          modelValue="wilkins_05"
        ></Form.TextField>
        <p class="mt-4 mb-3 font-semibold">Reset Password</p>
        <Form.TextField type="password" label="New Password"></Form.TextField>
        <Form.TextField
          type="password"
          label="Retype New Password"
        ></Form.TextField>
        <App.Btn color="success-500" class="block ml-auto">
          Reset Password
        </App.Btn>
      </App.Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEqual } from "lodash";
import { ref, watch } from "vue";
import { AppTabs, AppCard, AppFormInput, AppBtn, App, Form } from "@/common/elements";
import { PencilAltIcon } from "@heroicons/vue/solid";
import { useLayout } from "@/common/composables/useLayout";

useLayout("UserLayout");
const currentTab = ref(0);
const tabItems = ["Basic Info", "Security"];

const tabData = { currentTab, tabItems };

// personal info
const personalFormInit = {
  first_name: "Kennedy",
  last_name: "Willis",
  middle_initial: "A",
  contact_no: "0123131921",
  email: "wilkensA@gmail.com",
  address: "Blk 9 Grove St.",
  city: "Mandaluyong",
  province: "Metro Manila",
  zipcode: "1203",
};
const personalForm = ref({ ...personalFormInit });
const saveable = ref(false);
function resetData() {
  personalForm.value = { ...personalFormInit };
}
watch(
  personalForm,
  () => {
    saveable.value = !isEqual(personalFormInit, personalForm.value);
  },
  { deep: true }
);

const personalFormData = { saveable, personalForm, resetData };
</script>

<style lang="scss" scoped></style>
