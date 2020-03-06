import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
const router = new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: () => import(/* webpackChunkName: 'subPageA'*/'@pages/home.vue')
        },
        {
            path: "/email",
            component: () => import(/* webpackChunkName: 'subPageA'*/'@pages/email.vue')
        }
    ]
});
export default router