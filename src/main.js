import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
import VueParticles from "vue-particles";
/* import "materialize-css/dist/css/materialize.css";
import "materialize-css"; */
//used CDN to include materialize because some features didn't work

Vue.use(VueParticles);

Vue.use(VueChatScroll); //initially scroll chat to bottom

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");