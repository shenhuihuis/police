<template>
  <div class="register">
    <div class="firstStep" v-show="show==0">
        <div class="ban">
             <div class="brown">
              <img src="../assets/img/1@2x.png" alt="">
            </div>
        </div>
        <ul>
          <li v-for="(i,index) in companyType" @click="select(index)" :class="{'cur':i.checked}"  :key="index">
              <i></i><div class="tit">{{i.tit}}</div>
          </li>
        </ul>
        <div class="btn">
          <el-row>
            <el-button><router-link :to="{name:'login'}">返回</router-link></el-button>
            <el-button type="primary" @click="firstStep">下一步</el-button>
          </el-row>
        </div>
    </div>
    <div class="secondStep" v-show="show==1">
        <img src="../assets/img/top@2x.png" alt="">
        <div class="ban">
            <img src="../assets/img/2@2x.png">
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="124px" class="forms">
            <el-form-item label="单位名称" prop="name" :rules="[{ required: true, message: '单位名称不能为空'}]" >
              <el-input v-model="form.name" @keyup.native="form.name=form.name.replace(/[^\u4E00-\u9FA5]/g,'')" ></el-input>
            </el-form-item>
            
            <el-form-item label="所在辖区" prop="policeId" :rules="[{ required: true, message: '所在辖区不能为空'}]">
                <el-cascader
                :options="Address"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>

            <el-form-item label="单位地址"  prop="companyAddress" :rules="[{ required: true, message: '单位地址不能为空'}]">
              <el-input v-model="form.companyAddress" @keyup.native="form.companyAddress=form.companyAddress.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
            </el-form-item>
            <div v-if="form.companyType==0 || form.companyType==1" >
              <el-form-item label="作业许可证级别" prop="level" :rules="[{ required: true, message: '作业许可证级别不能为空'}]" v-if="form.companyType==0 || form.companyType==1">  <!--type==0 || 1-->
                <el-radio-group v-model="form.level">
                  <el-radio :label="4">一级</el-radio>
                  <el-radio :label="3">二级</el-radio>
                  <el-radio :label="2">三级</el-radio>
                  <el-radio :label="1">四级</el-radio>
                </el-radio-group>
                <el-tooltip placement="top" effect="light" class="say">
                   <div slot="content">多行信息<br/>第二行信息</div>
                   <a href="javascript:void(0)">级别说明</a>
                </el-tooltip>
              </el-form-item>
            </div>
            <el-form-item label="法人代表" prop="corporation" :rules="[{ required: true, message: '法人代表不能为空'}]">
              <el-input v-model="form.corporation" @keyup.native="form.corporation=form.corporation.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
            </el-form-item>

            <el-form-item label="联系人姓名"  prop="contacts" :rules="[{ required: true, message: '联系人姓名不能为空'}]">
              <el-input v-model="form.contacts" @keyup.native="form.contacts=form.contacts.replace(/[^\u4e00-\u9fa5]/g,'')" ></el-input>
            </el-form-item>

            <el-form-item label="手机号码(账号)" prop="phone">
              <el-input v-model="form.phone"  @keyup.native="form.phone=form.phone.replace(/\D/g,'')"></el-input>
            </el-form-item>

             <el-form-item label="公司邮箱"  prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <div class="btn">
                <el-form-item>
                  <el-button @click="prev(0)">上一步</el-button>
                  <el-button type="primary" @click="next('form')">下一步</el-button>
                </el-form-item>
            </div> 
        </el-form>
    </div>
    <div class="lastStep" v-show="show==2">
         <img src="../assets/img/top@2x.png" alt="">
         <div class="ban">
            <img src="../assets/img/3@2x.png" alt="">
        </div>
        <el-form ref="form1" :model="form1" :rules="rules" label-width="124px" class="forms">
            <el-form-item label="工商营业执照" prop="licenseLocalImg" :rules="[{ required: true, message: '工商营业执照不能为空'}]">
                 <div class="upbox">
                    <File v-bind:data="upload[0]" v-on:bindValue="form1.licenseLocalImg=upload[0].url"></File>
                </div>
            </el-form-item>
            <el-form-item label="有效期" prop="txmExpireTime" :rules="[{ required: true, message: '营业执照有效期不能为空'}]">
                <el-radio-group v-model="radio.txmExpireTime" class="radio" @change="radiock(0,radio.txmExpireTime)">
                    <el-radio label="0">到期时间</el-radio>
                    <el-radio label="1">长期有效</el-radio>
                </el-radio-group>
                <el-date-picker v-model="form1.txmExpireTime" type="date"  placeholder="选择日期" class="longs"  v-if="radio.txmExpireTime==0"></el-date-picker>
            </el-form-item>
            <el-form-item label="工商营业执照/统一社会信用代码" prop="txm" class="codeput">
                   <el-input v-model="form1.txm" @keyup.native="form1.txm=form1.txm.replace(/[^\d|chun]/g,'')"></el-input>
            </el-form-item>

             <el-form-item :label="typename" prop="licenceNumberImg"  class="codeput"  :rules="[{ required: true, message: '许可证照片不能为空'}]">
                <div class="upbox">
                  <File v-bind:data="upload[1]" v-on:bindValue="form1.licenceNumberImg=upload[1].url"></File>
                </div>
            </el-form-item>
            <el-form-item label="有效期" prop="licenceExpireTime" :rules="[{ required: true, message: '许可证照有效期不能为空'}]">
                   <el-radio-group v-model="radio.licenceExpireTime" class="radio" @change="radiock(1,radio.licenceExpireTime)">
                      <el-radio v-model="radio.licenceExpireTime" label="0">到期时间</el-radio>
                      <el-radio v-model="radio.licenceExpireTime" label="1">长期有效</el-radio>
                   </el-radio-group>
                  <el-date-picker v-model="form1.licenceExpireTime" type="date" placeholder="选择日期" class="longs"  v-if="radio.licenceExpireTime==0"></el-date-picker>
            </el-form-item>
            <el-form-item label="许可证编号"  prop="licenceNumber" >
                   <el-input v-model="form1.licenceNumber"  @keyup.native="form1.licenceNumber=form1.licenceNumber.replace(/\D/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="经营范围"   prop="workingRange" :rules="[{ required: true, message: '经营范围不能为空'}]">
                   <el-input v-model="form1.workingRange"  type="textarea"></el-input>
            </el-form-item>
             <div class="btn">
                <el-form-item>
                  <el-button @click="prev(1)">上一步</el-button>
                  <el-button type="primary" @click="sub('form1')">完成</el-button>
                </el-form-item>
            </div> 
        </el-form>
    </div>
    <div class="footer">Copyright©2017-2018 Hailiang.All Rights Reserved </div>
  </div>
