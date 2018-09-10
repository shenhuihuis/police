export default{
    router:{
      police:[    //派出所 
        { router:'home',ico:'&#xe61e;',checked:false,tit:'首页'},
        { router:'management',ico:'&#xe61e;',checked:false,id:'309e',tit:'人员管理'},
        { router:'',ico:'',checked:false,id:'d4e9',tit:'信息查询',children:[
          { router:'',ico:'&#xe61e;',checked:false,tit:'人员查询',id:'3fa5'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'车辆查询',id:'a367'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'公司查询',id:'cb1f'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'下属机构'},
        ]},
        { router:'',ico:'',checked:false,id:'e1df',tit:'工作监管',children:[
          { router:'',ico:'&#xe61e;',checked:false,tit:'项目监管',id:'b54e'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'物品购买监管',id:'fdf8'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'当班作业监管',id:'5740'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'盲炮处理监管',id:'2c2c'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'物品销毁监管',id:'0fd7'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'现场视频监管',id:'adba'},
       //   { router:'',ico:'&#xe61e;',checked:false,tit:'雷管查询',id:''},
        ]},
        { router:'Auditing',ico:'',checked:false,id:'5047',tit:'审批审核'},
        { router:'',ico:'',checked:false,id:'f6af',tit:'通知'},
        { router:'',ico:'',checked:false,id:'aaa1',tit:'消息'},
      ],
      Security:[
        { router:'home',ico:'&#xe61e;',checked:false,tit:'首页'},
        { router:'management',ico:'&#xe61e;',checked:false,id:'2bfd',tit:'人员管理'},
        { router:'',ico:'',checked:false,id:'1a24',tit:'信息查询',children:[
          { router:'',ico:'&#xe61e;',checked:false,tit:'人员查询',id:'1d75'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'车辆查询',id:'75d5'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'公司查询',id:'8e94'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'下属机构',id:'d338'},
        ]},
        { router:'',ico:'',checked:false,id:'883a',tit:'工作监管',children:[
          { router:'',ico:'&#xe61e;',checked:false,tit:'项目监管',id:'2c67'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'物品购买监管',id:'08e6'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'当班作业监管',id:'40a9'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'盲炮处理监管',id:'f2d0'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'物品销毁监管',id:'394c'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'现场视频监管',id:'f2d2'},
          { router:'',ico:'&#xe61e;',checked:false,tit:'雷管查询',id:'f2d4'},
        ]},
        { router:'Auditing',ico:'',checked:false,id:'b73c',tit:'审批审核'},
        { router:'',ico:'',checked:false,id:'00eb',tit:'通知'},
        { router:'',ico:'',checked:false,id:'c0a8',tit:'消息'},
      ]
    }
  }