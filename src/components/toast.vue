<template>
  <div class="toast" v-if="img.show">
     <div class="img">
       <img :src="img.src">
     </div>
     <div class="button">
         <el-button type="primary" class="tosub" @click="tosub(0)" >审查无误，确认提交</el-button>
         <el-button class="tosub cancel" @click="tosub(1)" >重新编辑</el-button>
     </div>
  </div>
</template>
<script>
   export default {
     props:["img"],
     data(){
       return {
          
       }
     },
     methods:{
        tosub(e){
          this.$emit("tosub",e)
        }
     }
   }
</script>
