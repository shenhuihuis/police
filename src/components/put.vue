<template>
    <div class="putmain" v-if="data.show">
        <div class="put">
            <div class="tp">
                <a href="javascript:void(0);" class="close" @click="close"></a>             
                <div class="img" v-html="data.tit">
                    
                </div>
            </div>
            <div class="mains">
                <div class="say" v-html="data.msg"></div>
                <a href="javascript:void(0);" class="sub" @click="close">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:["data"],
        data(){
            return{
                show:''
            }
        },
        mounted(){

        },
        methods:{
            close(){
                 this.$emit("toclose")
            }
        }
    }
</script>