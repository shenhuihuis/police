<template>
    <div class = 'message'>
        <div class = 'topBar'>
            <!-- <el-select v-model="newsSearchDTO.type" placeholder="选择消息类型" @change='init'>
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
                <el-table-column
                    prop="type"
                    label="消息类型"
                    :formatter='formatType'
                    width="140px">
                </el-table-column>
                <el-table-column
                    prop="msg"
                    label="内容"
                    width="400px">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="时间"
                    width="200px">
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
                    v-if = 'total>newsSearchDTO.size'
                    :page-size="newsSearchDTO.size" @current-change = 'pageChange'
                    layout="prev, pager, next"
                    :current-page="newsSearchDTO.page"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="addNew" :before-close = 'close'>
         
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click = "close">取 消</el-button>
                <el-button type="primary" @click="handleEdit(false)" v-if = 'isDetail'>编 辑</el-button>
                <el-button type="primary" @click="handleEdit(true)" v-if = 'isDetail'>修 正</el-button>
                <el-button type="primary" @click="save('newForm')" v-if = '!isDetail'>保 存</el-button> -->
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
              newsType:[],//消息类型下拉
              total:0,
              timeRange:'',//时间范围
              type:this.publics.global().auth.type,//公司类型
              newsSearchDTO:{
                  newsType:'',//消息类型
                  startTime:'',
                  endTime:'',
                  page:1,
                  size:10,
                  userId:this.publics.global().auth.userId
              }
          }
        },
        created(){
            this.init();
            if(this.type == 0){//爆破
                this.newsType = [{value:null,text:'全部消息类型'},{value:0,text:'系统提醒'},{value:1,text:'审批消息'}]
            }else if(this.type == 1){//监理
                this.newsType = [{value:null,text:'全部消息类型'},{value:0,text:'系统提醒'},{value:1,text:'作业确认'},{value:2,text:'作业变更'}]
            }else if(this.type == 2){//运输公司
                this.newsType = [{value:null,text:'全部消息类型'},{value:0,text:'系统提醒'},{value:1,text:'配送任务'}]
            }else if(this.type == 3){//仓储
                this.newsType = [{value:null,text:'全部消息类型'},{value:0,text:'系统提醒'},{value:1,text:'销售入库'},{value:2,text:'物品出库'},{value:3,text:'物品退库'},{value:4,text:'变更入库'}]
            }else if(this.type == 4){//治安大队
                this.newsType = [{value:null,text:'全部消息类型'},{value:0,text:'审批消息'}]
            }else{//派出所
                this.newsType = [{value:null,text:'全部消息类型'},{value:0,text:'系统提醒'},{value:1,text:'销售入库'},{value:2,text:'作业变更'}]
            }
            
        },
        mounted(){

        },
        methods:{
            init(){
                this.publics.AJAX.$POST({
                    url:"user/news/list",
                    data:this.newsSearchDTO,
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
            formatType(type){
                if(row.type == 0){
                    return '未查看'
                }else{
                    return '已查看'
                }
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
            timeChange(data){
                if(data == null){
                    this.InformListDTO.startTime = '';
                    this.InformListDTO.endTime = '';
                }else{
                    this.InformListDTO.startTime = new Date(data[0]).getTime();
                    this.InformListDTO.endTime = new Date(data[1]).getTime();
                }
                this.init();
            },
            pageChange(i){//分页
                this.newsSearchDTO.page = i
                this.init();
            },
        }
    }
</script>
<style lang = 'scss'>
    .message{
        background: #F5F6FA;
        .topBar{
        position: relative;
        background: #fff;
        height: 63px;
        padding:0 30px; 
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
    .el-form-item__label{
        line-height: 40px;
    }
    .el-form-item{
        margin-bottom: 10px;
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
    .success-row td:nth-child(6) .cell{
        color: rgb(14, 155, 14);
    }
    .warning-row td:nth-child(6) .cell{
        color: #FF4B4B;
    }
    }
</style>