</template>
<script>
   import $http from "superagent";
   import file from "./../components/upload";
   import Validator from "./../assets/js/filters";
   export default {
     data(){
       return{
          show:0,
          companyType:[
            { tit :'爆破公司注册',checked:false,type:0,toname:'爆破作业单位许可证',pid:"4a23"},
            { tit :'监理公司注册',checked:false,type:1,toname:'爆破作业单位许可证',pid:"ebf5"},
            { tit :'运输公司注册',checked:false,type:2,toname:'道路运输许可证',pid:"017d"},
            { tit :'仓储公司注册',checked:false,type:3,toname:'储存许可证',pid:"227e"},
          ],
          rules:{
             phone: [{ required: true, validator:Validator.tels,trigger: "blur"} ],
             email: [{ required: true, validator:Validator.email,trigger: "blur"} ],
             txm:[{ required: true, validator:Validator.txm,trigger: "blur"} ],
             licenceNumber:[{ required: true, validator:Validator.licenceNumber,trigger: "blur"}]
           },
          typename:null,
          form:{
            companyType:0,
           // pid:'', //公司模块对应id
            name:'',//公司名称
            provincialId:'',//省级ID
            cityId:'',//市级ID
            districtId:'',//区级id 
            policeId:'',//派出所ID
            companyAddress:"" , //单位地址
            level:'',      //作业许可级别
            corporation:'', //法人代表
            contacts:'',  //联系人姓名
            phone:'',  //手机号码（账号）
            email:'',
          },
          upload:[
             {type:0,dataurl:'',url:'',title:'营业执照'},
             {type:0,dataurl:'',url:'',title:'许可证'},
          ],
          radio:{
              txmExpireTime:null,
              licenceExpireTime:null
          },
          form1:{
            licenseLocalImg:'',   //营业执照照片
            txm:'',               //营业执照代码
            txmExpireTime:'',     //营业执照片过期时间
            licenceNumberImg:"",   //许可证照片
            licenceNumber:'',       //许可证照代码
            licenceExpireTime:'',     //许可证照片过期时间
            workingRange:""   //作业范围
          },
          selectedOptions:[],
          Address:[]
       }
     },
     components:{
       File:file
     },
     created(){
         this.show=parseInt(sessionStorage.getItem("show")) || 0;
         this.publics.AJAX.$POST({
           url:"category/police/%22%22",
           type:"get",
           hastoken:false,
           success:(res)=>{
              this.Address=res;
           }
         }).then(e=>{
             if(this.show==1 || this.show==2 || ((this.show==1) && sessionStorage.getItem("typename")) ){
                 let form;
                 this.typename=sessionStorage.getItem("typename")
                 if(sessionStorage.getItem("form")){
                    this.form=form=JSON.parse(this.publics.DES.decode(sessionStorage.getItem("form"))) 
                    this.selectedOptions=[form.provincialId,form.cityId,form.districtId,form.policeId]
                    let index=this.companyType.findIndex(val=>{
                        return val.toname==sessionStorage.getItem("typename");
                    })
                    this.companyType[index].checked=true;
                 }
             }
         })
     },
     mounted(){
   
     },
     methods:{
      radiock(index,val){
          if(index==0){
            this.$refs['form1'].clearValidate(['txmExpireTime'])
            this.form1.txmExpireTime=val==1?new Date(99999999999999):""
          }else{
            this.$refs['form1'].clearValidate(['licenceExpireTime'])
            this.form1.licenceExpireTime=val==1?new Date(99999999999999):""
          }
      },
      prev(show){     //上一步
        this.show=show;
        sessionStorage.setItem("show",show)
      },
      handleChange(val) {         //省市区
         this.form.provincialId=val[0];
         this.form.cityId=val[1];
         this.form.districtId=val[2];
         this.form.policeId=val[3];
      },
       select(index){         //第一步选择
         let Arr=this.companyType;
         for(let val of Arr){
           val.checked=false;
         }
        Arr[index].checked=true;
        if(Arr[index].toname!=this.toname){
          sessionStorage.removeItem("form")
          this.selectedOptions=[];
          this.$refs['form'].resetFields()
          this.$refs['form1'].resetFields()
        };
       // this.form.pid=Arr[index].pid;
        this.typename=Arr[index].toname;
        sessionStorage.setItem("typename",Arr[index].toname)
        this.form.companyType=Arr[index].type;
       },
       firstStep(){       //第一步提交
         if(!this.typename){
            this.$message({
              type:"error",
              message:"请选择注册公司类型！"
            })
            return false;
         }
         this.show=1;
         sessionStorage.setItem("show",1)
       },
       next(formName){      //第二步提交
         this.$refs[formName].validate((valid) => { 
          if (valid) {
            sessionStorage.setItem("show","2")
            sessionStorage.setItem("form",this.publics.DES.encode(JSON.stringify(this.form)));
            this.show=2;
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       },
       sub(formName){       //最终提交
          this.$refs[formName].validate((valid) => { 
          if (valid) {
            let form=Object.assign(this.form,this.form1);
            form.txmExpireTime=form.txmExpireTime.getTime();
            form.licenceExpireTime=form.licenceExpireTime.getTime();
            this.$confirm('提交注册')
            .then(_ => {
                this.publics.AJAX.ajax({
                  url:"auth/register",
                  data:form,
                  success:(res)=>{
                      let load = this.$loading({
                          text: "生成帐号中,请等待后台审核"
                      });
                      setTimeout(e => {
                        load.close();
                          this.$router.push({
                              name: "login"
                          });
                      }, 2000);
                  }
                })
            })
            .catch(_ => {});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       }
     }
   }
</script>
<style lang = "scss">
  .register{
    width:1440px;
    margin:0 auto;
    .upbox{
      width:158px;
      height:100px;
    }
    .footer{
      width:100%;
      background: #ECECEC;
      text-align: center;
      line-height: 50px;
    }
    .secondStep,.lastStep{
      width:100%;
      overflow: hidden;
      padding:0 0 124px 0;
      background: url("../assets/img/moon.png") no-repeat bottom center #fff;
      .say{
        float:right;
        margin-right:16px;
        color:#00A2FF;
        transition-duration: 500ms;
      }
      .say:hover{
        color:rgb(0, 134, 211);
      }
       .ban{
          text-align: center;
          background: #ececec;
        }
      .forms{
        width:624px;
        margin:80px auto 0;
        .el-cascader{
          width:100%;
        }
        .log{
           width:185px;
        }
        .longs{
          width:100%;
        }
        .codeput label{
          line-height: 22px;
        }
        .el-form-item{
          margin-bottom: 20px;
        }
        input{
          height:32px;
          border-radius:0;
          line-height: 32px;
        }
         .btn{
            text-align: center;
            button{
              width:140px;
              margin:0 10px;
            }
          }
      }
    }
    .firstStep{
      width:100%;
      background: #F8F8F8;
      overflow: hidden;
      padding-bottom: 70px;
      .ban{
        width:100%;
        height:378px;
        background:url("../assets/img/bg@2x.png") no-repeat center top #31373d;
        padding-top:320px;
        .brown{
          width:100%;
          text-align: center;
          background: #ececec;
        }
      }
      .btn{
        text-align: center;
        button{
          width:140px;
          margin:0 10px;
        }
      }
      ul{
        width:1210px;
        margin: 88px auto 72px; 
        overflow: hidden;
        li{
          border-radius:4px;
          width:280px;
          height:202px;
          overflow: hidden;
          float:left;
          margin-right:30px;
          background-color: #fff;
          padding-top:50px;
          margin-bottom: 30px;
          line-height: 26px;
          color:#333;
          font-size: 24px;
          cursor: pointer;
          text-align: center;
          transition-duration: 500ms;
          i{
            display: inline-block;
            width:62px;
            height:62px;
            background-repeat: no-repeat;
          }
          .tit{
            margin-top: 30px;
          }
        }
        li:nth-child(1){
          background-image: url("../assets/img/bg3@2x.png");
          i{
             background-image: url("../assets/img/icons1_pitch@2x.png");
          }
        } 

        li:nth-child(2){
          background-image: url("../assets/img/22@2x.png");
          i{
             background-image: url("../assets/img/icons2_pitch@2x.png");
          }
        } 

        li:nth-child(3){
          background-image: url("../assets/img/24@2x.png");
          i{
             background-image: url("../assets/img/icons3_pitch@2x.png");
          }
        } 

        li:nth-child(4){
          margin:0;
          background-image: url("../assets/img/22@2x.png");
          i{
             background-image: url("../assets/img/icons4_pitch@2x.png");
          }
        } 
         li:hover,.cur{
           background-color:#00A2FF;
           color:#fff;
         }
          li:nth-child(1):hover,.cur:nth-child(1){
            i{
              background-image: url("../assets/img/icons1@2x.png");
            }
          } 
          li:nth-child(2):hover,.cur:nth-child(2){
            i{
              background-image: url("../assets/img/icons2@2x.png");
            }
          } 
          li:nth-child(3):hover,.cur:nth-child(3){
            i{
              background-image: url("../assets/img/icons3@2x.png");
            }
          } 
          li:nth-child(4):hover,.cur:nth-child(4){
            i{
              background-image: url("../assets/img/icons4@2x.png");
            }
          }

      }
    }
  }
</style>
