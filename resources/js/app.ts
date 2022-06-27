import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./routes";
import App from "./App.vue";
import store from "./stores"

const app = createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios)

// Mount the Vue app
app.mount("#app")
