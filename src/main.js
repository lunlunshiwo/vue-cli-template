import Vue from "vue";
import App from "./App.vue";
import router from "@router/router.js";
Vue.config.productionTip = false
new Vue({
    el: "#app",
    template: '<App/>',
    router,
    components: { App }
});