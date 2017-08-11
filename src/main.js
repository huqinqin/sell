// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import sell from './components/sell/sell';
import './common/stylus/index.styl';
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/sell', component: sell }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
});
app.$mount('#app');
router.push('/goods');
