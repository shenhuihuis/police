<template>
  <div style="width:200px;height:200px;">
    <File :data="arr[0]"  v-on:bindValue="values=arr[0].url" more="true"></File>
    <a href="javascript:void(0);" @click="sub">哈哈哈哈</a>
  </div>
</template>
<script>
    import file from "./../components/upload";
    export default {
      data (){
        return{
          look:true,
          values:"",
          arr:[
            {type:0,dataurl:"",url:""}
          ]
        }
      },
      components:{
        File:file
      },
      methods:{
        sub(){
          console.log(this.arr)
        }
      }
  }
</script>