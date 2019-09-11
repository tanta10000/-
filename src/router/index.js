import  navbarconfig from './navbarconfig'
import pageconfig from './pageconfig'
import personal from "./personal";
import Vue from 'vue'
import VueRouter from 'vue-router'
const baseRoutes = [];
const routes = baseRoutes.concat(navbarconfig, pageconfig,personal);

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',//去除访问路径“#”
    routes,
});