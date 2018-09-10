import $http from "superagent";
import { Message, MessageBox,Loading } from "element-ui";
import { request } from "http";
import CryptoJS from "crypto-js";
import DES from 'crypto-js/tripledes';
import modeEcb from 'crypto-js/mode-ecb';
//const Base_Port='http://47.100.90.149:8897/api/v1/';
//const Base_Port = "http://192.168.0.100:8898/api/v1/";    //测试服务器
//const Base_Port = "https://api.minbaojianguan.com/api/v1/";
//const Base_Port="http://"+location.host+"/fangtai_api/v2/"; //测试域名

class Config {
  constructor() {
    this.field = {
      onoff:true,         //开关
      Base_Port:{
        domain:"http://192.168.1.82:7000/",
       // domain:"http://192.168.1.84:7000/",
      //   domain:"http://192.168.1.78:7000/", 
        path:"api/v2/"
      },     //api
      key: "ABWE@@#aQWow!@#$",                          //加密🔑
      projectLevel: [ "一般岩土","D", "C", "B", "A"],   //项目级别
      level: ["初级/D", "中级/C", "高级/B", "高级/A"],  //人员级别
      person:[
        [{ value:1,text:"爆破员"}, { value:4,text:"技术员"},{value:2,text:"安全员"}, { value:3,text:"保管员"},{value:9,text:"评估人员"}],
        [{ value:8,text:"监理员"}],
        [{ value:5,text:"押运员"},{ value:6,text:"驾驶员"}],
        [{ value:7,text:"仓库保管员"}]
      ],
      companyType:[
        { type:'0',id:'4a23'}, //爆破公司 
        { type:'1',id:'e8f5',}, //监理公司
        { type:'2',id:'017d'}, //运输公司
        { type:'3',id:'227e'}, //仓储公司
        { type:'4',id:'6d84'}, //治安大队
        { type:'5',id:'cb25'}, //派出所
      ],
      urls:[],   //正在请求的接口
    }
  }
  post() {
    return this.field;
  }
}
class Commit extends Config{
  constructor(props){
    super(props)
  }
  encode(data) { //加密
    var keyHex = CryptoJS.enc.Utf8.parse(this.field.key);
    var encrypted = CryptoJS.DES.encrypt(data, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  decode(data) { //解密
    let keyHex = CryptoJS.enc.Utf8.parse(this.field.key);
    let decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(data)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
class Filters extends Config{
  constructor(props){
    super(props)
  }
  tirm(str){
    return str.replace(/\"/g, "");
  }
  replaces(name,regular){
    return name=name.replace(/[^\u4e00-\u9fa5]/g,'')
  }
  convert(argument){
    let _this=this.field;
    let Tools={
      projectLevel(){
        return _this.projectLevel[argument]
      },
      level(){
        return _this.level[argument]
      },
      person(){
        return _this.person[argument]
      }
    }
    return Tools
  }
  timer(argument){
    let data = new Date(argument);
    return (argument = data.getFullYear() + "年" +(data.getMonth() + 1) + "月" + data.getDate() + "日");
  }
}
class Cookie {
  constructor(name,value,days) {
    this.name=name;     //存储名
    this.value=value;   //存储内容
    this.days=days      //时间
  }
  set(name=this.name, value=this.value, days) {   
    var d = new Date();
    if (days == null) {
      days = 1;
    }
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }
  get(name=this.name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }
  delete(name=this.name) {
    this.set(name, "", -1);
  }
  clear() {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}
class AJAX extends Config{
  constructor(props){
    super(props);
  }
  $POST(parameter){
    let {
      url = '',
      data = {},
      type = "post",
      hastoken=true,
      common=true,
      success = () => {},
      fail = () => {},
      complete = () => {},
    }=parameter
    let urlStr = url + JSON.stringify(data) + type;//请求拼接
    let isContinue = this.field.urls.some(v=>{
      return v == urlStr
    })
    if(isContinue){//拦截重复请求
      return false
    }else{//允许请求
      this.field.urls.push(urlStr)
    }
    let Base_Port=this.field.Base_Port;
    let loading = Loading.service({
      text: "请求中，请稍等"
    });
    data=this.field.onoff?new Commit().encode(JSON.stringify(data)):data;
    let p = new Promise((resolve, reject) => {
        let $put;
        let token = new Cookie().get("token");
        let newurl=common==true?Base_Port.path:'';
        if(type == "patch") {
            $put = $http
              .patch(Base_Port.domain+newurl + url)
              .set("Content-Type", "application/json")
              .send(data)
        }
        else if(type=="get"){
            $put = $http
              .get(Base_Port.domain+newurl + url)
              .set('Content-Type', 'multipart/form-data') 
              .send(data)
        }
        else{
            $put = $http
              .post(Base_Port.domain+newurl+url)
              .set('Content-Type','application/json')
              .send(data)
        }
        if(hastoken==true){
          $put.set("Authorization","Bearer " + token)
        }
        $put.end((err, res) => {
            let data=res.body || new Filters().tirm(res.text);
            data=this.field.onoff?JSON.parse(new Commit().decode(data)):data;
            this.field.urls.pop()//请求返回 删去该url
            if(data.statusCode==200){
              setTimeout(e=>{loading.close()},1000)
              success(data.resultData)
              resolve()
            }
            else if(data.statusCode==403){
              Message({
                type: "error",
                message: "登录超时!"
              });
              sessionStorage.setItem("history", window.location.href);
              setTimeout(e => {
                  new Cookie().clear()
                  window.location.href=""
              }, 500);
              setTimeout(e=>{loading.close()},1000)
              reject();
            }
            else{
              Message({
                type: "error",
                message: data.resultMsg
              });
              setTimeout(e=>{loading.close()},1000)
              fail(data.resultData)
              resolve();
            }
        });
    })
    return p;
  }
  ajax(parameter){
    let Base_Port=this.field.Base_Port.domain;
    let {
          url  = '',
          data={},
          success = () => {},
          fail = () => {},
          complete = () => {}
    } = parameter
    data=this.field.onoff?new Commit().encode(JSON.stringify(data)):data;
    $http
    .post(Base_Port + url, data)
    .set('Content-Type', 'application/json').end((err, res) => {
         let data=res.body ||  new Filters().tirm(res.text);
         console.log(res)
         data=this.field.onoff?JSON.parse(new Commit().decode(data)):data
        if(data.statusCode==200){
          success(data.resultData)
        }else{
          Message({
            type: "error",
            message:data.resultMsg
          });
        }
        
    })
  }
  upload(parameter){
    let Base_Port=this.field.Base_Port.domain;
    let {
          url  = '',
          data={},
          success = () => {},
          fail = () => {},
          complete = () => {}
    } = parameter
    let load = Loading.service({
      text: "上传中"
    });
    
    $http
    .post(Base_Port + url, data).end((err, res) => {
        //let data=JSON.parse(new Commit().decode(res.body));
         let data=res.body || new Filters().tirm(res.text);
         data=this.field.onoff?JSON.parse(new Commit().decode(data)):data
         if(data.statusCode==200){
            success(data.resultData)
            load.close()
         }else{
            Message({
              type: "error",
              message: data.resultMsg
            });
            load.close()
         }
    })
  }
}
export default {
  Config:new Config().post(),
  Cookie:new Cookie(),
  Filters:new Filters(),
  DES:new Commit(),
  AJAX:new AJAX(),
  global(){
    return {
        token:new Cookie().get("token"),
        //user:new Cookie().get("user"),
        auth:JSON.parse(new Commit().decode(sessionStorage.getItem("auth")))
    }
  }
}
