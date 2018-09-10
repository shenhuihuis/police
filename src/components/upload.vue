<template>
    <div class="uploadfile">
        <div class="befor" v-if="!data.url">
             <div class="start">
                <div class="box" v-if="data.type==0">
                    <img src="../assets/img/up1.png" alt="">
                    <p>图片上传</p>
                    <div class="text">支持jpg、png、gif、bmp格式</div>
                </div>
                <div class="box"  v-if="data.type==1">
                    <img src="../assets/img/up2.png" alt="">
                    <p>视频上传</p>
                    <div class="text">支持mp4、pdf格式</div>
                </div>
                <div class="box"  v-if="data.type==2">
                    <img src="../assets/img/up3.png" alt=""/>
                    <p>文档上传</p>
                    <div class="text">支持doc、docx、pdf格式</div>
                </div>
            </div>
            <input type="file" @change="uploadmore(data.type,$event)" multiple v-if="more"  accept="image/png,image/gif,image/jpg,image/jpeg"/>
            <input type="file" @change="upload(data.type,$event)" v-else/>
        </div>
        <div class="after" v-else>
            <div class="m" v-if="!more">
                <img   v-if="data.type==0" :src="data.dataurl">
                <video v-if="data.type==1" :src="data.dataurl"></video>
                <img   v-if="data.type==2" src="./../assets/img/wj.png"  class="uposs">
            </div>
            <div class="imglist" v-else>
                <img src="./../assets/img/pic.png" width="80">
            </div>
            <div class="btn">
                <div v-if="!more">
                    <a href="javascript:void(0);"class="inline" title="上传" v-if="!look">
                        <input type="file" @change="upload(data.type,$event)"/>
                    </a>
                </div>
                <div v-else>
                    <a href="javascript:void(0);" class="inline" title="上传" v-if="!look">
                        <input type="file" @change="uploadmore(data.type,$event)" multiple  accept="image/png,image/gif,image/jpg,image/jpeg"/>
                    </a>
                </div>
                <a href="javascript:void(0);" title="放大" @click="max(data.dataurl)" v-if="data.type!=2"></a>
                 <a :href="data.dataurl" title="下载" target="_black" v-if="data.type==2"></a>
            </div>
         </div>
         <div class="clearbox" v-if="img"  @click="img=null">
             <div class="imgbox" v-if="!more">
                <img :src="img" v-if="data.type==0" />
                <video :src="img" v-if="data.type==1" controls/>
             </div>
             <div class="imgbox" v-else>
                  <el-carousel trigger="click" height="100%" :autoplay="false">
                    <el-carousel-item v-for="item in data.dataurl" :key="item">
                        <img :src="item" alt="">
                    </el-carousel-item>
                 </el-carousel>
             </div>
         </div>
    </div>
</template>
<script>
    export default {
        props:["data","more","look"],        
        data(){
            return {
                datas:this.data,
                mores:this.more,
                looks:this.look,
                img:null
                //plan:0                  0未上传  1上传中  2上传完毕
            }
        },
        methods:{
            max(src){  
                if(this.mores){
                    this.img=this.datas.dataurl
                }else{
                     this.img=src;
                }
            },
            uploadmore(type,imgFile){
                this.datas.dataurl=[];
                this.datas.url=[];
                let fd = new FormData();
                let files = imgFile.target.files,render = new FileReader();
                if(files.length>10){
                    this.$message({
                        type:"error",
                        message:"最多上传10张"
                    })
                    return false;
                }
                for(let i=0, f; f=files[i]; i++){
                    fd.append('multipartFile', f);
                }
                this.publics.AJAX.upload({
                    url:"api/v2/file/s",
                    data:fd,
                    success:(res)=>{
                         this.datas.url=res;
                         console.log(res)
                         for(let i=0, f; f=files[i]; i++){
                            this.datas.dataurl.push(window.URL.createObjectURL(f))
                         }
                        this.$emit("bindValue",res)
                    }
                })

            },
            upload(type,imgFile){
                let filextension = imgFile.target.value.substring(
                    imgFile.target.value.lastIndexOf("."),
                    imgFile.target.value.length
                );
                filextension = filextension.toLowerCase();
                let file = imgFile.target.files[0],
                    fileSize = 0;
                fileSize = file.size / 1024;
                if (fileSize > 10240 && (type==0 || type==2)){
                    this.$message({
                        type: "error",
                        message: "上传的图片/文件不能超过10mb"
                    });
                    return false;
                }
                else if(fileSize > 102400 && type==1){
                     this.$message({
                        type: "error",
                        message: "上传的视频不能超过100mb"
                    });
                    return false;
                }
                else {
                    if(type==0 && (filextension != ".jpg" && filextension != ".gif" && filextension != ".jpeg" &&  filextension != ".png" && filextension != ".bmp")){
                        this.$message({
                            type: "error",
                            message:"对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢!"
                        });
                        return false;
                    }
                    else if(type==2 &&  (filextension != ".doc" && filextension != ".docx" && filextension != ".pdf" && filextension != ".pages")){
                        this.$message({
                            type: "error",
                            message: "对不起，系统仅支持docx,docx,pdf，请您调整格式后重新上传，谢谢!"
                            });
                        return false;
                    }
                    else if(type==1 && (filextension != ".mp4" && filextension != ".ogg")){
                        this.$message({
                            type: "error",
                            message:"对不起，系统仅支持标准格式的视频，请您调整格式后重新上传，谢谢!"
                        });
                        return false;
                    }
                    else {
                        let fd = new FormData(),render = new FileReader();
                        fd.append("multipartFile", file);
                        let _this=this;
                        this.publics.AJAX.upload({
                            url:"api/v2/file",
                            data:fd,
                            success:(res)=>{
                               this.data.url=res;
                               this.$emit("bindValue",res)
                               if(type!=2){
                                  render.readAsDataURL(file);
                                  render.onload=function(e){
                                    let result = this.result;
                                    _this.datas.dataurl = result;
                                  };
                               }
                            }
                        })
                   }
                }
            }
        }
    }
</script>
