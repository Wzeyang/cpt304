import { createApp } from "vue";
import ToastPlugin from 'vue-toast-notification';
import "bootstrap/dist/css/bootstrap.min.css";
import 'vue-toast-notification/dist/theme-default.css';
import App from "./App.vue";

var app = createApp(App);
app.use(ToastPlugin);
app.mount('#app');
