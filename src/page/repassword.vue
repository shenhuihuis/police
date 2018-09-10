<template>
    <div class="repassword">
           <el-form ref="form" label-width="124px" class="form">
                <el-form-item label="手机号码">
                    <el-input v-model="form.phone"  @keyup.native="form.phone=form.phone.replace(/\D/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="验证码" class="yzm">
                    <el-input v-model="form.code"></el-input>
                    <a class="getyzm" id="yzm" @click="getyzm" href="javascript:void(0);">获取验证码</a>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <div class="btn">
                    <el-form-item>
                        <el-button>返回</el-button>
                        <el-button type="primary" @click="sub">确认修改</el-button>
                    </el-form-item>
                </div> 
           </el-form>
            <div class="footer">Copyright©2017-2018 Hailiang.All Rights Reserved </div>
    </div>
</template>
<script>
    import Validator from "./../assets/js/filters";
    export default {
        data(){
            return {
                count: 60,
                yzmsuccess: true,
                form:{
                    phone:13454752770,
                    code:"",
                    password:""
                },

            }
        },
        methods:{
            timer() {
                var countdown = this.count;
                document.getElementById('yzm').innerHTML = countdown + "秒后重发";
                this.yzmsuccess = false;
                if (countdown == 0) {
                    document.getElementById('yzm').innerHTML = "重新获取"
                    countdown = 60;
                    this.count = 60
                    this.yzmsuccess = true
                    return false;
                } else {
                    countdown--;
                }
                this.count = countdown;
                setTimeout(function () {
                    this.timer()
                }.bind(this), 1000)
            },
             getyzm(e) {
                if (!this.form.phone) {
                    this.$message({
                        type:"error",
                        message:"请输入手机号"
                    })
                    return false;
                } else {
                    if (!/^1[3|4|5|7|8]\d{9}$/.test(this.form.phone)) {
                        alert("手机格式错误")
                        return false;
                    }
                    if (this.yzmsuccess == true) {
                        this.publics.AJAX.$POST({
                            url:"system/basis/"+this.form.phone,
                            common:false,
                            hastoken:false,
                            success:(e)=>{
                                this.timer();
                            }
                        })
                    }
                }
             },
             sub(e){
                  if (!this.form.phone) {
                     this.$message({
                        type:"error",
                        message:"请输入手机号"
                     })
                     return false;
                  }
                  if (!this.form.code) {
                      this.$message({
                        type:"error",
                        message:"请输入验证码"
                      })
                    return false;
                  }
                  if (!this.form.password) {
                      this.$message({
                        type:"error",
                        message:"请输入密码"
                      })
                      return false;
                  }
                  this.publics.AJAX.$POST({
                        url:"system/basis/"+this.form.phone+"/"+this.form.code,
                        type:"get",
                        common:false,
                        hastoken:false,
                        success:(e)=>{
                            this.publics.AJAX.$POST({
                                url:"system/basis/user/"+this.form.phone+"/pwd",
                                type:"patch",
                                common:false,
                                hastoken:false,
                                data:{
                                    code:this.form.code,
                                    newPwd:this.form.password
                                },
                                success:(e)=>{
                                    this.$message({
                                        type:"success",
                                        message:"修改成功!"
                                    })
                                    setTimeout(e=>{
                                         this.$router.push({name:'login'})
                                    },2000)
                                   
                                }
                            })
                        }
                  })

             }
        }

    }
</script>
<style lang = "scss">
  .repassword{
    width:1440px;
    margin:0 auto;
    background:url("../assets/img/bg@2x.png") no-repeat center top #fff;
    padding:320px 0 0 0;
    height:1000px;
    position: relative;
    .form{
        width: 400px;
        margin:120px auto 0;
        .btn{
            padding-top: 40px;
        }
        .yzm{
            .el-input{
                width:140px;
            }
            .getyzm{
                width:130px;
                display: block;
                float:right;
                line-height: 40px;
                border: 1px solid #dcdfe6;
                height:40px;
                text-align: center;
                border-radius:4px;
            }
        }
    }
   .footer{
      width:100%;
      background: #ECECEC;
      text-align: center;
      line-height: 50px;
      position: absolute;
      bottom: 0;
    }
  }
</style>