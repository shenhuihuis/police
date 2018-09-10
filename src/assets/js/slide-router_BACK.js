export default{
  router:{
    blast:[     //爆破
      { tit:'首页',router:'home',ico:'&#xe61e;',checked:false,},
      { tit:'企业及人员管理',router:'bla_admin',ico:'&#xe696;',checked:false,},
      { tit:'爆破项目登记管理',router:'bla_check',ico:'&#xe610;',checked:false,},
      { tit:'民爆物品管理',router:'civil',ico:'&#xe72d;',checked:false,show:false,
        children:[
          { tit:'民爆品购买申请', router:'civil_buyApply',checked:false,},
          { tit:'领用签收管理', router:'civil_get',checked:false,},
          { tit:'使用登记', router:'civil_consume',checked:false,},
          { tit:'消耗登记', router:'civil_cx',checked:false,},
          { tit:'退库登记', router:'civil_refund',checked:false,},
          { tit:'销毁登记', router:'civil_die',checked:false,}
        ]
      },
      { tit:'作业计划登记',router:'blast_plan',ico:'&#xe89d;',checked:false,
      },
      { tit:'变更记录',router:'blast_change',ico:'&#xe602;',checked:false},
      {
        tit:'作业现场视频管理',router:'blast_video',ico:'&#xe70e;',checked:false,
      },
      { tit:'爆破项目竣工管理',router:'blast_completed',ico:'&#xe62a;',checked:false,},
    ],
    depot:[     //仓库管理模块
      { tit:'首页',router:'home', ico:'&#xe61e;',checked:false,},
      { tit:'企业及人员管理',router:'people', ico:'&#xe696;',checked:false,},
      { tit:'仓储管理',router:'storage', ico:'&#xe72d;',checked:false,},
      { tit:'销售配送入库',router:'dep_send', ico:'&#xe608;',checked:false,},
      { tit:'仓储出库登记',router:'dep_give', ico:'&#xe61d;',checked:false,},
      { tit:'退库收交登记',router:'dep_get', ico:'&#xe6d9;',checked:false,}
    ],
    police:[    //公安 
      { tit:"首页",router:'home', ico:'&#xe61e;',checked:false,},  //0    公用
      { tit:"人员管理",router:'pol_peo', ico:'&#xe696;',checked:false,},    //1   公用
      { tit:'民爆物品申请购买审批',router:'pol_civil', ico:'&#xe636;' ,checked:false,}, //3  => 2 派出所
      { tit:'作业审批',router:' ', ico:'&#xe636;',checked:false, }, //4   => 3   派出所
      { tit:'作业变更审批',router:'ckhome', ico:'&#xe636;',checked:false, },//5  => 4   派出所
      { tit:'爆破项目变更审批',router:'pol_replace', ico:'&#xe636;',checked:false,},//6 =>5 治安大队
      { tit:'销毁',router:'blastfa', ico:'&#xe636;',checked:false,}, //7  => 6        治安大队
      { tit:"通知管理",router:'pol_maintain', ico:'&#xe61b;',checked:false,},//8 => 7  公用
      { tit:"日常监管",router:'pol_storage', ico:'&#xe696;',checked:false,},//9  =>8   公用
      { tit:"雷管查询",router:'policeblast', ico:'&#xe696;',checked:false,},//10 =>9   治安大队
      { tit:"查看公司或项目",router:'pol_company', ico:'&#xe696;',checked:false,},  //公安11  =>10   公用
      { tit:"冻结项目",router:'cold', ico:'&#xe696;',checked:false,},  //公安12  =>11               治安大队
      { tit:"添加下属分区",router:'pol_add', ico:'&#xe696;',checked:false,},  //除派出所外 13  =>12   公用除派出所
    ],
    logistics:[   //配送
      { tit:"首页",router:'home', ico:'&#xe61e;',checked:false,},
      { tit:"企业及人员管理",router:'logistics_admin', ico:'&#xe696;',checked:false,},
      { 
        tit:"配送管理",router:'dis', ico:'&#xe6eb;',checked:false,show:false,
        children:[
          { tit:'销售配送' ,router:'dis_start',checked:false,},
          { tit:'仓储出库配送',router:'dis_ing',checked:false,},
          { tit:'退库配送' ,router:'dis_end',checked:false,}
        ]
      },
      { tit:"车辆管理",router:'car', ico:'&#xe616;',checked:false,},
    ],
    project:[     //项目监管
      { tit :'首页', router:'home' ,ico:'&#xe61e;',checked:false,},
      { tit :'企业及人员管理', router:'pro_sys' ,ico:'&#xe696;',checked:false,},
      { tit :'项目监理', router:'pro_look' ,ico:'&#xe610;',checked:false,},
      { tit :'项目监理变更', router:'pro_xgl' ,ico:'&#xe610;',checked:false,},
      { 
        tit :'作业现场视频实时监管', router:'pro_video' ,ico:'&#xe6ba;',checked:false,
        // children:[
        //   { tit:'视频实时上传',router:'look_video'},
        //   { tit:'无信号视频导入',router:'video_update'}
        // ]
      },
      // { tit :'监理到岗合照', router:'project_pic' ,ico:'&#xe70e;'},
    ],
    system:[      //系统监管
      { tit:"账号管理",router:'system', ico:'&#xe61e;',checked:false,},
      { tit:'账号审批',router:'sys_approve', ico:'&#xe696;',checked:false,},
      { tit:'数据变更',router:'sys_change', ico:'&#xe696;',checked:false,},
      { tit:'设置及备份',router:'sys_setting',ico:'&#xe64d;',checked:false,}
    ]
  }
}