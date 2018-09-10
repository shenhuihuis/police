正则 #

/[^\u4e00-\u9fa5]/g  只能输入中文 #
/[\d]/g              只能输入字母和汉字
/[^\d|chun]/g        只能输入数字和英文
/[^0-9A-Za-z]/g
/^[^!@#$%^&amp;*()-=+]/g  除了英文的标点符号以外都可输
/\D/g                只能输数字
/[^0-9.]/g      数字小数点

公共方法 this.publics合集

查看默认配置
this.publics.Config()           //加密 key  base_url  人员类型集合 登。。。。

数据加密des加密 本地开发跨页面传餐也用此加密规则
this.publics.DES.encode(string)   //加密
this.publics.DES.decode(string)   //解密

异步获取 默认post

this.publics.AJAX.$POST({           //所有报错返回已处理  不需要额外处理
      url = '',
      data = '',
      type= "post",         //若为path则改为patch
      success = (data) => {},       //所有返回已经 解密 完成  不用管code 
      fail = () => {},
      complete = () => {}
})


cookie  操作

this.publics.cook.set(name,value,time) //存
this.publics.cook.get(name) //存
this.publics.cook.delete(name) //删除单个
this.publics.cook.clear()       //清空cookie


filters 过滤 
index为 接口返回number参数
this.publics.filters.convert(index).projectLevel()          //项目级别
this.publics.filters.convert(index).level()                 //人员级别
this.publics.filters.convert(index).person()                //人员类型

this.publics.filters.timer(time)               //毫秒转年月日



所有用户参数 存储 
this.publics.global()  companyid  staffid 等等



组件类

 <File v-bind:data="{'src':'','index':0,type:2}"/>  上传   components / upload  待ui更新  删除


src  路径  默认上传为空  查看编辑时必填
index 为对应索引  考虑到多个图片 多个视频
type 为类型  0 上传图片 1上传视频 2上传文件


<put v-bind:img="{show:true,src:'...'}"/>        `二次确认弹窗       


