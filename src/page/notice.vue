<template>
    <div class = 'notice'>
        <div class = 'topBar'>
            <!-- <el-select v-model="InformListDTO.informType" placeholder="选择通知类型" @change='init'>
                <el-option
                v-for="item in personType"
                :key="item.value"
                :label="item.text"
                :value="item.value">
                </el-option>
            </el-select> -->
            <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change = 'timeChange'
                :default-time="['08:00:00', '18:00:00']">
            </el-date-picker>
        </div>
        <div class = 'table'>
            <el-table
                :data="dataList"
                :row-class-name="tableRowClassName"
                style="width: 100%">
                <!-- <el-table-column
                    prop="informType "
                    label="消息类型"
                    width="140px">
                </el-table-column> -->
                <el-table-column
                    prop="title"
                    label="通知标题"
                    width="200px">
                </el-table-column>
                <el-table-column
                    prop="staffName"
                    label="来源"
                    width="400px">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="时间"
                    width="240px">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter='formatState'
                    width="160px">
                    </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                        <i class = 'icon detail'  @click = "handleDetail(scope.row.id)"></i>
                    </el-tooltip>
                </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center">
                <el-pagination
                    v-if = 'total>InformListDTO.size'
                    :page-size="InformListDTO.page" @current-change = 'pageChange'
                    layout="prev, pager, next"
                    :current-page="InformListDTO.size"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="通 知" :visible.sync="isDetail" :before-close = 'close'>
            <h3 class = 'title'>{{detail.title}}</h3>
            <div class = 'sub'>
                <span class = 'name'>{{detail.createMan}}</span>
                <span class = 'time'>{{detail.createDate}}</span>
            </div>
            <div class = 'msgMain'>{{detail.msg}}</div>
            <div>
                <span>附件（{{ detail.informFileList && detail.informFileList.length}}）</span>
            </div>
            <div class = 'file'>
                <a :href="v.file" v-for = '(v,i) in detail.informFileList'>
                    <span class = 'fileName'>{{v.fileName}}</span>
                    <span class = 'fileSize'>{{v.fileSize}}</span>
                </a>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click = "close" >确 认</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        props:["datas"],
        data (){
          return{
              dataList:[],
              type: this.publics.global().auth.type,
              total:0,
              title:'',
              timeRange:'',//时间范围
              InformListDTO:{
                  informType:'',//消息类型
                  beginTime:'',
                  endTime:'',
                  page:1,
                  size:10,
                  userId:this.publics.global().auth.userId
              },
              isDetail:false,
              detail:{},//通知详情
          }
        },
        created(){
            this.init();
        },
        mounted(){

        },
        methods:{
            init(){
                this.publics.AJAX.$POST({
                    url:"dept/inform/list",
                    data:this.InformListDTO,
                    success:(res)=>{
                        this.total = res.count;
                        if(res.list && res.list.length == 0){
                            this.dataList = res.list
                            return false
                        }
                        res.list.map(v=>{
                            v.createDate = this.publics.Filters.timer(v.createDate)
                            return v  
                        })
                        this.dataList = res.list
                    }
                }) 
            },
            formatState(row){//列表状态过滤器
                if(row.status == 0){
                    return '未查看'
                }else{
                    return '已查看'
                }
            },
            tableRowClassName(row) {
                if (row.row.status == 1) {
                return 'success-row';
                } else if (row.row.status == 0) {
                return 'warning-row';
                }
                return '';
            },
            timeChange(data){
                if(data == null){
                    this.InformListDTO.beginTime = '';
                    this.InformListDTO.endTime = '';
                }else{
                    this.InformListDTO.beginTime = new Date(data[0]).getTime();
                    this.InformListDTO.endTime = new Date(data[1]).getTime();
                }
                this.init();
            },
            handleDetail(id){
                this.isDetail = true;
                this.publics.AJAX.$POST({
                    url:"dept/user/" + this.InformListDTO.userId +"/inform/" + id + '/detail',
                    type:'get',
                    success:(res)=>{
                        this.detail = res;
                        this.detail.createDate = this.publics.Filters.timer(this.detail.createDate)
                    }
                }) 
            },
            pageChange(i){//分页
                this.InformListDTO.page = i
                this.init();
            },
            close(){
                this.isDetail = false;
                this.init();
            }
        }
    }
</script>
<style lang = 'scss'>
    .notice{
        background: #F5F6FA;
        .topBar{
        position: relative;
        background: #fff;
        height: 63px;
        padding:0 30px; 
        display: flex;
        align-items: center;
            .el-select{
                display:inline-block;
                width:10%;
                margin:10px;
            }
        }
    .table{
        margin: 21px 40px;
        background: #fff;
        .icon{
            display: inline-block;
            width: 17px;
            height: 17px;
            margin: 0 7px;
        }
        .detail{
            background: url('../assets/img/detail.png')
        }
        .delete{
            background: url('../assets/img/delete.png')
        }
    }
    .title{
        text-align: center;
        font-size: 18px;
        color: #646464;
        margin: 30px 0 15px;
    }
    .sub{
        font-size: 12px;
        color: #646464;
        padding: 0 40px 13px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .name{
            padding-left: 14px;
            background: url('../assets/img/Fill.png') no-repeat 0 center;
        }
        .time{
            padding-left: 14px;
            background: url('../assets/img/time.png') no-repeat 0 center;
        }
    }
    .msgMain{
        margin-top: 26px;
        padding: 0 40px;
        font-size: 16px;
        color: #646464;
        min-height: 260px;
    }
    .file{
        margin-top: 10px;
        a{
            display: inline-block;
            cursor: pointer;
            width: 140px;
            height: 110px;
            border: 1px dotted #aaa;
            background: url('../assets/img/Bitmap.png') no-repeat  center 15px;
            .fileName{
               font-size: 12px;
               color: #646464;
               display: block;
               text-align: center;
               margin-top: 60px;
            }
            .fileSize{
               font-size: 12px;
               color: #A7A7A7;
               display: block;
               text-align: center;
            }
        }
    }
    .el-dialog__header{
        border-bottom: 1px solid #eee;
    }

    .el-dialog__body{
        box-sizing: border-box;
        padding:0 100px;
    }
    .el-select,.el-radio-group{
        width: 100%;
    }
    .uploadfile{
        width: 158px;
        height: 100px;
    }
    .dialog-footer{
        text-align: center;
    }
    .el-button+.el-button{
        margin-left: 28px;
    }
    .el-dialog{
        background: url('../assets/img/dialog_bg.png') no-repeat 0% 100%;
        background-size: 100% 40%;
        background-color: #fafafa;
    }
    .success-row td:nth-child(4) .cell{
        color: rgb(14, 155, 14);
    }
    .warning-row td:nth-child(4) .cell{
        color: #FF4B4B;
    }
    }
</style>



