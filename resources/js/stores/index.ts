import { createPinia } from "pinia";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

console.log("Pinia created")
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

export default pinia;
