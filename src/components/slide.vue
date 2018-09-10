<template>
  <div class="slider">
    <div class = 'title'></div>
    <div class="nav">
      <happy-scroll>
        <ul :style="{'height':hei+'px'}">
          <li v-for="(i,index) in slides" :class="{'drap':i.children}">
            <div v-for="j in menu" v-if="i.id==j.id">
              <router-link :to="{'name':i.router,params:{tit:i.tit}}" :class="{'curs':i.checked || current==index}" >
              <!-- <router-link :to="{'name':i.router}" :class="{'curs':i.checked}"  @click.native="routerlink($event)"> -->
                <div class="tit">
                  <i class="iconfont" v-html="i.ico"></i> {{i.tit}}
                  <i class="triangle"></i>
                </div>
              </router-link>
              <dl v-if='i.children'>
                <dd v-for="m in i.children">
                  <div v-for="k in j.chidren" v-if="m.id==k.id">
                    <router-link :to="{'name':m.router}">
                      <div class="tit">{{m.tit}}</div>
                    </router-link>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
        </ul>
      </happy-scroll>
    </div>
  </div>
</template>

<script>
  import router from "./../assets/js/slide-router"
  import {
    HappyScroll
  } from 'vue-happy-scroll'
  import 'vue-happy-scroll/docs/happy-scroll.css'
  export default {
    props: ["current"],     //sign
    data() {
      return {
        company:"",
        hei: document.body.scrollHeight - 108,
        slides:null,
        menu:[]
      }
    },
    created() {
      if(sessionStorage.getItem("menu")){
        let menu=JSON.parse(this.publics.DES.decode(sessionStorage.getItem("menu")));
       // let auth=this.publics.
        this.menu=menu;
        let type=this.publics.global().auth.type;
        if(type==4){
          this.slides=router.router.Security;
        }else if(type==5){
          this.slides=router.router.police;
        }
        // console.log(menu,routes)
        // for(let [index,value] of routes.entries()){
        //     for(let val of menu){
        //       if(value.id==val.id){
        //         newMenu.push(value)
        //       }else{
        //         //  routes.splice(index,1)         
        //       }
        //     }
            
        // }
       // console.log(routes)
        
       // this.slides = routes.police;
        this.router();
      }else{
        this.$router.push({name:'login'})
      }
      
    },
    components: {
      HappyScroll
    },
    watch: {
      '$route': 'router'
    },
    methods: {
      router() {
        let router = this.$route.name;
        let index=this.current;
        for (let val of this.slides) {
          val.checked=false;
          if (val.router == router) {
            val.checked = true;
            this.$emit('titleChange',val.tit);
          }
          if (val.children) {
            val.show = true;
            for(let value of val.children){
              if(value.router==router){
                value.checked=true;
                val.checked=true;
              }
            }
          }
        
        }
      }
    }
  }
</script>
<style lang = 'scss'>
  .slider{
    .title{
      background: url('../assets/img/sub_title.png') no-repeat 30% 45%;
      padding: 15px 28px;
      height: 60px;
      /* border-bottom: 1px solid #D8D8D8; */
    }
  }
</style>

