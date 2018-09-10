<template>
    <div class="login">
      <put v-bind:data="colds" @toclose='toclose'></put>
      <!-- <el-carousel trigger="click"  class="banner" height="100%" :interval="5000">
        <el-carousel-item v-for="(item,index) in banner" :key="index" :class="item.classname">
        </el-carousel-item>
      </el-carousel> -->
        <div class = 'top_title'>
          <div class = 'logo'></div>
          <div class = 'title'></div>
        </div>
        <div class = 'main_title'></div>
        <div class = 'loginBox'>
          <div class = 'welcome'></div>
          <div class = 'wave'></div>
          <el-form :model="form" status-icon  ref="form" label-width="40px" class="form">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sub('form')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="bot">
            <router-link :to="{name:'repassword'}">忘记密码?</router-link>
            <router-link :to="{name:'register'}">注册</router-link>
          </div>
          <div class = 'footer'>
            <div class = 'left'>
              <span>客服电话</span>
              <div class = 'content'>
                <span>客服热线：0574-62793268</span>
                <div class = 'online'>
                  <span>在线客服：</span>
                  <i class = 'qq'></i>
                  <i class = 'wx'></i>
                </div>
              </div>
            </div>
            <span class = 'line'></span>
            <div class = 'right'>
              <span>官方微信</span>
              <div class = 'content'>
                <div class = 'code'></div>
                <span class = 'text'>扫一扫关注</span>
              </div>
            </div>

          </div>
        </div>
        <!-- <div class="cter">
            <div class="form">
                <input type="text" placeholder="请输入手机" v-model="forms.tel" />
                <input type="password" placeholder="请输入密码" v-model="forms.password" @keyup.enter="end" />
                <div class="nimulangpa">没有账号？前往<router-link :to="{'name':'register'}">注册</router-link></div>
                <a href="javascript:void(0);" class="sub" @click="end">登录</a>
            </div>
        </div> -->
    </div>
</template>
<script>
import $http from "superagent";
import put from "../components/put";
export default {
  data() {
    return {
      form:{
        username:'兰江派出所',
        // username:'18758803025',
        password:'123456'
      },
      colds:{
        show:false,
        msg:1,
        tit:"你的账号已被冻结"
      },
    };
  },
  created() {
    this.publics.Cookie.clear();
    sessionStorage.clear();
  },
  components:{
    put:put
  },
  methods: {
    toclose(){
      this.data.show=false;
    },
    sub() {
      if (!this.form.username) {
        this.$message({
          type: "error",
          message: "请输入帐号"
        });
        return false; 
      }
      if (!this.form.password) {
        this.$message({
          type: "error",
          message: "请输入密码"
        });
        return false;
      }
     
      this.publics.AJAX.ajax({
        url:"auth/login",
        data:this.form,
        hastoken:true,
        success:(res)=>{
           let load = this.$loading({
            text: "正在登录中!请稍等..."
           });
           let Menu=res.sysMenuIds.chidren,auth;
           for(let val of this.publics.Config.companyType){
             if(val.id==res.sysMenuIds.id){
                auth=val
             }
           }
           if(auth.type>=4){
                auth.userId=res.userId
                this.publics.Cookie.set("token",res.token);
                sessionStorage.setItem("menu",this.publics.DES.encode(JSON.stringify(Menu)));
                sessionStorage.setItem("auth",this.publics.DES.encode(JSON.stringify(auth)))
                setTimeout(e => {
                    this.$router.push({
                        name: "home"
                    });
                    load.close();
                }, 2000);
           }else{
             this.$message({
               type:"error",
               message:"账号密码错误！"
             })
             return false;
           }
        }
      })
    }
  }
};
</script>
<style lang = "scss">
  .login{
    padding: 70px 80px;
    box-sizing: border-box;
    background: url('../assets/img/login_bg.jpg') no-repeat;
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    .bot{
      overflow: hidden;
      width:320px;
      margin:0 auto;
      a:nth-child(2){
        float:right;
      }
      a:hover{
        color:#03A9F4;
      }
    }
    .top_title{
      .logo{
        background: url('../assets/img/logo.png') no-repeat;
        width: 32px;
        height: 32px;
        display: inline-block;
      }
      .title{
        background: url('../assets/img/login_top.png') no-repeat;
        width: 307px;
        height: 35px;
        display: inline-block;
        margin-left: 10px;
      }
    }
    .main_title{
      width: 548px;
      height: 103px;
      margin-left: 66px;
      background: url('../assets/img/title.png') no-repeat;
      margin-top: 254px;
    }
    .loginBox{
      background: #fff;
      position: absolute;
      top:70px;
      right: 80px;
      width: 440px;
      height: 760px;
      padding:20px 30px;
      box-sizing: border-box;
      .welcome{
        background: url('../assets/img/welcome.png') no-repeat;
        width: 110px;
        height: 24px;
        margin: 30px auto;
      }
      .wave{
        background: url('../assets/img/wave.png') no-repeat;
        width: 30px;
        height: 6px;
        margin: 0 auto;
      }
      .form{
        width: 320px;
        margin: 86px auto 0;
        .el-form-item{
          position: relative;
          .el-form-item__label{
            z-index: 5;
            position: absolute;
            left:12px;
            top:0;
          }
        }
        input{
          padding-left: 50px;
        }
        .el-form-item__content{
          margin-left: 0 !important;
        }
        .el-button{
          width: 100%;
          margin-top: 46px;
        }
      }
      .footer{
        color: #323232;
        font-size: 12px;
        position: relative;
        margin-top: 130px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left,.right{
          width: 50%;
          text-align: center;
        }
        .line{
          display: inline-block;
          height: 120px;
          border-left: 1px solid #ccc;
          position: relative;
          top:30px;
        }

        .content{
          margin-top: 56px;
          padding:0 18px;
          text-align: left;
          position: relative;
          .online{
            display: flex;
            margin-top: 20px;
            align-items: center;
            i{
              margin-left: 15px;
              height: 20px;
              width: 24px;
            }
            .qq{
              background: url('../assets/img/qq.png') no-repeat;
            }
            .wx{
              background: url('../assets/img/wx.png') no-repeat;
            }
          }
          .code{
            width: 100px;
            height: 100px;
            margin: 0 auto;
            position: relative;
            top:-30px;
            background: url('../assets/img/code.png') no-repeat;
          }
          .text{
            position: absolute;
            top:-18px;
            right:25px;
            width:20px;
          }
        }
      }
    }
  }
  
</style>


