import type {  App, Plugin, ComponentPublicInstance } from "vue";
import DeleteDialog from "./DeleteDialog.vue";

function cleanup(componentInstance: ComponentPublicInstance) {
  document.body.removeChild(componentInstance.$el);
}

export const ModalPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$deleteConfirm = function openDeleteModal(params: any = {}) {
      return new Promise((resolve, reject) => {
        try {
          const DeleteConstructor = app.extend(DeleteDialog);
          const mountId = "delete-modal";
          const componentInstance = new DeleteConstructor({
            propsData: {
              open: true,
              title: params.title || "",
              description: params.description || ""
            }
          });
          const modalDiv = document.createElement("div");
          modalDiv.id = mountId;
          document.body.appendChild(modalDiv);

          componentInstance.$mount(`#${mountId}`);
          componentInstance.$on("delete", () => {
            resolve(true);
          });
          componentInstance.$on("cancel", () => {
            resolve(false);
            cleanup(componentInstance);
          });
        } catch (err) {
          reject(err);
        }
      });
    };
  }
};
