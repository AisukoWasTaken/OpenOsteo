<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:-mt-56"
    @keydown.esc="onCancel"
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-0"
      leave-to-class="opacity-100"
      appear
    >
      <div v-if="showModal" class="fixed inset-0 transition-opacity">
        <div @click="onCancel" class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-out duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      appear
      @after-enter="onAfterEnter"
      @after-leave="onCancelFinished"
    >
      <div
        v-if="showModal"
        class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
            @click="onCancel"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">{{title}}</h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">{{description}}</p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <BaseButton variant="danger" @click="onDelete">{{deleteText}}</BaseButton>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <BaseButton variant="white" ref="cancel" @click="onCancel">{{cancelText}}</BaseButton>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseButton from "../BaseButton";
export default {
  name: "DeleteDialog",
  components: {
    BaseButton
  },
  inheritAttrs: false,
  props: {
    open: Boolean,
    title: {
      type: String,
      default: "Delete Information"
    },
    description: {
      type: String,
      default:
        "Are you sure ? This will permanently remove the information you are about to delete."
    },
    deleteText: {
      type: String,
      default: "Delete"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  data() {
    return {
      showModal: this.open
    };
  },
  methods: {
    onDelete() {
      this.showModal = false;
      this.$emit("delete");
    },
    onCancel() {
      this.showModal = false;
    },
    onCancelFinished() {
      this.$emit("cancel");
    },
    onAfterEnter() {
      if (!this.$refs.cancel) {
        return;
      }
      this.$refs.cancel.focus();
    }
  },
  watch: {
    open(value) {
      this.showModal = value;
    }
  }
};
</script>
