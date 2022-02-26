import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import { routes } from "./routes/routes";
import axios from "axios";
import { store } from "./store/index";
Vue.use(VueRouter);

axios.defaults.baseURL = "https://spoke-todo.herokuapp.com/api/";

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
