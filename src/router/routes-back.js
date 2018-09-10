//主路由模块

const blast = resolve => require(['../index/blast'], resolve)  //爆破单位            
const depot = resolve => require(['../index/depot'], resolve)  //仓库管理模块         
const police = resolve => require(['../index/police'], resolve)  //公安监管          
const logistics = resolve => require(['../index/logistics'], resolve)  //配送管理    
const project = resolve => require(['../index/project'], resolve)  //项目监管        
const login = resolve => require(['../page/login'], resolve)  //项目监管 
import blast_router from "./blast"//爆破二级路由
import depot_router from "./depot"//仓库管理二级路由
import police_router from "./police"//公安监管二级路由
import logistics_router from "./logistics"//配送管理二级路由
import project_router from "./project"//项目监管二级路由
const register = resolve => require(['../page/register'], resolve)  //项目监管
const NotFoundComponent  = resolve => require(['../page/404'], resolve)//页面4004

export default [
  {
    path:'/blast',   //爆破单位
    component: blast,
    name:"blast",
    meta: {
      title: '爆破公司主页',
    },
    children:[
      ...blast_router,
    ]
  },
  {
    path:"/depot",     //仓库管理模块
    component:depot,
    name:"depot",
    children:[
      ...depot_router
    ]
  },
  {
    path:"/police",     //公安监管
    component:police,
    name:"police",
    children:[
      ...police_router
    ]
  },
  {
    path:"/logistics",     //配送管理
    component:logistics,
    name:"logistics",
    children:[
      ...logistics_router
    ]
  },
  {
    path:"/project",      //项目监管 
    component:project,
    name:"project",
    children:[
      ...project_router
    ]
  },
  { 
    path:'', 
    component: login,
    name:"login"
  },
  { 
    path:'/register', 
    component: register,
    name:"register"
  },
  { path: '*', component: NotFoundComponent,name:"404" }
]