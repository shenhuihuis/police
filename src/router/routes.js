//主路由模块
const index = resolve => require(['../page/home'], resolve)  //主页 
const login = resolve => require(['../page/login'], resolve)  //项目监管 
const register = resolve => require(['../page/register'], resolve)  //注册
const NotFoundComponent  = resolve => require(['../page/404'], resolve)//页面4004
const management=resolve => require(['../page/management'], resolve)
const message=resolve => require(['../page/message'], resolve)
const notice=resolve => require(['../page/notice'], resolve)
const repassword=resolve => require(['../page/repassword'], resolve)
const Auditing=resolve => require(['../page/Auditing'], resolve)



export default [
  {
    path:'/home', 
    component: index,
    name:"home",
    meta: {
      title: '主页',
    },
    children:[
      { 
        path:'/Auditing', 
        component: Auditing,
        name:"Auditing"
      },
      { 
        path:'/management', 
        component: management,
        name:"management"
      },
      { 
        path:'/message', 
        component: message,
        name:"message"
      },
      { 
        path:'/notice', 
        component: notice,
        name:"notice"
      },
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
  { 
    path:'/repassword', 
    component: repassword,
    name:"repassword"
  },
  { path: '*', component: NotFoundComponent,name:"404" }
]