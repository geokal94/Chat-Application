import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
import VueParticles from "vue-particles";

Vue.use(VueParticles);

Vue.use(VueChatScroll); //initially scroll chat to bottom

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");