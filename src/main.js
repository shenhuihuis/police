import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import VueAMap from 'vue-amap';
Vue.use(VueRouter);
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'e4855accde222ba0e3431a05b777a84f',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',],
  v: '1.4.4'
});
import App from './App'
import publics from "./public"
import routes from './router/routes'
//import vfilters from './assets/js/filters.js';
/*for(let key in vfilters){
  Vue.filter(key,vfilters[key])
}*/
//Vue.prototype.filter=vfilters;
Vue.prototype.publics=publics;

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next)=>{
  const notRoute = ['login', 'register', '404',"repassword"];
  if (notRoute.indexOf(to.name) < 0) {
      //未登录
      if (!publics.Cookie.get("token")) {
        router.push({name: 'login'})
      }
  }
  //已登录的情况再去登录页，跳转至首页
  next();
});
const app = new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
