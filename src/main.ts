import { createApp } from "vue";
import App from './App.vue';

import TimUI from './index';

const app = createApp(App);
app.use(TimUI);
app.mount('#app');