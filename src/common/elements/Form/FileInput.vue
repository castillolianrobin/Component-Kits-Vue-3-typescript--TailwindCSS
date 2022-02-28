<template>
  <!-- Input Label -->
  <span class="text-gray-400 text-sm pointer-events-none">{{ label }}</span>
  <span
    v-if="isRequired || required"
    class="ml-1 text-red-500 pointer-events-none"
    >*</span
  >

  <!-- File Input Component -->
  <transition-group
    name="fade"
    tag="div"
    mode="in-out"
    class="cursor-pointer grid gap-3 transition-colors"
    :class="[`grid-cols-${single ? 3 : 4}`]"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <!-- Files to be displayed on upload -->
    <div
      v-for="(file, index) in modelValue"
      :key="`file-${index}-${file?.name || 'Anon'}`"
      class="mb-5 h-full"
      :class="{ 'col-start-2': single }"
    >
      <slot
        name="display-file-template"
        :file="file"
        :index="index"
        :createThumbnail="createThumbnail"
        :removeFile="removeFile"
      >
        <div
          class="relative flex flex-col justify-center items-center h-full border border-gray-400 bg-gray-500"
        >
          <XIcon
            class="opacity-50 hover:opacity-100 absolute top-0 right-0 app-icon m-1 rounded-full text-white bg-primary-500 z-40"
            @click="removeFile(index)"
          ></XIcon>
          <!-- Img -->
          <img
            v-if="file && file.type.includes('image')"
            :src="createThumbnail(file)"
            :alt="file.name"
            class="aspect-square"
          />
          <!-- Video -->
          <div
            v-else-if="file && file.type.includes('video')"
            class="bg-gray-light-3 h-100"
          >
            <video :src="createThumbnail(file)" class="aspect-square"></video>
          </div>
          <!-- Other file type -->
          <div
            v-else
            class="bg-white h-full w-full flex flex-col items-center justify-center"
          >
            <DocumentIcon
              class="app-icon-lg mt-2 m-3 text-blue-600"
            ></DocumentIcon>
            <p class="text-truncate">{{ file?.name || "No name" }}</p>
          </div>
        </div>
      </slot>
    </div>
    <!-- Dropzone Template -->
    <div
      v-if="!single || !modelValue || modelValue.length === 0"
      class="mb-md-5 aspect-square"
      :class="{
        'col-span-full': !modelValue || modelValue.length === 0,
      }"
      @click="activateInputFile"
    >
      <slot name="dropzone-template">
        <div
          class="app-input-file-dropzone h-full border border-dashed border-gray-400"
        >
          <div
            class="p-2 h-full text-center flex flex-col items-center content-center"
          >
            <UploadIcon class="app-icon-lg mt-2 m-3 text-blue-600"></UploadIcon>
            <p class="block text-sm">
              Drop your {{ single ? "file" : "files" }} here, or
              <span class="text-blue-600">Browse</span>
            </p>
            <p class="block text-xs text-gray-400">
              Supports standard image and video formats
            </p>
          </div>
        </div>
      </slot>
    </div>
  </transition-group>
  <!-- Input File that Actually takes the uploaded File to passed to component's value -->
  <input
    :multiple="!single"
    ref="inputFile"
    type="file"
    name="fields[assetsFieldHandle][]"
    class="hidden overflow-hidden absolute"
    @change="onUpload"
    v-bind="$attrs"
  />

  <!-- Error Message -->
  <Error
    v-if="!hideError"
    sm
    class="my-1"
    :error="error || errorMessage"
    :color="errorColor"
  ></Error>
</template>

<script setup lang="ts">
import { UploadIcon, XIcon } from "@heroicons/vue/solid";
import { DocumentIcon } from "@heroicons/vue/outline";
import { defineProps, defineEmits, ref, toRefs, PropType } from "vue";
/** Form Components */
import { Error } from ".";
/** Composables */
import {
  useInput,
  inputProps,
  modelValueEvent,
  inputBaseProps,
} from "@/common/composables/useInput";
import {
  validationProps,
  useValidation,
  validEvent,
} from "@/common/composables/useValidation";

/** PROPS */
const props = defineProps({
  ...inputProps,
  ...inputBaseProps,
  ...validationProps,
  modelValue: {
    type: Array as PropType<Array<File | null>>,
    default: () => [],
  },
  single: { type: Boolean, default: false },
});

/** EMITS */
const emit = defineEmits([modelValueEvent, validEvent]);

/** HOOKS */
//useInput hook
const { updateModelValue } = useInput(emit);
//useValidation hook
const { modelValue } = toRefs(props);
const { isRequired, errorMessage } = useValidation(modelValue, props, emit);

/******************************
COMPONENT STATE
******************************/

// the reference for the input file element
const inputFile = ref<HTMLInputElement>();
// activates the input file programmatically
function activateInputFile() {
  if (inputFile.value) {
    inputFile.value.click();
  }
}

/** FILE LOGICS */

/**
 * Adds file/s to the modelValue
 * @param {Array, File} file - file/s to be added
 */
function addFile(file: Array<File | null>): void {
  const _modelValue = Array.isArray(modelValue.value) ? modelValue.value : [];

  if (Array.isArray(file)) {
    updateModelValue([..._modelValue, ...file]);
  } else {
    updateModelValue([..._modelValue, file]);
  }
}
/**
 * Removes file to the modelValue
 * @param {Number} index - index of the file in the modelValue
 */
function removeFile(index: number): void {
  var _modelValue = [...modelValue.value];
  _modelValue.splice(index, 1);
  updateModelValue(_modelValue);
}
/**
 * Action to be executed when input file element changes value
 */
function onUpload() {
  if (!inputFile.value?.files) return null;

  const newFiles: Array<File | null> = [];
  const inputFileFiles = inputFile.value.files;
  for (let i = 0; i < inputFileFiles.length; i++) {
    newFiles.push(inputFileFiles.item(i));
  }
  addFile([...newFiles]);
  // reset the value of the inputFile (allows next upload duplication)
  inputFile.value.value = "";
}
/**
 * Creates a string url of the file's thumbnail (only works with img or video)
 * @param {File} file - file
 */
function createThumbnail(file: File) {
  return URL.createObjectURL(file);
}

/**  DROPZONE EVENTS */

// on hover class
const _hoverClass = "bg-primary-200";

/**
 * Action to execute on component drag over
 */
function dragover(event: DragEvent) {
  event.preventDefault();
  // Add some visual fluff to show the user can drop its files
  const currentTarget = event.currentTarget as HTMLInputElement;
  if (currentTarget.classList.contains(_hoverClass)) {
    (event.currentTarget as HTMLInputElement).classList.add(_hoverClass);
  }
}
/**
 * Action to execute on component drag leave
 */
function dragleave(event: DragEvent) {
  // Clean up
  const currentTarget = event.currentTarget as HTMLInputElement;
  currentTarget.classList.remove(_hoverClass);
}
/**
 * Action to execute on component when file is dropped
 */
function drop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer) {
    const files = [...event.dataTransfer.files];
    addFile(files);
    dragleave(event);
  }
}
</script>

<style scoped></style>
