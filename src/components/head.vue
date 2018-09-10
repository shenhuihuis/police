<template>
  <div class="head" v-if="load">
      <div class = 'title'>{{title}}</div>
      <div class = 'right'>
        <span class = 'notic'></span>
        <span class = 'msg'></span>
        <img src = '../assets/img/1@2x.png' class = 'avatar'></img>
        <span class = 'name'>name</span>
        <span class = 'drop'></span>
      </div>
  </div>
</template>
<script>
  import router from "./../assets/js/slide-router"
  export default {
    props:['title'],
    data (){
      return{
        // uid:sessionStorage.getItem("person"),
        // companyid: Base64.Base64.decode(sessionStorage.getItem("companyid")),
         hide:true,
         list:{
           list:null,
           show:false
         },
         load:true,
      }
    },
    mounted(){
    },

    methods:{

      seelist(){
        if(this.list.list.count>0){
          this.list.show=true
        }else{
          
        }
      },
      go(){
       if(sessionStorage.getItem("nlevel")){
            this.$prompt('请输入新密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\d{6}$/,
                inputErrorMessage: '密码格式不正确'
              }).then(({ value }) => {
                /*this.publics.$AJAX("police/user/"+Base64.Base64.decode(this.uid)+"/pwd","patch",{newPwd:value},e=>{
                    this.$message({
                      type:"success",
                      message:"修改成功！"
                    })
                    setTimeout(e=>{
                      this.$router.push({name:'login'})
                    },1000)
                })*/
          })
       }else{
         window.location.href="https://aq.minbaojianguan.com/password.html?uid="+this.uid
       }
      }
    }
  }

</script>
 <style lang = 'scss'>
 .head{
   position: relative;
   border-bottom: 1px solid #eee;
   .title{
     height:88px;
     line-height: 88px;
     font-size: 32px;
     font-weight: bold;
     color: #333;
     margin-left: 58px;
   }
   .right{
     position: absolute;
     top:0;
     right: 0;
     height: 88px;
     display: flex;
     justify-content: space-around;
     align-items: center;
     width: 230px;
     .notic{
       background: url('../assets/img/Combined.png') no-repeat;
       width: 20px;
       height: 20px;
     }
     .msg{
       background: url('../assets/img/Shape.png') no-repeat;
       width: 20px;
       height: 20px;
     }
     .avatar{
       background: #000;
       width: 33px;
       height: 33px;
       border-radius: 50%;
     }
     .drop{
       background: url('../assets/img/Triangle.png') no-repeat;
       width: 11px;
       height: 5px;
     }
     .name{
       color: #999999;
       font-size: 14px;
     }
   }
 }
 </style>
 