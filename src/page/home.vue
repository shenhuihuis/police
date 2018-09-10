<template>
    <div class="contair">
        <myslide :current="index" @titleChange = 'update'></myslide>  
        <div class="main">
           <tophead :title = 'title'></tophead>
           <div class="compt" :style="{'height':hei+'px'}">
              <happy-scroll>
                <router-view></router-view>
              </happy-scroll>
           </div>
        </div> 
    </div>
</template>

<script>
  import slide from "../components/slide";
  import head from "../components/head";
  import { HappyScroll } from 'vue-happy-scroll';
  import 'vue-happy-scroll/docs/happy-scroll.css';
  export default {
    data() {
      return {
         index:null,
         title:'',
         hei:document.body.scrollHeight - 108,
         hide:{
           name:"",
           hide:[]
         }
      }
    },
    components: {
        "myslide": slide,
        "tophead": head,
        HappyScroll
    },
    mounted(){
     
    },
    methods:{
      router(){
        
      },
      update(title){
        this.title = title
      },
    },
    watch: {
      '$route':"router"
    }
  }

</script>